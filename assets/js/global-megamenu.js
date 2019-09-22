
const globalMegamenu = () => {
    domReady(() => {
        var targetEl = document.querySelectorAll('.global-megamenu');
        Array.from(targetEl).forEach(El => {
            var isMobile = El.classList.contains('global-megamenu--mobile');
            var megamenu = new MegaMenu(El, {mobile: isMobile, buttonSelector:'.global-megamenu__menu-button', mobileBackSelector: '.link--fancy-reverse'});
        });
    });
};

