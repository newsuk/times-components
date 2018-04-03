export default (getAttrs = () => ({}), props = {}, eventArgs = []) =>
  typeof getAttrs === "function" ? getAttrs(props, eventArgs) : {};
