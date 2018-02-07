export default function summarise(text) {
  if (!text || !text.length) {
    return text || [];
  }

  const initial = text.slice(0, text.length - 1);
  const last = text[text.length - 1];
  const teaser = Object.assign({}, last, {
    name: "teaser",
    attributes: { isSingle: initial.length === 0 }
  });

  return [...initial, teaser];
}
