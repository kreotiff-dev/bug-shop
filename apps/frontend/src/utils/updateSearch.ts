export const updateSearch = (
  search: string,
  query?: { title: string; value: number }[]
): string => {
  const oldQuery = search.substr(1).split('?');
  const newSearch = '';
  if (!query) {
    return search;
  }
  return '';
};
