!function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var n=i(3),a=i(4),s=function(){n(),a()};"loading"==document.readyState?document.addEventListener("DOMContentLoaded",s):s()},function(t,e,i){var n,a=function(){"use strict";var t=function(){var i=Date.now(),n=this.schedule.steps[0],a=void 0!=n;return a?(e&&requestAnimationFrame(t.bind(this)),void(i<n.timestamp||(n.callback(),this.schedule.steps.shift()))):(this.schedule.iterations--,e||clearInterval(this.intervalId),void(this.schedule.iterations>0&&this.start({iterations:this.schedule.iterations})))},e="undefined"!=typeof requestAnimationFrame,i=function(){},n=function(t,e){var i,n=0==e;return i=n?this.schedule.start+t.delay:this.lastTimestamp+t.delay,this.lastTimestamp=i,{callback:t.callback,timestamp:i}},a=function(t){var e=Object.prototype.toString.call(t),i=e.replace(/^\[object ([^\]]+)\]$/,"$1");return i};this.intervalId=void 0,this.lastTimestamp=void 0,this.steps=[],this.schedule={iterations:void 0,start:void 0,steps:void 0},this.queue=function(t){var e="Object"==a(t);if(!e)throw new Error("invalid step given to be queued by Sequenza");var n="callback"in t&&"Function"==a(t.callback);n||(t.callback=i);var s="delay"in t&&"Number"==a(t.delay)&&isFinite(t.delay);return s||(t.delay=0),this.steps.push(t),this},this.start=function(i){var s=0!=this.steps.length;if(s){var r="Object"==a(i);r||(i={});var o="Number"==a(i.iterations)&&!isNaN(i.iterations);return o||(i.iterations=1),this.schedule.iterations=Math.max(1,i.iterations),this.schedule.start=Date.now(),this.schedule.steps=this.steps.map(n.bind(this)),e?(requestAnimationFrame(t.bind(this)),this):(this.intervalId=setInterval(t.bind(this),16),this)}};var s,r=1==arguments.length&&"Array"==a(arguments[0]);s=r?arguments[0]:[].slice.call(arguments),s.forEach(this.queue.bind(this))};n=function(){return a}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e){var i=function(t){return document.querySelector(t)},n=function(t){return[].slice.call(document.querySelectorAll(t))};t.exports={$:i,$$:n}},function(t,e,i){var n,a=i(2),s=i(1),r=a.$,o=(a.$$,function(){n=r(".header")}),c=function(){o(),l()},l=function(){new s({callback:u,delay:200},{callback:d,delay:200},{delay:200},{callback:h,delay:200}).start()},u=function(){f(0,1)},d=function(){f(1,2)},h=function(){f(2,3)},f=function(t,e){n.classList.remove("header--step-"+t),n.classList.add("header--step-"+e)};t.exports=c},function(t,e,i){var n,a=i(2),s=i(1),r=a.$$,o=new(window.AudioContext||window.webkitAudioContext),c=250,l=.3,u=1e3,d=.2,h=o.createGain(),f=function(t){t.classList.add("panel__color--active")},v=function(){n.forEach(p)},p=function(t){t.addEventListener("click",w.bind(window,t))},m=function(){n=r(".panel__color")},b=function(t){t.classList.remove("panel__color--active")},y=function(){m(),x(),v()},w=function(t){var e=o.currentTime;h.gain.setValueAtTime(d,e),h.gain.linearRampToValueAtTime(0,e+l),t.dataset.token.split(",").forEach(k),new s({callback:f.bind(window,t),delay:0},{callback:b.bind(window,t),delay:100}).start()},k=function(t){var e=o.currentTime,i=o.createOscillator();i.type="sine",i.frequency.value=t*u+c,i.connect(h),i.start(e),i.stop(e+l)},x=function(){h.connect(o.destination)};t.exports=y}]);