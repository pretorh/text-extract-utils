import { readPdfText } from 'pdf-text-reader';

interface IReadOptions {
  password?: string;
}

export default class PdfParser {
  public static async readAllLines(file: string, options: IReadOptions = {}): Promise<string[]> {
    const pages = await readPdfText({
      password: options.password,
      filePath: file,
    });
    return pages.split('\n');
  }
}
