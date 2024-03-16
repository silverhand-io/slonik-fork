import {
  UnexpectedStateError,
} from '../errors.js';
import {
  type InternalQueryMethod,
} from '../types.js';
import {
  createQueryId,
} from '../utilities/index.js';
import {
  one,
} from './one.js';

/**
 * Makes a query and expects exactly one result.
 * Returns value of the first column.
 *
 * @throws NotFoundError If query returns no rows.
 * @throws DataIntegrityError If query returns multiple rows.
 */
export const oneFirst: InternalQueryMethod = async (log, connection, clientConfiguration, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const row = await one(
    log,
    connection,
    clientConfiguration,
    slonikSql,
    queryId,
  );

  const keys = Object.keys(row);

  if (keys.length > 1) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new UnexpectedStateError();
  }

  return row[keys[0]];
};
