import {
  createSqlTag,
} from '../../../../src/factories/createSqlTag';
import {
  SqlToken,
} from '../../../../src/tokens';
import test from 'ava';

const sql = createSqlTag();

test('creates an object describing a query with inlined identifiers', (t) => {
  const query = sql`SELECT ${'foo'} FROM ${sql.identifier([
    'bar',
  ])}`;

  t.deepEqual(query, {
    sql: 'SELECT $1 FROM "bar"',
    type: SqlToken,
    values: [
      'foo',
    ],
  });
});

test('creates an object describing a query with inlined identifiers (specifier)', (t) => {
  const query = sql`SELECT ${'foo'} FROM ${sql.identifier([
    'bar',
    'baz',
  ])}`;

  t.deepEqual(query, {
    sql: 'SELECT $1 FROM "bar"."baz"',
    type: SqlToken,
    values: [
      'foo',
    ],
  });
});

test('throws if an identifier name array member type is not a string', (t) => {
  const error = t.throws(() => {
    sql`${sql.identifier([
      // @ts-expect-error
      () => {},
    ])}`;
  });

  t.is(error?.message, 'Identifier name array member type must be a string.');
});
