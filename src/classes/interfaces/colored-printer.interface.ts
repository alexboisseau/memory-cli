import { PrintableColor } from "../../types";

export interface IColoredPrinter {
  printMessage: (
    message: Array<{ value: string; color?: PrintableColor }>,
    separator?: string
  ) => void;

  printEmptyLine: () => void;
}
