import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Play, RefreshCw, Copy, Link as LinkIcon } from "lucide-react";
import VoteResults from "./VoteResults";
import { PredefinedQuestion } from "@/data/predefinedQuestions";
import * as questionModules from "@/data/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminViewProps {
  roomId: string;
  roomCode: string;
}

const AdminView = ({ roomId, roomCode }: AdminViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<PredefinedQuestion | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [currentQuestionType, setCurrentQuestionType] = useState<string>("");
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [hasCorrectAnswer, setHasCorrectAnswer] = useState<boolean>(false);

  // Build categories from ordered imports
  const categories = questionModules.orderedCategories.map(item => ({
    name: item.key.replace(/Questions$/, '').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim(),
    questions: item.value as PredefinedQuestion[],
  }));

  useEffect(() => {
    loadQuestion();
  }, [roomId]);

  const loadQuestion = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setQuestionId(data.id);
        setCurrentQuestionType(data.question_type);
        setHasCorrectAnswer(!!data.correct_answer);
      }
    } catch (error) {
      // No question yet, which is fine
      console.log("No question loaded yet");
    }
  };

  const startQuestion = async () => {
    if (!selectedQuestion) {
      toast.error("Please select a question");
      return;
    }

    setIsStarting(true);
    try {
      // Always delete all previous votes for this room before starting a new question
      await supabase.from("votes").delete().eq("room_id", roomId);

      // Delete old question if present
      if (questionId) {
        await supabase.from("questions").delete().eq("id", questionId);
      }

      // Insert new question
      const { data, error } = await supabase
        .from("questions")
        .insert([{
          room_id: roomId,
          question_text: selectedQuestion.question_text,
          question_type: selectedQuestion.question_type,
          options: selectedQuestion.options || [],
          correct_answer: selectedQuestion.correct_answer,
          explanation: selectedQuestion.explanation,
          timer_seconds: selectedQuestion.correct_answer ? timerSeconds : null,
          results_revealed: !selectedQuestion.correct_answer
        }])
        .select()
        .single();

      if (error) throw error;

      setQuestionId(data.id);
      setCurrentQuestionType(data.question_type);
      setHasCorrectAnswer(!!selectedQuestion.correct_answer);

      // Start timer for knowledge check questions
      if (selectedQuestion.correct_answer && timerSeconds > 0) {
        setTimeout(async () => {
          await revealResults();
        }, timerSeconds * 1000);
      }

      toast.success("Question started!");
    } catch (error) {
      console.error("Error starting question:", error);
      toast.error("Failed to start question");
    } finally {
      setIsStarting(false);
    }
  };

  const clearResults = async () => {
    try {
      await supabase.from("votes").delete().eq("room_id", roomId);
      toast.success("Results cleared!");
    } catch (error) {
      console.error("Error clearing results:", error);
      toast.error("Failed to clear results");
    }
  };

  const getCategoryQuestions = () => {
    if (!selectedCategory) return [];
    return categories.find(cat => cat.name === selectedCategory)?.questions || [];
  };

  const revealResults = async () => {
    if (!questionId) return;

    try {
      const { error } = await supabase
        .from("questions")
        .update({ results_revealed: true })
        .eq("id", questionId);

      if (error) throw error;
      toast.success("Results revealed!");
    } catch (error) {
      console.error("Error revealing results:", error);
      toast.error("Failed to reveal results");
    }
  };

  const copyRoomLink = () => {
    const url = window.location.origin + (import.meta.env.BASE_URL || '/') + (roomCode === undefined ? '' : roomCode);
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card p-6 rounded-xl border-2 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="p-2 bg-white rounded-lg border shadow-sm">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.origin + (import.meta.env.BASE_URL || '/') + roomCode)}`} 
              alt="Room QR Code"
              className="w-24 h-24"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-xl font-mono text-primary font-bold mt-1">Room Code: {roomCode}</p>
            <p className="text-sm text-muted-foreground mt-1">Scan to join the quiz</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="secondary" onClick={copyRoomLink} className="flex-1 md:flex-none">
            <Copy className="h-4 w-4 mr-2" />
            Copy Participant Link
          </Button>
          <Button variant="outline" onClick={clearResults} className="flex-1 md:flex-none">
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Results
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <div>
                <label className="text-sm font-medium mb-2 block">Question</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {getCategoryQuestions().map((question) => (
                    <Card
                      key={question.id}
                      className={`cursor-pointer transition-all hover:border-primary ${selectedQuestion?.id === question.id ? "border-primary bg-primary/5" : ""
                        }`}
                      onClick={() => setSelectedQuestion(question)}
                    >
                      <CardContent className="p-4">
                        <p className="font-medium">{question.question_text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Type: {question.question_type.replace('_', ' ')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedQuestion && (
              <div className="space-y-3 border-t pt-4">
                <div>
                  <h3 className="font-semibold mb-2">Preview</h3>
                  <p className="text-sm mb-2">{selectedQuestion.question_text}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Type: <span className="font-medium">{selectedQuestion.question_type.replace('_', ' ')}</span>
                  </p>
                </div>

                {selectedQuestion.question_type === 'multiple_choice' && selectedQuestion.options && (
                  <div>
                    <p className="text-xs font-medium mb-1">Options:</p>
                    <ul className="text-sm space-y-1">
                      {selectedQuestion.options.map((option, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span>
                          <span>{option}</span>
                          {selectedQuestion.correct_answer === option && (
                            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded">Correct</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuestion.question_type === 'number_scale' && (
                  <p className="text-xs text-muted-foreground">Scale: 0 (No) to 10 (Yes)</p>
                )}

                {selectedQuestion.question_type === 'word_cloud' && (
                  <p className="text-xs text-muted-foreground">Participants will type 3 words</p>
                )}

                {selectedQuestion.correct_answer && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timer (seconds)</label>
                    <Input
                      type="number"
                      min="0"
                      max="60"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 20)}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Results will be revealed after {timerSeconds} seconds, or you can reveal them manually.
                    </p>
                  </div>
                )}

                <Button onClick={startQuestion} disabled={isStarting} className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  {isStarting ? "Starting..." : "Start This Question"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live Results</CardTitle>
            {questionId && hasCorrectAnswer && (
              <Button onClick={revealResults} variant="secondary" size="sm">
                Show Results Now
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {questionId ? (
              <VoteResults
                roomId={roomId}
                questionId={questionId}
                questionType={currentQuestionType as 'multiple_choice' | 'number_scale' | 'word_cloud'}
              />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No question active. Select and start a question to see results.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminView;
