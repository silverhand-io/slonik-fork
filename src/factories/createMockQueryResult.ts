import {
  type QueryResult,
  type QueryResultRow,
} from '../types.js';

export const createMockQueryResult = (rows: readonly QueryResultRow[]): QueryResult<QueryResultRow> => {
  return {
    command: 'SELECT',
    fields: [],
    notices: [],
    rowCount: rows.length,
    rows,
  };
};
