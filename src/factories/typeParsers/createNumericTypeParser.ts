import {
  type TypeParser,
} from '../../types.js';

const numericParser = (value: string) => {
  return Number.parseFloat(value);
};

export const createNumericTypeParser = (): TypeParser => {
  return {
    name: 'numeric',
    parse: numericParser,
  };
};
