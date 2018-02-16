export default function patRegExp(pat) {
  if (pat === "") {
    return "";
  }

  return `^${pat.replace(/[*]/g, ".+")}.*$`;
}
