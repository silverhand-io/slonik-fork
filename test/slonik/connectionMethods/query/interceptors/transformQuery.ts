import {
  createSqlTag,
} from '../../../../../src/factories/createSqlTag.js';
import {
  createPool,
} from '../../../../helpers/createPool.js';
import test from 'ava';

const sql = createSqlTag();

test('transforms query', async (t) => {
  const pool = await createPool({
    interceptors: [
      {
        transformQuery: (executionContext, query) => {
          return {
            ...query,
            sql: 'SELECT 2',
          };
        },
      },
    ],
  });

  await pool.query(sql`SELECT 1`);

  t.is(pool.querySpy.firstCall.args[0], 'SELECT 2');
});
