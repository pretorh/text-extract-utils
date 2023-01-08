/* eslint import/prefer-default-export: 0 */
export function filterLines(lines: string[], before: string, after: string): string[] {
  let waitingForBeforeLine = true;
  let foundAfterLine = false;

  return lines.filter((line) => {
    if (waitingForBeforeLine) {
      waitingForBeforeLine = line !== before;
      return false;
    }
    foundAfterLine = foundAfterLine || line === after;
    if (foundAfterLine) {
      return false;
    }

    return true;
  });
}
