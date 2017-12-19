export const addMissingProtocol = uri => (uri.startsWith("//") ? `https:${uri}` : uri);
