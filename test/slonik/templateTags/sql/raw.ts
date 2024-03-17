import {
  createSqlTag,
} from '../../../../src/index.js';
import {
  SqlToken,
} from '../../../../src/tokens.js';
import test from 'ava';

const sql = createSqlTag();

test('creates an object describing a query with an inlined raw value', (t) => {
  const query = sql`CREATE USER foo WITH PASSWORD ${sql.raw('\'bar\'')}`;

  t.deepEqual(query, {
    sql: 'CREATE USER foo WITH PASSWORD \'bar\'',
    type: SqlToken,
    values: [],
  });
});
