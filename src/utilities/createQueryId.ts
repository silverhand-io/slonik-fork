import {
  type QueryId,
} from '../types.js';
import {
  createUid,
} from './createUid.js';

export const createQueryId = (): QueryId => {
  return createUid();
};
