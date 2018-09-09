const express = require('express');
const graphqlHTTP = require('express-graphql');
const { nodeEnv } = require('./util');

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];

const pgPool = new pg.Pool(pgConfig);

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

const app = express();
const ncSchema = require('../schema');

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);

  app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPool, mPool },
  }));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Running in ${nodeEnv} mode... `);
    console.log(`http://localhost:${PORT}/graphql`);
  });
});
