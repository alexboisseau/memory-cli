import { ListItem, ListSchema } from "../types";

export class ListFileValidator {
  public static validate(json: any): ListItem[] {
    try {
      const parsedList = ListSchema.parse(json);
      return parsedList;
    } catch (error) {
      throw new Error(`Invalid list file format: ${error.message}`);
    }
  }
}
