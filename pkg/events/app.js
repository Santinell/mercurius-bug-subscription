'use strict';

const Fastify = require('fastify');
const mercurius = require('mercurius');
const { resolvers: scalarResolvers, typeDefs: scalarTypeDefs } = require('graphql-scalars');
const app = Fastify();

async function startServer (schema, resolvers) {
  app.register(mercurius, {
    jit: 1,
    schema: [...scalarTypeDefs, schema],
    path: '/',
    ide: false,
    queryDepth: 7,
    federationMetadata: true,
    resolvers: { ...scalarResolvers, ...resolvers },
    errorHandler: true,
    subscription: true
  });

  const port = process.env.PORT || 9000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Events server ready at http://localhost:${port} and ws://localhost:${port}`);
}

module.exports = { start: startServer };
