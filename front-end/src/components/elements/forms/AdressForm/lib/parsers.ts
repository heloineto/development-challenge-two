import { isEmpty } from 'lodash';

export const parseZipCode = (value: string) => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 5) return onlyNums;
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
};

export const parseAdress = (value: Adress | undefined) => {
  if (!value || isEmpty(value)) return '';

  const { street, streetNumber, neighborhood, city, state, zipCode } = value;

  return `${street ?? ''}, ${streetNumber ?? ''} - ${neighborhood ?? ''}, ${city ?? ''} - ${
    state ?? ''
  }, CEP ${zipCode ?? ''}`;
};
