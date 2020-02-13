export default str =>
  str
    .trim()
    .replace(/^(and)$/, "")
    .replace(/^(\||,|and )/, "")
    .replace(/(\||,| and)$/, "")
    .trim();
