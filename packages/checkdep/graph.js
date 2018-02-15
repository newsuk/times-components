import patRegExp from "./pat-regexp";

export default function graph(requirements, pattern) {
  const [l, r] = pattern
    .split("=>")
    .map(x => x||"")
    .map(x => x.trim())
    .map(patRegExp)
    .map(x => new RegExp(x));

  const connections = requirements
    .map(([x, vx, y, vy]) => [`${x}@${vx}`, `${y}@${vy}`])
    .filter(([x, y]) => x.match(l) && y.match(r))
    .map(([x, y]) => `  "${x}" -> "${y}";`)
    .join("\n");

  return "digraph G {\n"+connections+"\n}";
}
