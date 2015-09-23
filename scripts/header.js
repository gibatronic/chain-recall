var dollar = require('./dollar');
var Sequenza = require('Sequenza');

var $ = dollar.$;
var $$ = dollar.$$;
var header;

var cache = function() {
  header = $('.header');
};

var main = function() {
  cache();
  show();
};

var show = function() {
  new Sequenza({
    callback: showStep1,
    delay: 200
  }, {
    callback: showStep2,
    delay: 200
  }, {
    delay: 200
  }, {
    callback: showStep3,
    delay: 200
  }).start();
};

var showStep1 = function() {
  switchStep(0, 1);
};

var showStep2 = function() {
  switchStep(1, 2);
};

var showStep3 = function() {
  switchStep(2, 3);
};

var switchStep = function(from, to) {
  header.classList.remove('header--step-' + from);
  header.classList.add('header--step-' + to);
};

module.exports = main;
