var dollar = require('./dollar');
var Sequenza = require('Sequenza');

var $ = dollar.$;
var $$ = dollar.$$;
var $colors;
var $panel;
var $start;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var beepBase = 200;
var beepLength = 0.3;
var beepMultiplier = 1000;
var beepVolume = 0.2;
var gain = audioContext.createGain();

var activateColor = function(color) {
  color.classList.add('panel__color--active');
};

var bind = function() {
  $colors.forEach(bindColors);
  $start.addEventListener('click', start);
};

var bindColors = function(color) {
  color.addEventListener('click', playColor.bind(window, color));
};

var cache = function() {
  $colors = $$('.panel__color');
  $panel = $('.panel');
  $start = $('.panel__start');
};

var deactivateColor = function(color) {
  color.classList.remove('panel__color--active');
};

var main = function() {
  cache();
  setup();
  bind();
  show();
};

var playColor = function(color) {
  var currentTime = audioContext.currentTime;

  gain.gain.cancelScheduledValues(currentTime);
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

var playToken = function(token, index) {
  var currentTime = audioContext.currentTime;
  var offset = index * 0.025;
  var oscillator = audioContext.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = (token * beepMultiplier) + beepBase;
  oscillator.connect(gain);
  oscillator.start(currentTime + offset);
  oscillator.stop(currentTime + offset + beepLength);
};

var setup = function() {
  gain.connect(audioContext.destination);
};

var show = function() {
  new Sequenza({
    callback: showStep1,
    delay: 800
  }, {
    callback: showStep2,
    delay: 200
  }).start();
};

var showStep1 = function() {
  switchStep(0, 1);
};

var showStep2 = function() {
  switchStep(1, 2);
};

var start = function() {
  console.log('start');
};

var switchStep = function(from, to) {
  $panel.classList.remove('panel--step-' + from);
  $panel.classList.add('panel--step-' + to);
};

module.exports = main;
