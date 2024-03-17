import {
  createFieldNameTransformationInterceptor,
} from './createFieldNameTransformationInterceptor/index.js';
import {
  createQueryNormalizationInterceptor,
} from './createQueryNormalizationInterceptor/index.js';

/**
 * Creates a preset of interceptors that transform field names to camel case and normalize queries.
 */
export const createInterceptorsPreset = () => {
  return Object.freeze([
    createFieldNameTransformationInterceptor({
      format: 'CAMEL_CASE',
    }),
    createQueryNormalizationInterceptor(),
  ]);
};
