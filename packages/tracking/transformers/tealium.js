import _snakeCase from "lodash.snakecase";
import _flow from "lodash.flow";

const flattenEvent = e => ({
  object: e.object,
  action: e.action,
  ...e.attrs
});

const makeKeysSnakeCase = (attrs = {}) =>
  Object.keys(attrs).reduce(
    (accum, key) => ({
      ...accum,
      [_snakeCase(key)]: attrs[key]
    }),
    {}
  );

const map = _flow(flattenEvent, makeKeysSnakeCase);

export default (e = {}) => map(e);
