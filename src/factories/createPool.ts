import {
  bindPool,
} from '../binders/bindPool.js';
import {
  Logger,
} from '../Logger.js';
import {
  createTypeOverrides,
} from '../routines/index.js';
import {
  poolStateMap,
} from '../state.js';
import {
  type ClientConfigurationInput,
  type DatabasePool,
} from '../types.js';
import {
  createUid,
} from '../utilities/index.js';
import {
  createClientConfiguration,
} from './createClientConfiguration.js';
import {
  createPoolConfiguration,
} from './createPoolConfiguration.js';
import pg from 'pg';
import {
  serializeError,
} from 'serialize-error';

/**
 * @param connectionUri PostgreSQL [Connection URI](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).
 */
export const createPool = async (
  connectionUri: string,
  clientConfigurationInput?: ClientConfigurationInput,
): Promise<DatabasePool> => {
  const clientConfiguration = createClientConfiguration(clientConfigurationInput);

  const poolId = createUid();

  const poolLog = Logger.child({
    poolId,
  });

  const poolConfiguration = createPoolConfiguration(connectionUri, clientConfiguration);

  let Pool = clientConfiguration.PgPool;

  if (!Pool) {
    // eslint-disable-next-line import/no-named-as-default-member -- https://github.com/brianc/node-postgres/issues/2819
    Pool = pg.Pool;
  }

  if (!Pool) {
    throw new Error('Unexpected state.');
  }

  // eslint-disable-next-line import/no-named-as-default-member -- https://github.com/brianc/node-postgres/issues/2819
  const setupClient = new pg.Client({
    connectionTimeoutMillis: poolConfiguration.connectionTimeoutMillis,
    database: poolConfiguration.database,
    host: poolConfiguration.host,
    password: poolConfiguration.password,
    port: poolConfiguration.port,
    ssl: poolConfiguration.ssl,
    user: poolConfiguration.user,
  });

  await setupClient.connect();

  const getTypeParser = await createTypeOverrides(
    setupClient,
    clientConfiguration.typeParsers,
  );

  await setupClient.end();

  const pool: pg.Pool = new Pool({
    ...poolConfiguration,
    types: {
      getTypeParser,
    },
  });

  poolStateMap.set(pool, {
    ended: false,
    mock: false,
    poolId,
    typeOverrides: null,
  });

  // istanbul ignore next
  pool.on('connect', (client) => {
    client.on('error', (error) => {
      poolLog.error({
        error: serializeError(error),
      }, 'client error');
    });

    client.on('notice', (notice) => {
      poolLog.info({
        notice: {
          level: notice.name,
          message: notice.message,
        },
      }, 'notice message');
    });

    poolLog.debug({
      stats: {
        idleConnectionCount: pool.idleCount,
        totalConnectionCount: pool.totalCount,
        waitingRequestCount: pool.waitingCount,
      },
    }, 'created a new client connection');
  });

  // istanbul ignore next
  pool.on('acquire', () => {
    poolLog.debug({
      stats: {
        idleConnectionCount: pool.idleCount,
        totalConnectionCount: pool.totalCount,
        waitingRequestCount: pool.waitingCount,
      },
    }, 'client is checked out from the pool');
  });

  // istanbul ignore next
  pool.on('remove', () => {
    poolLog.debug({
      stats: {
        idleConnectionCount: pool.idleCount,
        totalConnectionCount: pool.totalCount,
        waitingRequestCount: pool.waitingCount,
      },
    }, 'client connection is closed and removed from the client pool');
  });

  return bindPool(
    poolLog,
    pool,
    clientConfiguration,
  );
};
