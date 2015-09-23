var header = require('./header');
var panel = require('./panel');

var main = function() {
  header();
  panel();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
