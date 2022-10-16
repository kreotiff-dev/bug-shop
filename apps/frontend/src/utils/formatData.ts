import { Sex } from '@prisma/client';

export const formateDate = (dateNumber: number | Date): string => {
  let date: Date;

  if (typeof dateNumber === 'number') {
    date = new Date(dateNumber * 1000);
  } else {
    date = new Date(dateNumber);
  }
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}.${month}.${year}`;
};

export const formatDateForInput = (
  dateNumber: number | null
): string | null => {
  if (!dateNumber) return null;
  const date = new Date(dateNumber * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

export const formatSex = (sex: Sex) => {
  if (sex === Sex.MALE) {
    return 'М';
  } else if (sex === Sex.FEMALE) {
    return 'Ж';
  } else {
    return '';
  }
};

export const formatPhone = (phone: string) => {
  return phone.replace(
    /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    '+$1 ($2) $3-$4-$5'
  );
};

export const formatSearch = (filter: {
  brandId: string | null;
  typeId: string | null;
  page: string;
}) => {
  if (filter.brandId === null && filter.typeId === null) {
    return `page=${filter.page}`;
  } else if (filter.brandId === null && filter.typeId !== null) {
    return `page=${filter.page}&typeId=${filter.typeId}`;
  } else if (filter.typeId === null && filter.brandId !== null) {
    return `page=${filter.page}&brandId=${filter.brandId}`;
  } else {
    return `page=${filter.page}&typeId=${filter.typeId}&brandId=${filter.brandId}`;
  }
};
