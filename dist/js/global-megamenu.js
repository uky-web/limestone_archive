'use strict';

var globalMegamenu = function globalMegamenu() {
    domReady(function () {
        var targetEl = document.querySelectorAll('.global-megamenu');
        Array.from(targetEl).forEach(function (El) {
            var isMobile = El.classList.contains('global-megamenu--mobile');
            var megamenu = new MegaMenu(El, { mobile: isMobile, buttonSelector: '.global-megamenu__menu-button', mobileBackSelector: '.link--fancy-reverse' });
        });
    });
};
//# sourceMappingURL=global-megamenu.js.map
