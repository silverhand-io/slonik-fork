import {
  UnexpectedStateError,
} from '../errors.js';
import {
  ArrayToken,
  BinaryToken,
  ComparisonPredicateToken,
  DateToken,
  IdentifierToken,
  JsonBinaryToken,
  JsonToken,
  ListToken,
  SqlToken,
  TimestampToken,
  UnnestToken,
} from '../tokens.js';
import {
  type SqlToken as SqlTokenType,
} from '../types.js';
import {
  hasOwnProperty,
} from './hasOwnProperty.js';

const Tokens = [
  ArrayToken,
  BinaryToken,
  ComparisonPredicateToken,
  DateToken,
  IdentifierToken,
  JsonBinaryToken,
  JsonToken,
  ListToken,
  SqlToken,
  TimestampToken,
  UnnestToken,
] as const;

export const isSqlToken = (subject: unknown): subject is SqlTokenType => {
  if (typeof subject !== 'object' || subject === null) {
    return false;
  }

  if (!hasOwnProperty(subject, 'type')) {
    throw new UnexpectedStateError('Expected token to include "type" property.');
  }

  if (typeof subject.type !== 'string') {
    throw new UnexpectedStateError('Expected type to be string.');
  }

  return (Tokens as readonly string[]).includes(subject.type);
};
