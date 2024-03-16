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
  maybeOne,
} from './maybeOne.js';

/**
 * Makes a query and expects exactly one result.
 * Returns value of the first column.
 *
 * @throws DataIntegrityError If query returns multiple rows.
 */
export const maybeOneFirst: InternalQueryMethod = async (log, connection, clientConfiguration, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const row = await maybeOne(
    log,
    connection,
    clientConfiguration,
    slonikSql,
    queryId,
  );

  if (!row) {
    return null;
  }

  const keys = Object.keys(row);

  if (keys.length !== 1) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new DataIntegrityError();
  }

  return row[keys[0]];
};
