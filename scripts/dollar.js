var $ = function(query) {
  return document.querySelector(query);
};

var $$ = function(query) {
  return [ ].slice.call(document.querySelectorAll(query));
};

module.exports = {
  $: $,
  $$: $$
};
