import { ListItem } from "../types";
import { shuffleArray } from "../utils/shuffle-array";

class InvalidMaxQuestionsError extends Error {
  constructor() {
    super("Invalid value for maxQuestions");
  }
}

export class List {
  constructor(public readonly items: ListItem[]) {}

  public prepareItemsForQuiz(maxQuestions: number) {
    if (maxQuestions <= 0 || maxQuestions > this.items.length) {
      throw new InvalidMaxQuestionsError();
    }

    const shuffledItems = shuffleArray([...this.items]);
    return shuffledItems.slice(0, maxQuestions);
  }
}
