import {
  type TypeParser,
} from '../../types.js';

const dateParser = (value: string) => {
  return value;
};

export const createDateTypeParser = (): TypeParser => {
  return {
    name: 'date',
    parse: dateParser,
  };
};
