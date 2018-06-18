import omit from "lodash.omit";
import omitBy from "lodash.omitby";

function getType({ type }) {
  if (type instanceof Function) {
    return type.name.toLowerCase();
  }
  if (typeof type === "string") {
    return type.toLowerCase();
  }
  return typeof type;
}

function cleanSvgProps(node, props) {
  const type = getType(node);
  return type === "path" || type === "polygon" || type === "svg"
    ? omit(props, ["d", "path", "points", "viewBox"])
    : props;
}

export default excludeProps => (accum, node) => {
  const { ...other } = node.props;

  return {
    accum,
    props: omitBy(
      {
        ...cleanSvgProps(node, other)
      },
      excludeProps
    )
  };
};
