import {
  createSqlTag,
} from '../../../../src/factories/createSqlTag.js';
import {
  SqlToken,
} from '../../../../src/tokens.js';
import test from 'ava';

const sql = createSqlTag();

test('creates an object describing a query with an inlined literal value', (t) => {
  const query = sql`CREATE USER foo WITH PASSWORD ${sql.literalValue('bar')}`;

  t.deepEqual(query, {
    sql: 'CREATE USER foo WITH PASSWORD \'bar\'',
    type: SqlToken,
    values: [],
  });
});
