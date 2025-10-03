function solution(root) {
  const result = {};

  function traverse(obj, path = []) {
    for (const key in obj) {
      const value = obj[key];
      const newPath = [...path, key];
      if (typeof value === "function") {
        const compositeKey = newPath.join(".");
        result[compositeKey] = (...args) => value(compositeKey, ...args);
      } else if (typeof value === "object" && value !== null) {
        traverse(value, newPath);
      }
    }
  }

  traverse(root);
  return result;
}

module.exports = solution;
