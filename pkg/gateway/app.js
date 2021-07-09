'use strict';

const Fastify = require('fastify');
const mercurius = require('mercurius');
const cors = require('fastify-cors');
const AltairFastify = require('altair-fastify-plugin');
const app = Fastify({ trustProxy: true });

async function startGateway () {

  app.register(cors, {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
  app.register(mercurius, {
    jit: 1,
    path: '/',
    queryDepth: 7,
    ide: false,
    subscription: true,
    errorHandler: true,
    gateway: {
      pollingInterval: 3000,
      services: [
        { name: 'dict', url: process.env.DICT_API || 'http://localhost:3001/' },
        {
          name: 'events',
          url: process.env.EVENTS_API || 'http://localhost:9000/',
          wsUrl: process.env.EVENTS_WS || 'ws://localhost:9000/'
        }
      ]
    }
  });
  app.register(AltairFastify, {
    path: '/playground',
    baseURL: '/playground/',
    endpointURL: '/',
    subscriptionsEndpoint: 'ws://localhost:3000'
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Gateway server ready at http://localhost:${port}`);
}

module.exports = { start: startGateway };
