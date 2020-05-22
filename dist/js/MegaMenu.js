"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domReady = function domReady(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var MegaMenu = function () {
    function MegaMenu(rootElement, props) {
        var _this = this;

        _classCallCheck(this, MegaMenu);

        this.root = rootElement;
        this.mobile = props.mobile;
        this.menus = [];
        Array.from(this.root.querySelectorAll(props.buttonSelector)).forEach(function (link) {
            var menuButton = link;
            var menuContainer = link.nextElementSibling;
            var mobileBack = menuContainer.querySelector(props.mobileBackSelector);
            var menuObj = new LinkExpandable({ linkElement: menuButton, expandableElement: menuContainer, mobileBackButton: mobileBack }, { mobile: props.mobile });
            _this.menus.push(menuObj);
        });
        this.bind();
    }

    _createClass(MegaMenu, [{
        key: "bind",
        value: function bind() {
            //UIEvents
            var component = this;

            //CustomEvents
            //Bubbled from ExpandableMenu
            this.root.addEventListener('expanded', function (event) {
                var expandedMenu = event.detail.menu;
                component.menus.forEach(function (menu) {
                    if (menu !== expandedMenu) menu.minimize();
                });
                component.root.classList.add("open");
            });

            this.root.addEventListener('minimized', function (event) {
                component.root.classList.remove("open");
            });
        }
    }, {
        key: "expandMenu",
        value: function expandMenu(offset) {
            var activeMenu = void 0;
            var component = this;
            this.menus.some(function (menu, i) {
                if (menu.buttonElement.getAttribute('aria-expanded') === 'true') {
                    activeMenu = menu;
                    if (component.menus[i + offset]) {
                        component.menus[i + offset].expand();
                        return true;
                    }
                }
            });
        }
    }]);

    return MegaMenu;
}();
//# sourceMappingURL=MegaMenu.js.map
