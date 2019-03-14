const getActiveArticleFlags = flags => {
  if (!flags || flags.length === 0) return [];
  return flags
    .map(
      flag =>
        new Date().getTime() < new Date(flag.expiryTime).getTime() ? flag : null
    )
    .filter(flag => flag !== null);
};

export default getActiveArticleFlags;
