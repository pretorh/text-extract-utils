/* eslint import/prefer-default-export: 0 */
export function filterLines(lines: string[], before: string, after: string): string[] {
  const indexBefore = lines.indexOf(before);
  const indexAfter = lines.indexOf(after);
  return lines.slice(indexBefore + 1, indexAfter);
}
