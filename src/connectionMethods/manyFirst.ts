import {
  DataIntegrityError,
} from '../errors.js';
import {
  type InternalQueryMethod,
} from '../types.js';
import {
  createQueryId,
} from '../utilities/index.js';
import {
  many,
} from './many.js';

export const manyFirst: InternalQueryMethod = async (log, connection, clientConfigurationType, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const rows = await many(log, connection, clientConfigurationType, slonikSql, queryId);

  if (rows.length === 0) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new DataIntegrityError();
  }

  const keys = Object.keys(rows[0] as Record<string, unknown>);

  if (keys.length !== 1) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new DataIntegrityError();
  }

  const firstColumnName = keys[0];

  return (rows as Array<Record<string, unknown>>).map((row) => {
    return row[firstColumnName];
  });
};
