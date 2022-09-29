export const updateSearch = (
  search: string,
  query?: { title: string; value: number }[]
): string => {
  if (!query) {
    return search;
  }
  return '';
};
