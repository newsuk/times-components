import patRegExp from "./pat-regexp";

const req2Name = ({ name, version }) => `${name}@${version}`;

export default function graph(requirements, pattern) {
  const [l, r] = pattern
    .split("=>")
    .map(x => x || "")
    .map(x => x.trim())
    .map(patRegExp)
    .map(x => new RegExp(x));

  const connections = requirements
    .map(req => [req2Name(req.package), req2Name(req.requires)])
    .filter(([x, y]) => x.match(l) && y.match(r))
    .map(([x, y]) => `  "${x}" -> "${y}";`)
    .join("\n");

  // eslint-disable-next-line prefer-template
  return "digraph G {\n" + connections + "\n}";
}
