var dollar = require('./dollar');
var Sequenza = require('Sequenza');

var $ = dollar.$;
var $$ = dollar.$$;
var colors;
var position;
var sequence;

var activateColor = function(color) {
  color.classList.add('panel__color--active');
};

var bind = function() {
  colors.forEach(bindColors);
};

var bindColors = function(color) {
  color.addEventListener('click', playColor.bind(window, color));
};

var cache = function() {
  colors = $$('.panel__color');
};

var check = function(event) {
  var clickedColor = event.currentTarget;
  var expectedColor = sequence[position];

  if (clickedColor != expectedColor) {
    return window.alert('damn uh oh');
  }

  if (position < sequence.length - 1) {
    return position++;
  }

  disable();
  incrementSequence();
  window.setTimeout(playSequence, 400);
};

var chooseRandomColor = function() {
  return colors[Math.random() * colors.length >> 0];
};

var deactivateColor = function(color) {
  color.classList.remove('panel__color--active');
};

var disable = function() {
  $panel.classList.add('panel--disabled');
  colors.forEach(disableColors);
};

var disableColors = function(color) {
  color.disabled = true;
};

var enable = function() {
  $panel.classList.remove('panel--disabled');
  colors.forEach(enableColors);
};

var enableColors = function(color) {
  color.disabled = false;
};

var incrementSequence = function() {
  position = 0;
  sequence.push(chooseRandomColor());
};

var main = function() {
  cache();
  bind();
};

var playColor = function(color) {
  var stepActivateColor = {
    callback: activateColor.bind(window, color),
    delay: 0
  };

  var stepDeactivateColor = {
    callback: deactivateColor.bind(window, color),
    delay: 150
  };

  new Sequenza(stepActivateColor, stepDeactivateColor).start();
};

var playSequence = function() {
  if (position > sequence.length - 1) {
    position = 0;
    enable();
    return;
  }

  playColor(sequence[position]);
  position++;
};

var start = function() {
  $start.classList.add('hidden');

  sequence = [ ];

  incrementSequence();
  window.setTimeout(playSequence, 200);
};

document.addEventListener('DOMContentLoaded', main);
