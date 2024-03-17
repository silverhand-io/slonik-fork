import {
  type Interceptor,
} from '../../types.js';
import {
  stripComments,
} from './helpers.js';

type Configuration = {
  /**
   * Strips comments from the query.
   * @default true
   */
  stripComments?: boolean,
};

export const createQueryNormalizationInterceptor = (configuration?: Configuration): Interceptor => {
  return {
    transformQuery: (context, query) => {
      let sql = query.sql;

      if (!configuration || configuration.stripComments !== false) {
        sql = stripComments(query.sql);
      }

      return {
        ...query,
        sql,
      };
    },
  };
};
