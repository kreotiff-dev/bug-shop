export const parseStringToDate = (date: string) => {
  return new Date(date).getTime();
};

export const parseSearch = (
  search: string
): { brandId: string | null; typeId: string | null } => {
  const response: { brandId: string | null; typeId: string | null } = {
    brandId: null,
    typeId: null,
  };
  if (!search.length) {
    return response;
  }
  // '?(чтото)=(xtve-nj)&..&...&..'
  const newSearch = search.substr(1).split('&');
  // ['qwe=12','qwe=1']
  newSearch?.forEach((item) => {
    const splitItem = item.split('=');
    if (splitItem[0] === 'brandId') {
      response.brandId = splitItem[1];
    }
    if (splitItem[0] === 'typeId') {
      response.typeId = splitItem[1];
    }
  });
  return response;
};
