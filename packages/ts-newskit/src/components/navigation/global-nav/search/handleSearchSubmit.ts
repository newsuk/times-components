export const handleSearchSubmit = (
  source: 'desktop' | 'mobile',
  searchText: string
) => {
  window.location.href = `/search?source=nav-${source}&q=${searchText}`;
};
