'use strict';

const EventEmitter = require('events');
const { withFilter } = require('mercurius');
const randomEvents = require('./randomEvents');
const emitter = new EventEmitter();

// generate random event every 5s
setInterval(() => randomEvents(emitter), 500);

function onChanges (event) {
  return {
    resolve: payload => payload.changes,
    subscribe: withFilter(
      async (root, args, { pubsub }) => {
        const asyncIterator = await pubsub.subscribe(event);
        emitter.on(event, changes => pubsub.publish({ topic: event, payload: { changes } }));
        return asyncIterator;
      },
      async ({ changes }, args, context) => {
        // Ignore empty changes
        const keys = Object.keys(changes).toString();
        return keys === '' ? false : true;
      }
    )
  };
}

module.exports = {
  Query: {
    healthCheck () {
      return true;
    }
  },
  Subscription: {
    onCreate: onChanges('onCreate'),
    onUpdate: onChanges('onUpdate'),
    onRemove: onChanges('onRemove')
  }
};
