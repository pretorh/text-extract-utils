import { Page, readPdfText } from 'pdf-text-reader';

interface IReadOptions {
  password?: string;
}

export default class PdfParser {
  public static async readAllLines(file: string, options: IReadOptions = {}): Promise<string[]> {
    let firstPasswordRequest = true;
    const passwordHandler = (callback: (password: string) => void) => {
      if (firstPasswordRequest && options.password) {
        callback(options.password);
        firstPasswordRequest = false;
      } else {
        throw new Error('Failed to open protected PDF file');
      }
      return ''; // readPdfText requires a string result
    };

    const pages = await readPdfText(file, false, passwordHandler);
    return pages
      .reduce((lines: string[], page: Page) => lines.concat(page.lines), []);
  }
}
