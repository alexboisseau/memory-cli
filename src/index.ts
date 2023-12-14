import { ListLoader } from "./classes/list-loader";
import { QuizInitializer } from "./classes/quiz-initializer";
import { LogoPrinter } from "./classes/logo-printer";
import { InquirerPromptTool } from "./adapters/inquirer-prompt-tool";
import { ChalkColoredPrinter } from "./adapters/chalk-colored-printer";

const listsFolderPath = "./lists/";

async function main() {
  // Adapters
  const promptTool = new InquirerPromptTool();
  const coloredPrinter = new ChalkColoredPrinter();

  // Classes
  const listLoader = new ListLoader(promptTool, listsFolderPath);
  const quizInitializer = new QuizInitializer(coloredPrinter, promptTool);
  const logoPrinter = new LogoPrinter();
  logoPrinter.print();

  let continuePlaying = true;

  while (continuePlaying) {
    const list = await listLoader.loadList();
    const quiz = await quizInitializer.init(list);

    await quiz.play();
    continuePlaying = await quiz.askContinuePlaying();
  }
}

main();
