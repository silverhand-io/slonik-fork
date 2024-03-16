import {
  assertSqlSqlToken,
} from '../assertions.js';
import {
  any,
  anyFirst,
  exists,
  many,
  manyFirst,
  maybeOne,
  maybeOneFirst,
  one,
  oneFirst,
  query as queryMethod,
  stream,
  transaction,
} from '../connectionMethods/index.js';
import {
  type ClientConfiguration,
  type DatabasePoolConnection,
  type Logger,
} from '../types.js';
import {
  type PoolClient as PgPoolClient,
} from 'pg';

export const bindPoolConnection = (
  parentLog: Logger,
  connection: PgPoolClient,
  clientConfiguration: ClientConfiguration,
): DatabasePoolConnection => {
  return {
    any: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return any(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    anyFirst: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return anyFirst(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    exists: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return exists(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    many: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return many(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    manyFirst: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return manyFirst(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    maybeOne: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return maybeOne(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    maybeOneFirst: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return maybeOneFirst(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    one: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return one(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    oneFirst: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return oneFirst(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    query: (slonikSql) => {
      assertSqlSqlToken(slonikSql);

      return queryMethod(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
      );
    },
    stream: (slonikSql, streamHandler, config) => {
      assertSqlSqlToken(slonikSql);

      return stream(
        parentLog,
        connection,
        clientConfiguration,
        slonikSql,
        streamHandler,
        undefined,
        config,
      );
    },
    transaction: (handler, transactionRetryLimit) => {
      return transaction(
        parentLog,
        connection,
        clientConfiguration,
        handler,
        transactionRetryLimit,
      );
    },
  };
};
