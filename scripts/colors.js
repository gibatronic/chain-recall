var Backbone = require('backbone');
var Color = require('./color');

Backbone.Collection.extend({
  model: Color
});

module.exports = Colors;
