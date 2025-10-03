function memeSpreadTime(subscriptions, starters, target) {
  const graph = new Map();

  for (const [u, v, time] of subscriptions) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push([v, time]);
    graph.get(v).push([u, time]);
  }

  const pq = [];
  const times = new Map();

  for (const starter of starters) {
    pq.push([0, starter]);
    times.set(starter, 0);
  }

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [curTime, node] = pq.shift();

    if (node === target) return curTime;

    for (const [neighbor, t] of graph.get(node) || []) {
      const newTime = curTime + t;
      if (times.get(neighbor) === undefined || newTime < times.get(neighbor)) {
        times.set(neighbor, newTime);
        pq.push([newTime, neighbor]);
      }
    }
  }

  return -1;
}

module.exports = memeSpreadTime;
