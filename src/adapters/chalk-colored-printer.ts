import { blue, red, yellow, green } from "chalk";
import { PrintableColor } from "../types";
import { IColoredPrinter } from "../classes/interfaces/colored-printer.interface";

export class ChalkColoredPrinter implements IColoredPrinter {
  public printEmptyLine() {
    console.log("\n");
  }

  printMessage(
    message: Array<{ value: string; color?: PrintableColor }>,
    separator?: string
  ) {
    this.printColoredMessage(
      message
        .map(({ value, color }) => this.getChalkColor(color)(value))
        .join(separator || "")
    );
  }

  private printColoredMessage(message: string, color?: PrintableColor) {
    if (!color) {
      console.log(message);
      return;
    }

    const chalkColor = this.getChalkColor(color);
    console.log(chalkColor(message));
  }

  private getChalkColor(color: PrintableColor) {
    switch (color) {
      case "blue":
        return blue;
      case "red":
        return red;
      case "yellow":
        return yellow;
      case "green":
        return green;
      default:
        return (text: string) => text; // Default to no color
    }
  }
}
