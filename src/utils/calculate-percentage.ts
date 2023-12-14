export function calculatePercentage(score: number, total: number) {
  return parseInt(((score / total) * 100).toFixed(2));
}
