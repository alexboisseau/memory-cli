import { QUIZ_MODES } from "../constants/quiz-modes";
import { MultipleChoiceQuiz, Quiz, WriteResponseQuiz } from "./quiz";
import { List } from "./list";
import { QuizConfiguration, QuizType } from "../types";
import { IPromptTool } from "./interfaces/prompt.interface";
import { IColoredPrinter } from "./interfaces/colored-printer.interface";

const PROMPT_NAMES = {
  SELECTED_MODE: "selectedMode",
  MAX_QUESTIONS: "maxQuestionsStr",
};

export class QuizInitializer {
  constructor(
    private readonly coloredPrinter: IColoredPrinter,
    private readonly promptTool: IPromptTool
  ) {}

  public async init(list: List): Promise<Quiz> {
    const { selectedMode, maxQuestions } = await this.getConfiguration(
      list.items.length
    );

    return selectedMode === "multiple-choice"
      ? new MultipleChoiceQuiz(
          this.coloredPrinter,
          this.promptTool,
          list,
          maxQuestions
        )
      : new WriteResponseQuiz(
          this.coloredPrinter,
          this.promptTool,
          list,
          maxQuestions
        );
  }

  private async getConfiguration(
    listLength: number
  ): Promise<QuizConfiguration> {
    const selectedMode = await this.promptForSelectMode();
    const maxQuestions = await this.promptForMaxQuestions(listLength);

    return {
      selectedMode,
      maxQuestions,
    };
  }

  private async promptForSelectMode() {
    const { selectedMode } = await this.promptTool.prompt<{
      selectedMode: QuizType;
    }>({
      type: "list",
      name: PROMPT_NAMES.SELECTED_MODE,
      message: "Choose a mode:",
      choices: QUIZ_MODES,
    });

    return selectedMode;
  }

  private async promptForMaxQuestions(listLength: number) {
    const { maxQuestionsStr } = await this.promptTool.prompt<{
      maxQuestionsStr: string;
    }>({
      type: "number",
      name: PROMPT_NAMES.MAX_QUESTIONS,
      message:
        "Choose the number of questions (type any key or 0 to be asked on the entire list):",
    });

    const parsedMaxQuestions = parseInt(maxQuestionsStr);

    if (isNaN(parsedMaxQuestions) || parsedMaxQuestions === 0) {
      return listLength;
    }

    return parsedMaxQuestions;
  }
}
