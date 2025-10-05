function getAvailableSatellites(satellites, timeoutMs = 3000) {
  const checkWithTimeout = async (sat) => {
    try {
      const res = await Promise.race([
        sat.check(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), timeoutMs)
        ),
      ]);
      return res ? sat.name : null;
    } catch {
      return null;
    }
  };

  return Promise.all(satellites.map(checkWithTimeout)).then((results) =>
    results.filter((name) => name !== null)
  );
}

module.exports = getAvailableSatellites;
