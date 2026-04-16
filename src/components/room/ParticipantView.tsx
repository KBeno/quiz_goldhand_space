import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import VoteResults from "./VoteResults";
import { v4 as uuidv4 } from "uuid";

interface ParticipantViewProps {
  roomId: string;
  roomCode: string;
}

interface Question {
  id: string;
  question_text: string;
  options: string[];
  question_type: 'multiple_choice' | 'number_scale' | 'word_cloud' | 'free_text';
  correct_answer?: string;
  explanation?: string;
  results_revealed?: boolean;
  timer_seconds?: number;
}

const ParticipantView = ({ roomId, roomCode }: ParticipantViewProps) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [anonymousUserId, setAnonymousUserId] = useState<string>("");
  const [numberValue, setNumberValue] = useState<number>(5);
  const [words, setWords] = useState<string[]>(["", ""]);
  const [freeText, setFreeText] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    // Get or create anonymous user ID
    let userId = localStorage.getItem("anonymous_user_id");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("anonymous_user_id", userId);
    }
    setAnonymousUserId(userId);

    loadQuestion();
    subscribeToQuestionChanges();
    loadUserVote(userId);
    // Clear local vote state when room changes (new question started)
    setSelectedOption(null);
    setNumberValue(5);
    setWords(["", ""]);
    setFreeText("");
    setHasVoted(false);
    setShowCorrectAnswer(false);
  }, [roomId]);

  // Countdown timer effect
  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 1) {
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

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
        setQuestion({
          id: data.id,
          question_text: data.question_text,
          options: data.options as string[],
          question_type: data.question_type as 'multiple_choice' | 'number_scale' | 'word_cloud',
          correct_answer: data.correct_answer,
          explanation: data.explanation,
          results_revealed: data.results_revealed,
          timer_seconds: data.timer_seconds
        });

        // Start countdown if there's a timer and results aren't revealed yet
        if (data.timer_seconds && !data.results_revealed && data.correct_answer) {
          setRemainingTime(data.timer_seconds);
        }

        // Update showCorrectAnswer based on results_revealed
        if (data.results_revealed && data.correct_answer && selectedOption) {
          setShowCorrectAnswer(true);
        }
      }
    } catch (error) {
      console.log("No question available yet");
    }
  };

  const loadUserVote = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("selected_option")
        .eq("room_id", roomId)
        .eq("anonymous_user_id", userId)
        .single();

      if (data && !error) {
        setSelectedOption(data.selected_option);
      }
    } catch (error) {
      // No vote yet
    }
  };

  const subscribeToQuestionChanges = () => {
    const channel = supabase
      .channel("question-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "questions",
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setQuestion({
              id: payload.new.id,
              question_text: payload.new.question_text,
              options: payload.new.options as string[],
              question_type: payload.new.question_type,
              correct_answer: payload.new.correct_answer,
              explanation: payload.new.explanation,
              results_revealed: payload.new.results_revealed,
              timer_seconds: payload.new.timer_seconds
            });
            // Clear local vote state when a new question is inserted
            setSelectedOption(null);
            setNumberValue(5);
            setWords(["", ""]);
            setFreeText("");
            setHasVoted(false);
            setShowCorrectAnswer(false);
            // Start countdown if there's a timer
            if (payload.new.timer_seconds && payload.new.correct_answer) {
              setRemainingTime(payload.new.timer_seconds);
            } else {
              setRemainingTime(null);
            }
          } else if (payload.eventType === "UPDATE") {
            // Update results_revealed status
            setQuestion(prev => prev ? {
              ...prev,
              results_revealed: payload.new.results_revealed
            } : null);
            // Show correct answer when results are revealed
            if (payload.new.results_revealed && payload.new.correct_answer && selectedOption) {
              setShowCorrectAnswer(true);
            }
            // Stop countdown when results are revealed
            if (payload.new.results_revealed) {
              setRemainingTime(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const vote = async (option: string) => {
    if (!anonymousUserId) {
      toast.error("Unable to vote. Please refresh the page.");
      return;
    }

    try {
      const { error } = await supabase
        .from("votes")
        .upsert({
          room_id: roomId,
          question_id: question.id,
          anonymous_user_id: anonymousUserId,
          selected_option: option
        }, {
          onConflict: "room_id,anonymous_user_id"
        });

      if (error) throw error;

      setSelectedOption(option);
      setHasVoted(true);
      toast.success("Vote recorded!");

      // Show correct answer feedback immediately for fact check questions
      if (question?.correct_answer) {
        setShowCorrectAnswer(true);
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    }
  };

  const submitNumberVote = async () => {
    if (!anonymousUserId) {
      toast.error("Unable to vote. Please refresh the page.");
      return;
    }

    try {
      const { error } = await supabase
        .from("votes")
        .upsert({
          room_id: roomId,
          question_id: question.id,
          anonymous_user_id: anonymousUserId,
          selected_option: numberValue.toString()
        }, {
          onConflict: "room_id,anonymous_user_id"
        });

      if (error) throw error;

      setHasVoted(true);
      toast.success("Vote recorded!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    }
  };

  const submitWordVote = async () => {
    if (!anonymousUserId) {
      toast.error("Unable to vote. Please refresh the page.");
      return;
    }

    const filledWords = words.filter(w => w.trim());
    if (filledWords.length === 0) {
      toast.error("Please enter at least one word");
      return;
    }

    try {
      const { error } = await supabase
        .from("votes")
        .upsert({
          room_id: roomId,
          question_id: question.id,
          anonymous_user_id: anonymousUserId,
          selected_option: filledWords.join(",")
        }, {
          onConflict: "room_id,anonymous_user_id"
        });

      if (error) throw error;

      setHasVoted(true);
      toast.success("Words submitted!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to submit words");
    }
  };

  const addWordInput = () => {
    setWords([...words, ""]);
  };

  const submitFreeTextVote = async () => {
    if (!anonymousUserId) {
      toast.error("Unable to vote. Please refresh the page.");
      return;
    }

    if (!freeText.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    try {
      const { error } = await supabase
        .from("votes")
        .upsert({
          room_id: roomId,
          question_id: question.id,
          anonymous_user_id: anonymousUserId,
          selected_option: freeText
        }, {
          onConflict: "room_id,anonymous_user_id"
        });

      if (error) throw error;

      setHasVoted(true);
      toast.success("Feedback submitted!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to submit feedback");
    }
  };

  if (!question) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Room: {roomCode}</h1>
          <p className="text-xl text-muted-foreground">
            Waiting for the admin to post a question...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with QR Code */}
        <div className="lg:w-48 flex-shrink-0">
          <Card className="sticky top-4 border-2 p-4 flex flex-col items-center gap-3 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="relative p-2 bg-white rounded-lg border shadow-inner group-hover:scale-105 transition-transform duration-300">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + (import.meta.env.BASE_URL || '/') + roomCode)}`} 
                alt="Room QR Code"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-32 lg:h-32"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Join Room</p>
              <p className="text-lg font-mono font-black text-foreground">{roomCode}</p>
              <p className="text-[10px] text-muted-foreground mt-2 leading-tight">Scan this code to join on your mobile device</p>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-4 bg-card/50 p-6 rounded-xl border border-border/50 backdrop-blur-sm shadow-sm">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Live Quiz Room
            </h1>
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-bold text-primary">Active Session</span>
            </div>
          </div>

          <Card className="border-2 shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-2xl pt-2">{question.question_text}</CardTitle>
              {remainingTime !== null && remainingTime > 0 && question.correct_answer && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Time Remaining:</span>
                    <span className="text-2xl font-bold text-primary">{remainingTime}s</span>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {question.question_type === 'multiple_choice' && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => vote(option)}
                      variant={selectedOption === option ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-5 px-6 text-lg transition-all ${
                        selectedOption === option ? "scale-[1.02] shadow-md" : "hover:border-primary/50"
                      }`}
                      size="lg"
                      disabled={hasVoted}
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold mr-4 shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </Button>
                  ))}

                  {showCorrectAnswer && question.correct_answer && (
                    <div className={`p-6 rounded-xl animate-in slide-in-from-top-4 duration-300 ${selectedOption === question.correct_answer
                      ? 'bg-green-500/10 border-2 border-green-500/30'
                      : 'bg-orange-500/10 border-2 border-orange-500/30'
                      }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedOption === question.correct_answer ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {selectedOption === question.correct_answer ? '✓' : '✗'}
                        </div>
                        <p className="font-bold text-lg">
                          {selectedOption === question.correct_answer ? 'Correct Answer!' : 'Incorrect'}
                        </p>
                      </div>
                      <p className="text-base mb-3">
                        The correct answer is: <span className="font-bold text-green-600">{question.correct_answer}</span>
                      </p>
                      {question.explanation && (
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {question.question_type === 'number_scale' && (
                <div className="space-y-8 py-4">
                  <div className="flex items-center justify-between text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                  </div>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      value={[numberValue]}
                      onValueChange={(value) => setNumberValue(value[0])}
                      disabled={hasVoted}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-center p-8 bg-muted/20 rounded-2xl border-2 border-dashed border-border/50">
                    <span className="text-7xl font-black text-primary drop-shadow-sm">{numberValue}</span>
                  </div>
                  <Button
                    onClick={submitNumberVote}
                    disabled={hasVoted}
                    className="w-full py-8 text-xl font-bold shadow-lg transition-transform active:scale-[0.98]"
                    size="lg"
                  >
                    {hasVoted ? "Vote Recorded" : "Submit Rating"}
                  </Button>
                </div>
              )}

              {question.question_type === 'word_cloud' && (
                <div className="space-y-6">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Contributions:</p>
                  <div className="grid gap-4">
                    {words.map((word, index) => (
                      <Input
                        key={index}
                        placeholder={`Type word ${index + 1}...`}
                        value={word}
                        onChange={(e) => {
                          const newWords = [...words];
                          newWords[index] = e.target.value;
                          setWords(newWords);
                        }}
                        disabled={hasVoted}
                        className="py-6 px-4 text-lg border-2 focus-visible:ring-primary/20"
                      />
                    ))}
                  </div>
                  {!hasVoted && (
                    <Button
                      onClick={addWordInput}
                      variant="outline"
                      className="w-full border-2 border-dashed hover:bg-muted"
                      size="lg"
                    >
                      + Add More Words
                    </Button>
                  )}
                  <Button
                    onClick={submitWordVote}
                    disabled={hasVoted}
                    className="w-full py-8 text-xl font-bold shadow-lg transition-transform active:scale-[0.98]"
                    size="lg"
                  >
                    {hasVoted ? "Submission Received" : "Submit Words"}
                  </Button>
                </div>
              )}

              {question.question_type === 'free_text' && (
                <div className="space-y-6">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Feedback:</p>
                  <textarea
                    placeholder="Tell us what you think..."
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    disabled={hasVoted}
                    className="w-full min-h-[200px] p-6 rounded-xl border-2 bg-background/50 resize-none focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg leading-relaxed shadow-inner"
                  />
                  <Button
                    onClick={submitFreeTextVote}
                    disabled={hasVoted}
                    className="w-full py-8 text-xl font-bold shadow-lg transition-transform active:scale-[0.98]"
                    size="lg"
                  >
                    {hasVoted ? "Feedback Sent" : "Submit Feedback"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {(!question.correct_answer || question.results_revealed) && (
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <VoteResults
                  roomId={roomId}
                  questionId={question.id}
                  questionType={question.question_type as any}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantView;
