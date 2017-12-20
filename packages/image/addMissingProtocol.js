const addMissingProtocol = uri => (uri.startsWith("//") ? `https:${uri}` : uri);

export default addMissingProtocol;
