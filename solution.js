function solution(office, history) {
  const N = office.length;
  const M = office[0].length;

  let activity = Array.from({ length: N }, (_, i) => [...office[i]]);

  for (let [pos, change] of history) {
    let [rStr, cStr] = pos.split(".");
    let row = Number(rStr);
    let col = Number(cStr);

    let i = N - row;
    let j = col - 1;

    activity[i][j] += change;
  }

  let maxActivity = -Infinity;
  let bestRoom = null;

  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      let currentActivity = activity[i][j];
      if (currentActivity > maxActivity) {
        maxActivity = currentActivity;
        bestRoom = `${N - i}.${j + 1}`;
      } else if (currentActivity === maxActivity) {
        let currentRoom = `${N - i}.${j + 1}`;
        let [bestR, bestC] = bestRoom.split(".").map(Number);
        let [currR, currC] = currentRoom.split(".").map(Number);

        if (currR < bestR || (currR === bestR && currC < bestC)) {
          bestRoom = currentRoom;
        }
      }
    }
  }

  if (maxActivity <= 0) {
    return null;
  }

  return bestRoom;
}

module.exports = solution;
