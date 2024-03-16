import {
  InvalidInputError,
} from '../errors.js';
import {
  type IdentifierSqlToken,
  type SqlFragment,
} from '../types.js';
import {
  escapeIdentifier,
} from '../utilities/index.js';

export const createIdentifierSqlFragment = (token: IdentifierSqlToken): SqlFragment => {
  const sql = token.names
    .map((identifierName) => {
      if (typeof identifierName !== 'string') {
        throw new InvalidInputError('Identifier name array member type must be a string.');
      }

      return escapeIdentifier(identifierName);
    })
    .join('.');

  return {
    sql,
    values: [],
  };
};
