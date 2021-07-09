'use strict';

const randomInt = (min, max) => Math.round((Math.random() * (max - min)) + min);
const events = ['onCreate', 'onUpdate', 'onRemove'];
const cities = ['London', 'Paris', 'Dublin', 'Berlin', 'Rome', 'Moscow']
const types = ['Size', 'Region'];

function randomFields(type) {
  const generators = {
    Size: () => {
      return {
        cores: randomInt(1, 8),
        memory: randomInt(1, 32)
      };
    },
    Region: () => {
      return {
        city: cities[randomInt(0, 5)]
      };
    }
  };
  return generators[type]();
};

const changesGenerator = {
  onCreate: () => {
    const type = types[randomInt(0,1)];
    return {
      id: randomInt(1, 100),
      ...randomFields(type),
      __typename: type
    };
  },
  onUpdate: () => {
    // Emulating empty update
    if (randomInt(1, 100) < 10) {
      return {};
    }
    const type = types[randomInt(0,1)];
    return {
      id: randomInt(1, 100),
      ...randomFields(type),
      __typename: type
    };
  },
  onRemove: () => {
    return {
      id: randomInt(1, 100),
      __typename: types[randomInt(0,1)]
    };
  }
};

function randomEvents(emitter) {
  const randomEvent = events[randomInt(0,2)];
  emitter.emit(randomEvent, changesGenerator[randomEvent]());
}

module.exports = randomEvents;