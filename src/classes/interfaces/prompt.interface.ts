type PromptListQuestion = {
  type: "list";
  name: string;
  message: string;
  choices: readonly any[];
};

type PromptConfirmQuestion = {
  type: "confirm";
  name: string;
  message: string;
};

type PromptIntputQuestion = {
  type: "input";
  name: string;
  message: string;
};

type PromptNumberQuestion = {
  type: "number";
  name: string;
  message: string;
};

export type PromptQuestion =
  | PromptListQuestion
  | PromptConfirmQuestion
  | PromptIntputQuestion
  | PromptNumberQuestion;

export interface IPromptTool {
  prompt<Answers>(questions: PromptQuestion): Promise<Answers>;
}
