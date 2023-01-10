/* eslint import/prefer-default-export: 0 */
export function filterLines(lines: string[], before: RegExp, after: RegExp): string[] {
  let waitingForBeforeLine = true;
  let foundAfterLine = false;

  return lines.filter((line) => {
    if (waitingForBeforeLine) {
      waitingForBeforeLine = line.match(before) == null;
      return false;
    }
    foundAfterLine = foundAfterLine || line.match(after) !== null;
    if (foundAfterLine) {
      return false;
    }

    return true;
  });
}
