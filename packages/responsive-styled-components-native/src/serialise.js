// Cannot currently serialise on native platforms

export function getMediaQueries() {
  throw new Error("Cannot currently serialise on native platforms");
}

export function markup(Component) {
  return Component;
}

export const serializer = null;
