// Cannot currently serialise on native platforms

export function getMediaQueries() {
  throw new Error("Cannot currently serialise on native platforms");
}

export function markup(Component) {
  return Component;
}

export function withoutSecretProps(props) {
  return props;
}

export function isSecretProp() {
  return false;
}
