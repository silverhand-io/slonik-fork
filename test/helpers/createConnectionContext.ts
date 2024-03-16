import {
  type ConnectionContext,
} from '../../src/types.js';

export const createConnectionContext = (): ConnectionContext => {
  return {
    connectionId: '1',

    // @ts-expect-error
    log: {
      getContext: () => {
        return {
          connectionId: '1',
          poolId: '1',
        };
      },
    },
    poolId: '1',
  };
};
