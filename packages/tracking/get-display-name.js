const getDisplayName = (WrappedComponent, alternativeName) =>
  alternativeName ||
  WrappedComponent.displayName ||
  WrappedComponent.name ||
  "Component";

export default getDisplayName;
