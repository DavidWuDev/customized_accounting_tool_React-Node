import Moment from 'moment-timezone';

export const formatCurrency = (input: number, digit: number = 2) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    style: 'currency',
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  });

  return formatter.format(input || 0);
};

export const formatDate = (input: Date | string | number) => {
  return Moment(input).format('DD MMM YYYY');
};
