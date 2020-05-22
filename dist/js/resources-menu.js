'use strict';

var resourcesMenu = function resourcesMenu() {
    domReady(function () {
        var menuButton = document.querySelector('.link-expandable__button');
        var menuContainer = document.querySelector('.link-expandable__container');
        if (menuButton && menuContainer) {
            var menuObj = new LinkExpandable({ linkElement: menuButton, expandableElement: menuContainer });
        }
    });
};
//# sourceMappingURL=resources-menu.js.map
