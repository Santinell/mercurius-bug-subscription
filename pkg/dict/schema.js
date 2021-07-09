'use strict';

module.exports = `type Size @key(fields: "id") {
  id: Int!
  cores: Int!
  memory: Int!
}

type Region @key(fields: "id") {
  id: Int!
  city: String!
}

extend type Query {
  regions: [Region!]
  sizes: [Size!]
}

extend type Mutation {
  newRegion(id: Int!, city: String!): Boolean
  newSize(id: Int!, cores: Int!, memory: Int!): Boolean
}`;
