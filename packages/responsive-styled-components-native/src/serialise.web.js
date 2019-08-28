import { MEDIA_QUERY_PROP_MAPPER_TAG, INTERNALS, ID_ATTR } from "./shared";

function getHash() {
  let hash;

  while (!hash || INTERNALS[hash]) {
    hash = Math.random()
      .toString(36)
      .substring(7);
  }

  return hash;
}

export function markupMediaQuery(propMapper, info) {
  const fn = process.env.RESPONSIVE_NATIVE_STYLED_COMPONENTS_NATIVE_TESTS
    ? propMapper
    : () => "";

  // eslint-disable-next-line no-param-reassign
  fn[MEDIA_QUERY_PROP_MAPPER_TAG] = info;
  return fn;
}

function groupBy(arr, condition) {
  const a = [];
  const b = [];

  arr.forEach(item => {
    (condition(item) ? a : b).push(item);
  });

  return [a, b];
}

export function createPropMarker(args) {
  const hash = getHash();
  const [css, mediaQueries] = groupBy(
    args,
    arg => !arg[MEDIA_QUERY_PROP_MAPPER_TAG]
  );

  INTERNALS.serializer[hash] = {
    css,
    mediaQueries: mediaQueries.map(fn => fn[MEDIA_QUERY_PROP_MAPPER_TAG])
  };

  return props => ({
    ...props,
    [ID_ATTR]: hash
  });
}

