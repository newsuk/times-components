const addMissingProtocol = uri => {
  if (!uri) {
    return null;
  }

  return uri.startsWith("//") ? `https:${uri}` : uri;
};

export default addMissingProtocol;
