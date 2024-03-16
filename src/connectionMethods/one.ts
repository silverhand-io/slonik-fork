import {
  DataIntegrityError,
  NotFoundError,
} from '../errors.js';
import {
  type InternalQueryMethod,
} from '../types.js';
import {
  createQueryId,
} from '../utilities/index.js';
import {
  query,
} from './query.js';

/**
 * Makes a query and expects exactly one result.
 *
 * @throws NotFoundError If query returns no rows.
 * @throws DataIntegrityError If query returns multiple rows.
 */
export const one: InternalQueryMethod = async (log, connection, clientConfiguration, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const {
    rows,
  } = await query(log, connection, clientConfiguration, slonikSql, queryId);

  if (rows.length === 0) {
    log.error({
      queryId,
    }, 'NotFoundError');

    throw new NotFoundError();
  }

  if (rows.length > 1) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new DataIntegrityError();
  }

  return rows[0];
};
