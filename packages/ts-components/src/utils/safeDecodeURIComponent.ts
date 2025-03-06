const safeDecodeURIComponent = (uri: string) => {
  try {
    return decodeURIComponent(uri);
  } catch {
    return uri;
  }
};

export default safeDecodeURIComponent;
