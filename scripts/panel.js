var dollar = require('./dollar');
var Sequenza = require('Sequenza');

var $$ = dollar.$$;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var beepBase = 250;
var beepLength = 0.3;
var beepMultiplier = 1000;
var beepVolume = 0.2;
var colors;
var gain = audioContext.createGain();
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
  setup();
  bind();
};

var playColor = function(color) {
  var currentTime = audioContext.currentTime;

  gain.gain.setValueAtTime(beepVolume, currentTime);
  gain.gain.linearRampToValueAtTime(0, currentTime + beepLength);

  color.dataset
       .token
       .split(',')
       .forEach(playToken);

  new Sequenza({
    callback: activateColor.bind(window, color),
    delay: 0
  }, {
    callback: deactivateColor.bind(window, color),
    delay: 100
  }).start();
};

var playToken = function(token) {
  var currentTime = audioContext.currentTime;
  var oscillator = audioContext.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = (token * beepMultiplier) + beepBase;
  oscillator.connect(gain);
  oscillator.start(currentTime);
  oscillator.stop(currentTime + beepLength);
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

var setup = function() {
  gain.connect(audioContext.destination);
};

var start = function() {
  $start.classList.add('hidden');

  sequence = [ ];

  incrementSequence();
  window.setTimeout(playSequence, 200);
};

module.exports = main;
