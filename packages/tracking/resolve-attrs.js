export default (attrs = {}, props = {}) =>
  Object.entries(attrs)
    .map(([key, value]) => ({
      [key]: typeof value === "function" ? value(props) : value
    }))
    .reduce((accum, entry) => ({ ...accum, ...entry }), {});
