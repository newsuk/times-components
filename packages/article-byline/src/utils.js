export default str =>
  str
    .trim()
    .replace(/^(\||,)/, "")
    .replace(/(\||,)$/, "")
    .trim();
