import {
  InvalidConfigurationError,
} from '../errors.js';
import {
  type ClientConfiguration,
  type ClientConfigurationInput,
  type TypeParser,
} from '../types.js';
import {
  createTypeParserPreset,
} from './createTypeParserPreset.js';

export const createClientConfiguration = (clientUserConfigurationInput?: ClientConfigurationInput): ClientConfiguration => {
  const typeParsers: readonly TypeParser[] = [];

  const configuration = {
    captureStackTrace: false,
    connectionRetryLimit: 3,
    connectionTimeout: 5_000,
    idleInTransactionSessionTimeout: 60_000,
    idleTimeout: 5_000,
    interceptors: [],
    maximumPoolSize: 10,
    queryRetryLimit: 5,
    statementTimeout: 60_000,
    transactionRetryLimit: 5,
    typeParsers,
    ...clientUserConfigurationInput,
  } satisfies ClientConfiguration;

  if (configuration.maximumPoolSize < 1) {
    throw new InvalidConfigurationError('maximumPoolSize must be equal to or greater than 1.');
  }

  if (!configuration.typeParsers || configuration.typeParsers === typeParsers) {
    configuration.typeParsers = createTypeParserPreset();
  }

  return configuration;
};
