(function (W, D) {
  var jShit = {}
  jShit.$ = D.querySelector.bind(D)
  jShit.$$ = D.querySelectorAll.bind(D)
  jShit.dom = function (el) {
    return new DOM(el)
  }

  function DOM (el) {
    this.el = el
  }

  DOM.prototype = {
    constructor: DOM,
    each: function (fn) {
      Array.prototype.forEach.call(this.el, fn)
    },
    find: function (selector) {
      this.el = this.el.querySelectorAll(selector)
      return this
    }
  }

  if (typeof W !== 'undefined') {
    for (var shit in jShit) {
      if (!W[shit]) {
        W[shit] = jShit[shit]
      }
    }
  } else if (typeof module !== 'undefined') {
    module.exports = jShit
  }

})(window, document);
