import { Page, readPdfText } from 'pdf-text-reader';

interface IReadOptions {
  password?: string;
}

const NO_PASSWORD_GIVEN_REASON = 1;

export default class PdfParser {
  public static async readAllLines(file: string, options: IReadOptions = {}): Promise<string[]> {
    const passwordHandler = (callback: (password: string) => void, reason: string) => {
      const reasonAsInt = parseInt(reason, 10);

      if (reasonAsInt === NO_PASSWORD_GIVEN_REASON) {
        callback(options.password || '');
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
