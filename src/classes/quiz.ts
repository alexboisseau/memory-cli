import { shuffleArray } from "../utils/shuffle-array";
import { calculatePercentage } from "../utils/calculate-percentage";
import { List } from "./list";
import { ListItem, PrintableColor } from "../types";
import { IPromptTool } from "./interfaces/prompt.interface";
import { IColoredPrinter } from "./interfaces/colored-printer.interface";

export abstract class Quiz {
  private score: number = 0;

  constructor(
    protected readonly coloredPrinter: IColoredPrinter,
    protected readonly promptTool: IPromptTool,
    private readonly list: List,
    private readonly maxQuestions: number
  ) {}

  public async play() {
    for (const item of this.list.prepareItemsForQuiz(this.maxQuestions)) {
      const isCorrect = await this.askQuestion(item);
      this.printQuestionResult(isCorrect, item);
      this.handleQuestionResult(isCorrect);
    }

    this.printScore();
  }

  public async askContinuePlaying(): Promise<boolean> {
    const { continuePlayingAnswer } = await this.promptTool.prompt<{
      continuePlayingAnswer: boolean;
    }>({
      type: "confirm",
      name: "continuePlayingAnswer",
      message: "Do you want to continue playing?",
    });

    return Boolean(continuePlayingAnswer);
  }

  private printQuestionResult(isCorrect: boolean, item: ListItem) {
    if (isCorrect) {
      this.coloredPrinter.printMessage([
        { value: "😇 Correct\n", color: "green" },
      ]);
    } else {
      this.coloredPrinter.printMessage([
        { value: "👹 Incorrect\n", color: "red" },
      ]);
    }
    this.coloredPrinter.printMessage([
      { value: `Example: ${item.example}\n`, color: "blue" },
    ]);
  }

  private handleQuestionResult(isCorrect: boolean) {
    if (isCorrect) {
      this.score += 1;
    }
  }

  public printScore() {
    const percentage = calculatePercentage(this.score, this.maxQuestions);
    const percentageColor: PrintableColor =
      percentage < 50 ? "red" : percentage < 80 ? "yellow" : "green";

    this.coloredPrinter.printMessage([
      {
        value: `Vocabulary quiz completed! Your score: ${this.score}/${this.maxQuestions} (`,
      },
      {
        value: percentage + "%",
        color: percentageColor,
      },
      {
        value: ")",
      },
    ]);
  }

  abstract askQuestion(item: ListItem): Promise<boolean>;
}

export class MultipleChoiceQuiz extends Quiz {
  constructor(
    coloredPrinter: IColoredPrinter,
    promptTool: IPromptTool,
    list: List,
    maxQuestions: number
  ) {
    super(coloredPrinter, promptTool, list, maxQuestions);
  }

  async askQuestion(item: ListItem) {
    const shuffledChoices = shuffleArray(item.choices);
    const choices = shuffledChoices.map((choice) => choice.value);
    const { response } = await this.promptTool.prompt<{
      response: (typeof choices)[number];
    }>({
      type: "list",
      name: "response",
      message: `What is the response to: ${item.question}`,
      choices,
    });

    return response === item.response;
  }
}

export class WriteResponseQuiz extends Quiz {
  constructor(
    coloredPrinter: IColoredPrinter,
    promptTool: IPromptTool,
    list: List,
    maxQuestions: number
  ) {
    super(coloredPrinter, promptTool, list, maxQuestions);
  }

  async askQuestion(item: ListItem) {
    const { response } = await this.promptTool.prompt<{ response: string }>({
      type: "input",
      name: "response",
      message: `What is the response to: ${item.question}`,
    });

    return response === item.response;
  }
}
