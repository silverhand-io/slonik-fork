import {
  DataIntegrityError,
} from '../errors.js';
import {
  type InternalQueryMethod,
  type TaggedTemplateLiteralInvocation,
} from '../types.js';
import {
  createQueryId,
} from '../utilities/index.js';
import {
  query,
} from './query.js';

export const exists: InternalQueryMethod<Promise<boolean>> = async (log, connection, clientConfiguration, slonikSql, inheritedQueryId) => {
  const queryId = inheritedQueryId ?? createQueryId();

  const {
    rows,
  } = await query(
    log,
    connection,
    clientConfiguration,
    {
      sql: 'SELECT EXISTS(' + slonikSql.sql + ')',
      values: slonikSql.values,
    } as TaggedTemplateLiteralInvocation,
    queryId,
  );

  if (rows.length !== 1) {
    log.error({
      queryId,
    }, 'DataIntegrityError');

    throw new DataIntegrityError();
  }

  return Boolean((rows[0] as Record<string, unknown>).exists);
};
