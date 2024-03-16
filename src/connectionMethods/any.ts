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
 * Makes a query and expects any number of results.
 */
export const any: InternalQueryMethod = async (log, connection, clientConfiguration, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const {
    rows,
  } = await query(log, connection, clientConfiguration, slonikSql, queryId);

  return rows;
};
