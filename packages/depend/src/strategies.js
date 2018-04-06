import semver from "semver";

function combine(s1, s2) {
  return (a, b) => s1(a, b) || s2(a, b);
}

// TODO: support semver ranges
export function conservative(a, b) {
  return semver.compare(a.version, b.version);
}

export function progressive(a, b) {
  return semver.compare(b.version, a.version);
}

export function majority(a, b) {
  return b.usedBy.length - a.usedBy.length;
}

export const majorityConservative = combine(majority, conservative);
export const majorityProgressive = combine(majority, progressive);
