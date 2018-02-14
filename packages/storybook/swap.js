const swap = items =>
  Object.keys(items).reduce(
    (obj, key) => Object.assign({}, obj, { [items[key]]: key }),
    {}
  );

export default swap;
