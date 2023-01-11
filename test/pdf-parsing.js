const { describe, it } = require('mocha');
const { expect } = require('chai');
const Path = require('path');
const { PdfParser } = require('../dist');

function absolutePath(s) {
  return Path.resolve(process.cwd(), 'test', s);
}

const testPdfFile = {
  file: absolutePath('./data/Test-PDF-file.pdf'),
  protectedFile: absolutePath('./data/Test-password-PDF-file.pdf'),
  lines: {
    all: [
      'Test PDF file',
      '',
      'With multiple lines',
      // page 2
      'And multiple pages',
      '',
      // table on page 2
      'And Some Tables Summary',
      'With data 1 1 1',
      'More data nothing 2',
    ],
  },
};

describe('PDF parsing', () => {
  describe('readAllLines', () => {
    it('returns all the lines in a PDF file', async () => {
      const lines = await PdfParser.readAllLines(testPdfFile.file);
      expect(lines).to.have.same.members(testPdfFile.lines.all);
    });
  });

  describe('password protected PDFs', () => {
    it('can read lines when password given', async () => {
      const lines = await PdfParser.readAllLines(testPdfFile.protectedFile, { password: 'OpenPassword' });
      expect(lines).to.have.same.members(testPdfFile.lines.all);
    });

    it('fails for invalid password (does not loop indefinitely)', async () => {
      let success = false;
      try {
        await PdfParser.readAllLines(testPdfFile.protectedFile, { password: 'INVALID' });
        success = true;
      } catch { /* ignored */ }
      expect(success).to.equals(false);
    });
  });
});
