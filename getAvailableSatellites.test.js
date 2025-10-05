const getAvailableSatellites = require("./getAvailableSatellites");

const satellites = [
  {
    name: "Первый",
    check: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
  {
    name: "Второй",
    check: () =>
      new Promise((resolve) => setTimeout(() => resolve("Второй"), 100)),
  },
  {
    name: "Третий",
    check: () =>
      new Promise((resolve) => setTimeout(() => resolve("Третий"), 4000)),
  },
  {
    name: "Четвертый",
    check: () => Promise.reject(new Error("ошибка")),
  },
];

getAvailableSatellites(satellites, 3000)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error("Ошибка:", err);
  });
