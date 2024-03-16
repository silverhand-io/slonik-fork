import {
  createIntegrationTests,
  createTestRunner,
} from '../../helpers/createIntegrationTests.js';
import pg from 'pg';
import postgres from 'postgres';
import {
  createPostgresBridge,
} from 'postgres-bridge';

const {
  // eslint-disable-next-line import/no-named-as-default-member -- https://github.com/brianc/node-postgres/issues/2819
  Pool: PgPool,
} = pg;

const Pool = createPostgresBridge(postgres) as unknown as typeof PgPool;

const {
  test,
} = createTestRunner(Pool, 'postgres-bridge');

createIntegrationTests(
  test,
  PgPool,
);
