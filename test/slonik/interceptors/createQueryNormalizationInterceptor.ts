import {
  stripComments,
} from '../../../src/interceptors/createQueryNormalizationInterceptor/helpers.js';
import {
  createQueryNormalizationInterceptor,
} from '../../../src/interceptors/createQueryNormalizationInterceptor/index.js';
import {
  createQueryContext,
} from '../../helpers/createQueryContext.js';
import test from 'ava';

// MARK: `stripComments`
test('removes content beginning with -- from every line in the input', (t) => {
  const subject1 = stripComments(`
    SELECT 1
    FROM foo
  `);

  t.true(subject1 === 'SELECT 1 FROM foo');

  const subject2 = stripComments(`
    SELECT 1 --foo
    FROM foo --bar
  `);

  t.true(subject2 === 'SELECT 1 FROM foo');

  const subject3 = stripComments(`
    SELECT 1 -- foo
    -- bar FROM foo
  `);

  t.true(subject3 === 'SELECT 1');

  const subject4 = stripComments(`
    SELECT 1 -- foo

    -- bar FROM foo
  `);

  t.true(subject4 === 'SELECT 1');
});

test('removes multiline comment blocks', (t) => {
  const subject1 = stripComments(`
    SELECT 1
    /* FROM foo */
  `);

  t.true(subject1 === 'SELECT 1');

  const subject2 = stripComments(`
    SELECT 1 /* foo */
    FROM foo /* bar */
  `);

  t.true(subject2 === 'SELECT 1 FROM foo');

  const subject3 = stripComments(`
    /*
      foo
      bar
    */
    SELECT 1
    FROM foo
  `);

  t.true(subject3 === 'SELECT 1 FROM foo');
});

// MARK: `createQueryNormalizationInterceptor`
test('strips comments from the query', (t) => {
  const interceptor = createQueryNormalizationInterceptor({
    stripComments: true,
  });

  const transformQuery = interceptor.transformQuery;

  if (!transformQuery) {
    throw new Error('Unexpected state.');
  }

  const query = transformQuery(createQueryContext(), {
    sql: 'SELECT 1; --',
    values: [],
  });

  t.deepEqual(query, {
    sql: 'SELECT 1;',
    values: [],
  });
});
