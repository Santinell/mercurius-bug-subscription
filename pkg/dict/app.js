'use strict';

const Fastify = require('fastify');
const mercurius = require('mercurius');
const app = Fastify();

async function startServer (schema, resolvers) {

  app.register(mercurius, {
    jit: 1,
    schema,
    path: '/',
    ide: false,
    queryDepth: 7,
    federationMetadata: true,
    resolvers,
    errorHandler: true
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Dict server ready at http://localhost:${port}`);
}

module.exports = { start: startServer };
