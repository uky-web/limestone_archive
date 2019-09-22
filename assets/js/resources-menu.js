
const resourcesMenu = () => {
    domReady(() => {
        var menuButton = document.querySelector('.link-expandable__button');
        var menuContainer = document.querySelector('.link-expandable__container');
        if (menuButton && menuContainer) {
            let menuObj = new LinkExpandable({linkElement:menuButton, expandableElement: menuContainer});
        }
    });
};
