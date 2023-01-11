import { Page, readPdfText } from 'pdf-text-reader';

interface IReadOptions {
  password?: string;
}

export default class PdfParser {
  public static async readAllLines(file: string, options: IReadOptions = {}): Promise<string[]> {
    const passwordHandler = (callback: (password: string) => void) => {
      callback(options.password || '');
      return ''; // readPdfText requires a string result
    };

    const pages = await readPdfText(file, false, passwordHandler);
    return pages
      .reduce((lines: string[], page: Page) => lines.concat(page.lines), []);
  }
}
