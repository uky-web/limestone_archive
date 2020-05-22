'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkExpandable = function () {
    function LinkExpandable(elements) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, LinkExpandable);

        this.linkElement = elements.linkElement;
        this.expandableElement = elements.expandableElement;
        this.backButton = elements.mobileBackButton;
        this.mobile = props.mobile;
        this.bind();
    }

    _createClass(LinkExpandable, [{
        key: 'expand',
        value: function expand() {
            if (this.linkElement.getAttribute('aria-expanded') !== 'true') {
                this.linkElement.setAttribute('aria-expanded', 'true');
                this.linkElement.focus();
                this.linkElement.dispatchEvent(new CustomEvent('expanded', { bubbles: true, detail: { menu: this } }));
            }
        }
    }, {
        key: 'minimize',
        value: function minimize() {
            if (this.linkElement.getAttribute('aria-expanded') !== 'false') {
                this.linkElement.setAttribute('aria-expanded', 'false');
                this.linkElement.dispatchEvent(new CustomEvent('minimized', { bubbles: true, detail: { menu: this } }));
            }
        }
    }, {
        key: 'bind',
        value: function bind() {
            var component = this;

            document.addEventListener('keydown', function (event) {
                var isEscape = false;

                if ("key" in event) {
                    isEscape = event.key === "Escape" || event.key === "Esc";
                }
                if (isEscape) {
                    component.minimize();
                    //if we were focused on a expandableElement child, move focus back up to the button
                    if (component.expandableElement.contains(document.activeElement)) {
                        component.linkElement.focus();
                    }
                }
            });

            if (this.mobile) {
                component.backButton.addEventListener('click', function (event) {
                    component.minimize();
                });
            }

            if (!this.mobile) {
                document.addEventListener('click', function (event) {
                    if (component.expandableElement.contains(event.target) || component.linkElement.contains(event.target)) {
                        //event.stopPropagation();
                    } else {
                        component.minimize();
                    }
                });
            }

            this.linkElement.addEventListener('keydown', function (event) {
                console.log('link keydown');
                if ("key" in event) {
                    switch (event.key) {
                        case 'Enter':
                            component.expand();
                            break;
                        case 'ArrowDown':
                            component.expand();
                            component.expandableElement.querySelector("a").focus();
                            break;
                        case 'Tab':
                            if (event.shiftKey) {
                                //We're tabbing back from this menu item, minimize
                                component.minimize();
                            }
                    }
                }
            });

            this.expandableElement.addEventListener('keydown', function (event) {
                if ("key" in event) {
                    switch (event.key) {
                        case 'ArrowUp':
                            component.focusLink(-1);
                            break;
                        case 'ArrowDown':
                            component.focusLink(1);
                            break;
                    }
                }
            });

            //mousedown
            this.linkElement.addEventListener('click', function (event) {
                var ariaExpanded = component.linkElement.getAttribute('aria-expanded');
                ariaExpanded === "true" ? component.minimize() : component.expand();
                //event.stopPropagation();
            });

            this.expandableElement.addEventListener('focusout', function (event) {
                setTimeout(function () {
                    if (component.linkElement !== document.activeElement && !component.expandableElement.contains(document.activeElement)) {
                        component.minimize();
                    }
                }, 1);
            });
        }

        //todo: This won't accommodate non-anchor targets, like buttons or a form.

    }, {
        key: 'focusLink',
        value: function focusLink(offset) {
            var component = this;
            var links = this.expandableElement.querySelectorAll('a');
            Array.from(links).some(function (link, i) {
                if (link === document.activeElement) {
                    if (links[i + offset]) {
                        links[i + offset].focus();
                        return true;
                    } else {
                        component.linkElement.focus();
                    }
                }
            });
        }
    }]);

    return LinkExpandable;
}();
//# sourceMappingURL=LinkExpandable.js.map
