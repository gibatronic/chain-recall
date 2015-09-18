var dollar = require('./dollar');

var $ = dollar.$;
var $$ = dollar.$$;
var colors;
var position;
var sequence;

var $colorBlue;
var $colorCyan;
var $colorGreen;
var $colorOrange;
var $colorRed;
var $colors;
var $colorViolet;
var $colorYellow;
var $itens;
var $panel;
var $start;

var activateColor = function(color) {
  color.classList.add('panel__button--active');
};

var bind = function() {
  $colors.forEach(bindColors);
  $start.addEventListener('click', start);
};

var bindColors = function(color) {
  color.addEventListener('click', check);
};

var cache = function() {
  $colorBlue = $('.panel__item--blue .panel__button--color');
  $colorCyan = $('.panel__item--cyan .panel__button--color');
  $colorGreen = $('.panel__item--green .panel__button--color');
  $colorOrange = $('.panel__item--orange .panel__button--color');
  $colorRed = $('.panel__item--red .panel__button--color');
  $colors = $$('.panel__item .panel__button--color');
  $colorViolet = $('.panel__item--violet .panel__button--color');
  $colorYellow = $('.panel__item--yellow .panel__button--color');
  $itens = $$('.panel__item');
  $panel = $('.panel');
  $start = $('.panel__button--start');

  colors = [
    $colorBlue,
    $colorCyan,
    $colorGreen,
    $colorOrange,
    $colorRed,
    $colorViolet,
    $colorYellow
  ];
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
  color.classList.remove('panel__button--active');
};

var disable = function() {
  $panel.classList.add('panel--disabled');
  $colors.forEach(disableColors);
};

var disableColors = function(color) {
  color.disabled = true;
};

var enable = function() {
  $panel.classList.remove('panel--disabled');
  $colors.forEach(enableColors);
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
  activateColor(color);

  window.setTimeout(function() {
    deactivateColor(color);
    window.setTimeout(playSequence, 400);
  }, 200);
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
