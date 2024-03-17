import {
  type QueryContext,
} from '../../src/types.js';

export const createQueryContext = (): QueryContext => {
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
    sandbox: {},
  };
};
