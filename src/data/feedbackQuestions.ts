import { PredefinedQuestion } from "./predefinedQuestions";

export const feedbackQuestions: PredefinedQuestion[] = [
  {
    id: "feedback_1",
    question_text: "How would you rate the training? (1-10)",
    question_type: "number_scale",
    options: []
  },
  {
    id: "feedback_2",
    question_text: "What did you find most valuable?",
    question_type: "word_cloud",
    options: []
  },
  {
    id: "feedback_3",
    question_text: "How would you rate the instructor? (1-10)",
    question_type: "number_scale",
    options: []
  },
  {
    id: "feedback_4",
    question_text: "How well did the training meet your expectations? (1-10)",
    question_type: "number_scale",
    options: []
  },
  {
    id: "feedback_5",
    question_text: "Do you have any other feedback or comments?",
    question_type: "free_text",
    options: []
  }
];
