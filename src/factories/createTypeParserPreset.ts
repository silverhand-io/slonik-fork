import {
  type TypeParser,
} from '../types.js';
import {
  createBigintTypeParser,
  createDateTypeParser,
  createIntervalTypeParser,
  createNumericTypeParser,
  createTimestampTypeParser,
  createTimestampWithTimeZoneTypeParser,
} from './typeParsers/index.js';

export const createTypeParserPreset = (): readonly TypeParser[] => {
  return [
    createBigintTypeParser(),
    createDateTypeParser(),
    createIntervalTypeParser(),
    createNumericTypeParser(),
    createTimestampTypeParser(),
    createTimestampWithTimeZoneTypeParser(),
  ];
};
