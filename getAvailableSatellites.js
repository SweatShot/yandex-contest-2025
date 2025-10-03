function getAvailableSatellites(satellites, timeoutMs = 3000) {
  const checkWithTimeout = (sat) => {
    return Promise.race([
      sat.check(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      ),
    ]).then(
      () => sat.name,
      () => null
    );
  };

  return Promise.all(satellites.map(checkWithTimeout)).then((results) =>
    results.filter((name) => name !== null)
  );
}

module.exports = getAvailableSatellites;
