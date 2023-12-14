import { PRINTABLE_COLORS } from "../constants/printable-colors";
import { QUIZ_MODES } from "../constants/quiz-modes";
import { z } from "zod";

const ListItemSchema = z.object({
  question: z.string(),
  choices: z.array(
    z.object({
      value: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  response: z.string(),
  example: z.string(),
});

export const ListSchema = z.array(ListItemSchema);

export type ListItem = z.infer<typeof ListItemSchema>;

export type QuizType = (typeof QUIZ_MODES)[number];

export type QuizConfiguration = {
  selectedMode: QuizType;
  maxQuestions: number;
};

export type PrintableColor = (typeof PRINTABLE_COLORS)[number];
