import { List } from "./list";
import { ListItem } from "../types";
import { readFileSync, readdirSync, existsSync } from "fs";
import { IPromptTool } from "./interfaces/prompt.interface";
import { ListFileValidator } from "./list-file-validator";

class FileNotFoundError extends Error {
  constructor(fileName: string, path: string) {
    super(`File '${fileName}' not found at path: ${path}`);
  }
}

class ListLoadError extends Error {
  constructor(listName: string, path: string, message: string) {
    super(`Error loading list '${listName}' at path ${path}: ${message}`);
  }
}

export class ListLoader {
  constructor(
    private readonly promptTool: IPromptTool,
    private readonly pathToLists: string
  ) {
    if (!pathToLists.endsWith("/")) {
      this.pathToLists += "/";
    }
  }

  public async loadList(): Promise<List> {
    const availableLists = this.getAvailableLists();
    const selectedList = await this.promptForList(availableLists);
    const vocabularyList: ListItem[] = this.getListItems(selectedList);

    return new List(vocabularyList);
  }

  private getAvailableLists() {
    return readdirSync(this.pathToLists).map((file) =>
      file.replace(".json", "")
    );
  }

  private async promptForList(availableLists: string[]): Promise<string> {
    const response = await this.promptTool.prompt<{ selectedList: string }>({
      type: "list",
      name: "selectedList",
      message: "Select a list:",
      choices: availableLists,
    });

    return response.selectedList;
  }

  private getListItems(listName: string): ListItem[] {
    const fileName = `${listName}.json`;
    const filePath = `${this.pathToLists}${fileName}`;

    if (!existsSync(filePath)) throw new FileNotFoundError(fileName, filePath);

    try {
      const data = readFileSync(filePath, "utf8");
      const json = JSON.parse(data);

      return ListFileValidator.validate(json);
    } catch (error) {
      throw new ListLoadError(listName, filePath, error.message);
    }
  }
}
