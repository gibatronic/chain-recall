var Color = require('./color');
var dollar = require('./dollar');
var Sequenza = require('Sequenza');

var $ = dollar.$;
var $$ = dollar.$$;
var $colors;
var $panel;
var $start;
var colors;
var position;
var sequence = [ ];
var watching = false;

var bind = function() {
  var bindColors = function($color) {
    $color.addEventListener('click', checkColor.bind(window, $color));
  };

  $colors.forEach(bindColors);
  $start.addEventListener('click', start);
};

var cache = function() {
  $colors = $$('.panel__color');
  $panel = $('.panel');
  $start = $('.panel__start');
};

var checkColor = function($color) {
  if (!watching) {
    return;
  }

  if (sequence[position].$color != $color) {
    return alert('nuh uh');
  }

  if (position == sequence.length - 1) {
    return new Sequenza({
      callback: pushAndPlay,
      delay: 400
    }).start();
  }

  position++;
};

var main = function() {
  cache();
  bind();
  setup();
  show();
};

var pushAndPlay = function() {
  var sequenza = new Sequenza();

  var playColor = function(color) {
    sequenza.queue({
      callback: color.play.bind(color),
      delay: 400
    });
  };

  sequenza.queue({
    delay: 200
  });

  sequence.push(colors[Math.random() * colors.length >> 0]);
  sequence.forEach(playColor);

  sequenza.queue({
    callback: startWatching,
    delay: 0
  });

  sequenza.start();
};

var setup = function() {
  var setupColors = function($color) {
    return new Color($color);
  };

  colors = $colors.map(setupColors);
};

var show = function() {
  new Sequenza({
    callback: switchStep.bind(window, 0, 1),
    delay: 800
  }, {
    callback: switchStep.bind(window, 1, 2),
    delay: 200
  }).start();
};

var start = function() {
  $start.classList.add('hidden');
  $start.disabled = true;

  pushAndPlay();
};

var startWatching = function() {
  position = 0;
  watching = true;
}

var stopWatching = function() {
  watching = false;
}

var switchStep = function(from, to) {
  $panel.classList.remove('panel--step-' + from);
  $panel.classList.add('panel--step-' + to);
};

module.exports = main;
