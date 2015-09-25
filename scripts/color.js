var Sequenza = require('Sequenza');

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var beepBase = 200;
var beepLength = 0.3;
var beepMultiplier = 1000;
var beepVolume = 0.2;
var gain = audioContext.createGain();

var Color = function($color) {
  gain.connect(audioContext.destination);

  this.$color = $color;

  this.playSequenza = new Sequenza({
    callback: this.activate.bind(this),
    delay: 0
  }, {
    callback: this.deactivate.bind(this),
    delay: 100
  });

  this.token = this.$color.dataset.token.split(',');
  this.enable();
};

Color.prototype = {
  activate: function() {
    this.$color.classList.add('panel__color--active');
    return this;
  },

  deactivate: function() {
    this.$color.classList.remove('panel__color--active');
    return this;
  },

  disable: function() {
    this.$color.disabled = true;
    this.$color.removeEventListener('click', this.play.bind(this));
    return this;
  },

  enable: function() {
    this.$color.addEventListener('click', this.play.bind(this));
    this.$color.disabled = false;
    return this;
  },

  play: function() {
    var currentTime = audioContext.currentTime;

    gain.gain.cancelScheduledValues(currentTime);
    gain.gain.setValueAtTime(beepVolume, currentTime);
    gain.gain.linearRampToValueAtTime(0, currentTime + beepLength);

    this.token.forEach(playToken);
    this.playSequenza.start();

    return this;
  }
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

module.exports = Color;
