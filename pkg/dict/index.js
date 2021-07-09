'use strict';

const appServer = require('./app');
const schema = require('./schema');
const resolvers = require('./resolvers');

process.on('unhandledRejection', err =>
  console.error('Unhandled promise rejection:\n', err)
);

async function bootstrap () {
  await appServer.start(schema, resolvers);
}

bootstrap();
