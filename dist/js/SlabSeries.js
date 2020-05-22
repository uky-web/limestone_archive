'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlabSeries = function () {
    function SlabSeries(el) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, SlabSeries);

        this.rootEl = el;
        this.bind(this.rootEl);
        this.resizing;
    }

    _createClass(SlabSeries, [{
        key: 'bind',
        value: function bind(el) {
            var component = this;

            //set state
            component.rootEl.firstElementChild.dataset.slabseriesActive = true;
            //bind to each 'next' link
            var nextLinks = component.rootEl.querySelectorAll('.slab-series__next a');
            Array.from(nextLinks).forEach(function (linkEl) {
                linkEl.addEventListener('click', function (event) {
                    component.advance();
                    event.preventDefault();
                });
                return event;
            });

            window.addEventListener('resize', function () {
                if (component.resizing) {
                    clearTimeout(component.resizing);
                };
                component.resizing = setTimeout(component.fixScroll(), 100);
            });
        }
    }, {
        key: 'advance',
        value: function advance() {
            var component = this;
            var currentSlab = component.rootEl.querySelector('[data-slabseries-active="true"]'),
                nextSlab;

            if (currentSlab.nextElementSibling) {
                nextSlab = currentSlab.nextElementSibling;
            } else {
                nextSlab = component.rootEl.firstElementChild;
            }
            component.advanceTo(nextSlab);
        }
    }, {
        key: 'advanceTo',
        value: function advanceTo(el) {
            var component = this;

            var activeSlab = component.rootEl.querySelectorAll('[data-slabseries-active="true"]');
            Array.from(activeSlab).forEach(function (slab) {
                slab.dataset.slabseriesActive = false;
            });

            el.dataset.slabseriesActive = true;
            el.scrollIntoView(false);
        }
    }, {
        key: 'fixScroll',
        value: function fixScroll(event) {
            var component = this;
            return function () {
                component.rootEl.querySelector('[data-slabseries-active="true"]').scrollIntoView(false);
                return true;
            };
        }
    }]);

    return SlabSeries;
}();
//# sourceMappingURL=SlabSeries.js.map
