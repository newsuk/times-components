const EXCLUDED_PATHS = ["/obituaries"];

const isExcludedPage = url => {
  if (!url) return false;

  return EXCLUDED_PATHS.some(path => url.includes(path));
};

export default isExcludedPage;
