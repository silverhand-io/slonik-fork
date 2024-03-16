import {
  bindPool,
} from '../binders/bindPool.js';
import {
  Logger,
} from '../Logger.js';
import {
  poolStateMap,
} from '../state.js';
import {
  type ClientConfigurationInput,
  type DatabasePool,
  type MockPoolOverrides,
} from '../types.js';
import {
  createUid,
} from '../utilities/index.js';
import {
  createClientConfiguration,
} from './createClientConfiguration.js';

export const createMockPool = (
  overrides: MockPoolOverrides,
  clientConfigurationInput?: ClientConfigurationInput,
): DatabasePool => {
  const clientConfiguration = createClientConfiguration(clientConfigurationInput);

  const poolId = createUid();

  const poolLog = Logger.child({
    poolId,
  });

  const pool = {
    connect: () => {
      const connection = {
        off: () => {},
        on: () => {},
        query: overrides.query,
        release: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;

      return connection;
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  poolStateMap.set(pool, {
    ended: false,
    mock: true,
    poolId,
    typeOverrides: null,
  });

  return bindPool(
    poolLog,
    pool,
    clientConfiguration,
  );
};
