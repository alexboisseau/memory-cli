import inquirer from "inquirer";
import {
  IPromptTool,
  PromptQuestion,
} from "../classes/interfaces/prompt.interface";

export class InquirerPromptTool implements IPromptTool {
  async prompt<Answers>(questions: PromptQuestion): Promise<Answers> {
    return inquirer.prompt<Answers>(questions);
  }
}
