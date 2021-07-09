'use strict';

const gatewayServer = require('./app');

process.on('unhandledRejection', err =>
  console.error('Unhandled promise rejection:\n', err)
);

function delay (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bootstrap () {
  await delay(1000);
  await gatewayServer.start();
}

bootstrap();
