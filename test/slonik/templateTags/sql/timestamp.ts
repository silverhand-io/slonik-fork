import {
  createSqlTag,
} from '../../../../src/factories/createSqlTag.js';
import {
  SqlToken,
} from '../../../../src/tokens.js';
import test from 'ava';

const sql = createSqlTag();

test('binds a timestamp', (t) => {
  const query = sql`SELECT ${sql.timestamp(new Date('2022-08-19T03:27:24.951Z'))}`;

  t.deepEqual(query, {
    sql: 'SELECT to_timestamp($1)',
    type: SqlToken,
    values: [
      '1660879644.951',
    ],
  });
});

test('throws if not instance of Date', (t) => {
  const error = t.throws(() => {
    // @ts-expect-error
    sql`SELECT ${sql.timestamp(1)}`;
  });

  t.is(error?.message, 'Timestamp parameter value must be an instance of Date.');
});
