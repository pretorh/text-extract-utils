const { describe, it } = require('mocha');
const { expect } = require('chai');
const { PdfParser } = require('../dist');

const testPdfFile = {
  file: './test/data/test-PDF-file.pdf',
  protectedFile: './test/data/test-password-PDF-file.pdf',
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
  });
});
