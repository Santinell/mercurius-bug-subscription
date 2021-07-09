'use strict';

const regions = [{
  id: 1,
  city: 'London'
}, {
  id: 2,
  city: 'Paris'
}];

const sizes = [{
  id: 1,
  cpus: 1,
  memory: 1
}, {
  id: 2,
  cpus: 1,
  memory: 2
}, {
  id: 3,
  cpus: 2,
  memory: 4
}];

module.exports = {
  Query: {
    regions () {
      return regions;
    },
    sizes () {
      return sizes;
    }
  },
  Mutation: {
    newRegion (parent, region) {
      regions.push(region);
      return true;
    },
    newSize (parent, size) {
      sizes.push(size);
      return true;
    }
  }
};
