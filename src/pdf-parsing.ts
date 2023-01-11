import { Page, readPdfText } from 'pdf-text-reader';

export default class PdfParser {
  public static async readAllLines(file: string): Promise<string[]> {
    const pages = await readPdfText(file);
    return pages
      .reduce((lines: string[], page: Page) => lines.concat(page.lines), []);
  }
}
