import {
  InvalidInputError,
} from '../errors.js';
import {
  Logger,
} from '../Logger.js';
import {
  ArrayToken,
  BinaryToken,
  DateToken,
  IdentifierToken,
  JsonBinaryToken,
  JsonToken,
  ListToken,
  SqlToken,
  TimestampToken,
  UnnestToken,
} from '../tokens.js';
import {
  type ArraySqlToken,
  type BinarySqlToken,
  type DateSqlToken,
  type IdentifierSqlToken,
  type JsonBinarySqlToken,
  type JsonSqlToken,
  type ListSqlToken,
  type PrimitiveValueExpression,
  type QueryResultRow,
  type SerializableValue,
  type SqlSqlToken,
  type SqlTaggedTemplate,
  type SqlToken as SqlTokenType,
  type TimestampSqlToken,
  type TypeNameIdentifier,
  type UnnestSqlToken,
  type ValueExpression,
} from '../types.js';
import {
  escapeLiteralValue,
  isPrimitiveValueExpression,
  isSqlToken,
} from '../utilities/index.js';
import {
  createSqlTokenSqlFragment,
} from './createSqlTokenSqlFragment.js';
import safeStringify from 'fast-safe-stringify';

const log = Logger.child({
  namespace: 'sql',
});

const sql: SqlTaggedTemplate = (
  parts: readonly string[],
  ...values: readonly ValueExpression[]
): SqlSqlToken => {
  let rawSql = '';

  const parameterValues: PrimitiveValueExpression[] = [];

  let index = 0;

  for (const part of parts) {
    const token = values[index++];

    rawSql += part;

    if (index >= parts.length) {
      continue;
    }

    if (token === undefined) {
      log.debug({
        index,
        parts: JSON.parse(safeStringify.default(parts)),
        values: JSON.parse(safeStringify.default(values)),
      }, 'bound values');

      throw new InvalidInputError('SQL tag cannot be bound an undefined value.');
    } else if (isPrimitiveValueExpression(token)) {
      rawSql += '$' + String(parameterValues.length + 1);

      parameterValues.push(token);
    } else if (isSqlToken(token)) {
      const sqlFragment = createSqlTokenSqlFragment(token, parameterValues.length);

      rawSql += sqlFragment.sql;
      parameterValues.push(...sqlFragment.values);
    } else {
      log.error({
        constructedSql: rawSql,
        index,
        offendingToken: JSON.parse(safeStringify.default(token)),
      }, 'unexpected value expression');

      throw new TypeError('Unexpected value expression.');
    }
  }

  const query: SqlTokenType = {
    sql: rawSql,
    type: SqlToken,
    values: parameterValues,
  };

  Object.defineProperty(query, 'sql', {
    configurable: false,
    enumerable: true,
    writable: false,
  });

  return query;
};

sql.array = (
  values: readonly PrimitiveValueExpression[],
  memberType: SqlTokenType | TypeNameIdentifier,
): ArraySqlToken => {
  return {
    memberType,
    type: ArrayToken,
    values,
  };
};

sql.binary = (
  data: Buffer,
): BinarySqlToken => {
  return {
    data,
    type: BinaryToken,
  };
};

sql.date = (
  date: Date,
): DateSqlToken => {
  return {
    date,
    type: DateToken,
  };
};

sql.identifier = (
  names: readonly string[],
): IdentifierSqlToken => {
  return {
    names,
    type: IdentifierToken,
  };
};

sql.join = (
  members: readonly ValueExpression[],
  glue: SqlSqlToken,
): ListSqlToken => {
  return {
    glue,
    members,
    type: ListToken,
  };
};

sql.json = (
  value: SerializableValue,
): JsonSqlToken => {
  return {
    type: JsonToken,
    value,
  };
};

sql.jsonb = (
  value: SerializableValue,
): JsonBinarySqlToken => {
  return {
    type: JsonBinaryToken,
    value,
  };
};

sql.literalValue = (
  value: string,
): SqlSqlToken => {
  return {
    sql: escapeLiteralValue(value),
    type: SqlToken,
    values: [],
  };
};

sql.timestamp = (
  date: Date,
): TimestampSqlToken => {
  return {
    date,
    type: TimestampToken,
  };
};

sql.unnest = (
  tuples: ReadonlyArray<readonly PrimitiveValueExpression[]>,
  columnTypes: Array<[...string[], TypeNameIdentifier]> | Array<SqlSqlToken | TypeNameIdentifier>,
): UnnestSqlToken => {
  return {
    columnTypes,
    tuples,
    type: UnnestToken,
  };
};

sql.raw = (
  rawSql: string,
): SqlSqlToken => {
  return {
    sql: rawSql,
    type: SqlToken,
    values: [],
  };
};

export const createSqlTag = <T extends QueryResultRow = QueryResultRow>(): SqlTaggedTemplate<T> => {
  return sql;
};
