import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PredefinedQuestion } from "@/data/predefinedQuestions";

type CustomType = "multiple_choice" | "true_false" | "number_scale" | "free_text";

const NO_CORRECT = "__none__";

interface CustomQuestionDialogProps {
  onStart: (question: PredefinedQuestion, timerSeconds: number) => Promise<void> | void;
}

const CustomQuestionDialog = ({ onStart }: CustomQuestionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [type, setType] = useState<CustomType>("multiple_choice");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [explanation, setExplanation] = useState("");
  const [timer, setTimer] = useState<number>(20);

  const reset = () => {
    setQuestionText("");
    setType("multiple_choice");
    setOptions(["", ""]);
    setCorrectAnswer("");
    setExplanation("");
    setTimer(20);
  };

  const effectiveOptions =
    type === "true_false" ? ["True", "False"] : options.map((o) => o.trim()).filter(Boolean);

  const updateOption = (idx: number, val: string) => {
    const previous = options[idx];
    const next = [...options];
    next[idx] = val;
    setOptions(next);
    if (correctAnswer && correctAnswer === previous && correctAnswer !== val) {
      setCorrectAnswer("");
    }
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (idx: number) => {
    if (options.length <= 2) return;
    const removed = options[idx];
    setOptions(options.filter((_, i) => i !== idx));
    if (correctAnswer === removed) setCorrectAnswer("");
  };

  const handleTypeChange = (v: CustomType) => {
    setType(v);
    setCorrectAnswer("");
  };

  const handleStart = async () => {
    if (!questionText.trim()) {
      toast.error("Please enter a question");
      return;
    }

    let finalOptions: string[] = [];
    if (type === "multiple_choice") {
      finalOptions = options.map((o) => o.trim()).filter(Boolean);
      if (finalOptions.length < 2) {
        toast.error("Add at least 2 non-empty options");
        return;
      }
    } else if (type === "true_false") {
      finalOptions = ["True", "False"];
    }

    const canHaveCorrect = type === "multiple_choice" || type === "true_false";
    const hasCorrect = canHaveCorrect && !!correctAnswer && finalOptions.includes(correctAnswer);

    const question: PredefinedQuestion = {
      id: `custom_${Date.now()}`,
      question_text: questionText.trim(),
      question_type: type === "true_false" ? "multiple_choice" : type,
      options: finalOptions,
      correct_answer: hasCorrect ? correctAnswer : undefined,
      explanation: hasCorrect && explanation.trim() ? explanation.trim() : undefined,
    };

    setSubmitting(true);
    try {
      await onStart(question, timer);
      reset();
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Sparkles className="h-4 w-4 mr-2" />
          Create Custom Question
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Custom Question</DialogTitle>
          <DialogDescription>
            Write your own question and start it immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Question</Label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Type your question..."
              rows={3}
            />
          </div>

          <div>
            <Label className="mb-2 block">Answer type</Label>
            <Select value={type} onValueChange={(v) => handleTypeChange(v as CustomType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple choice</SelectItem>
                <SelectItem value="true_false">True / False</SelectItem>
                <SelectItem value="number_scale">Number scale (0–10)</SelectItem>
                <SelectItem value="free_text">Free text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "multiple_choice" && (
            <div className="space-y-2">
              <Label>Options</Label>
              {options.map((opt, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={opt}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(idx)}
                      aria-label="Remove option"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add option
              </Button>
            </div>
          )}

          {type === "true_false" && (
            <div className="text-sm text-muted-foreground">
              Options will be <span className="font-medium">True</span> and{" "}
              <span className="font-medium">False</span>.
            </div>
          )}

          {(type === "multiple_choice" || type === "true_false") && (
            <div>
              <Label className="mb-2 block">Correct answer (optional)</Label>
              <Select
                value={correctAnswer || NO_CORRECT}
                onValueChange={(v) => setCorrectAnswer(v === NO_CORRECT ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_CORRECT}>No correct answer (opinion poll)</SelectItem>
                  {effectiveOptions.map((o, idx) => (
                    <SelectItem key={`${o}-${idx}`} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(type === "multiple_choice" || type === "true_false") && correctAnswer && (
            <>
              <div>
                <Label className="mb-2 block">Explanation (optional)</Label>
                <Textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Shown after the answer is revealed..."
                  rows={2}
                />
              </div>
              <div>
                <Label className="mb-2 block">Timer (seconds)</Label>
                <Input
                  type="number"
                  min={0}
                  max={60}
                  value={timer}
                  onChange={(e) => setTimer(parseInt(e.target.value) || 20)}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleStart} disabled={submitting}>
            {submitting ? "Starting..." : "Start Question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomQuestionDialog;
