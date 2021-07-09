'use strict';

module.exports = `extend type Query {
  healthCheck: Boolean
}
extend type Subscription {
  onCreate: JSONObject
  onUpdate: JSONObject
  onRemove: JSONObject
}`;
