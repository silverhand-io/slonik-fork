import {
  type TypeParser,
} from '../../types.js';

const timestampParser = (value: string | null) => {
  return value === null ? value : Date.parse(value + ' UTC');
};

export const createTimestampTypeParser = (): TypeParser => {
  return {
    name: 'timestamp',
    parse: timestampParser,
  };
};
