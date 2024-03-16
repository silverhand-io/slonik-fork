const {
  TEST_ONLY_NON_INTEGRATION,
  TEST_ONLY_PG_INTEGRATION,
  TEST_ONLY_POSTGRES_INTEGRATION,
// eslint-disable-next-line node/no-process-env
} = process.env;

export default () => {
  let files = [
    'test/slonik/**/*',
  ];

  if (TEST_ONLY_NON_INTEGRATION) {
    files = [
      'test/slonik/**/*',
      '!test/slonik/integration',
    ];
  }

  if (TEST_ONLY_PG_INTEGRATION) {
    files = [
      'test/slonik/integration/pg.ts',
    ];
  }

  if (TEST_ONLY_POSTGRES_INTEGRATION) {
    files = [
      'test/slonik/integration/postgres.ts',
    ];
  }

  return {
    files,
    typescript: {
      "rewritePaths": {
				"src/": "dist/src/",
        "test/": "dist/test/",
			},
			"compile": 'tsc'
    },
    timeout: '30s',
  };
};
