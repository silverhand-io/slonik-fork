import {
  UnexpectedStateError,
} from '../errors.js';
import {
  Logger,
} from '../Logger.js';
import {
  type PrimitiveValueExpression,
} from '../types.js';
import safeStringify from 'fast-safe-stringify';

const log = Logger.child({
  namespace: 'createPrimitiveValueExpressions',
});

export const createPrimitiveValueExpressions = (values: readonly unknown[]): readonly PrimitiveValueExpression[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primitiveValueExpressions: Array<any[] | Buffer | boolean | number | string | null> = [];

  for (const value of values) {
    if (Array.isArray(value) ||
        Buffer.isBuffer(value) ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
    ) {
      primitiveValueExpressions.push(value);
    } else {
      log.warn({
        value: JSON.parse(safeStringify.default(value)),
        values: JSON.parse(safeStringify.default(values)),
      }, 'unexpected value expression');

      throw new UnexpectedStateError('Unexpected value expression.');
    }
  }

  return primitiveValueExpressions;
};
