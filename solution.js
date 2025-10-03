function solution(office, history) {
  const n = office.length;
  const m = office[0].length;

  for (let k = 0; k < history.length; k++) {
    const pos = String(history[k][0]).trim();
    const val = history[k][1];
    const dot = pos.indexOf(".");
    if (dot <= 0) continue;
    const r = parseInt(pos.slice(0, dot), 10);
    const c = parseInt(pos.slice(dot + 1), 10);
    const i = n - r;
    const j = c - 1;
    if (i >= 0 && i < n && j >= 0 && j < m) {
      office[i][j] += val;
    }
  }

  let maxVal = -Infinity;
  let bestRow = 0;
  let bestCol = 0;
  let hasActivity = false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const v = office[i][j];
      if (v > 0) hasActivity = true;

      if (v > maxVal) {
        maxVal = v;
        bestRow = n - i;
        bestCol = j + 1;
      } else if (v === maxVal && v > 0) {
        const rowNum = n - i;
        const colNum = j + 1;
        if (rowNum < bestRow || (rowNum === bestRow && colNum < bestCol)) {
          bestRow = rowNum;
          bestCol = colNum;
        }
      }
    }
  }

  return hasActivity ? `${bestRow}.${bestCol}` : null;
}

module.exports = solution;
