import {
  createSqlTag,
} from './factories/index.js';

export const sql = createSqlTag();

export {
  BackendTerminatedError,
  CheckIntegrityConstraintViolationError,
  ConnectionError,
  DataIntegrityError,
  ForeignKeyIntegrityConstraintViolationError,
  IntegrityConstraintViolationError,
  InvalidConfigurationError,
  InvalidInputError,
  NotFoundError,
  NotNullIntegrityConstraintViolationError,
  SlonikError,
  StatementCancelledError,
  StatementTimeoutError,
  TupleMovedToAnotherPartitionError,
  UnexpectedStateError,
  UniqueIntegrityConstraintViolationError,
} from './errors.js';
export {
  createMockPool,
  createMockQueryResult,
  createPool,
  createSqlTag,
  createSqlTokenSqlFragment,
  createTypeParserPreset,
} from './factories/index.js';
export * from './factories/typeParsers/index.js';
export * from './interceptors/index.js';
export * as tokens from './tokens.js';
export * from './types.js';
export {
  isSqlToken,
  parseDsn,
  stringifyDsn,
} from './utilities/index.js';
