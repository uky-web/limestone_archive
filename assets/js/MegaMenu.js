let domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};


class MegaMenu {

    constructor(rootElement, props) {
        this.root = rootElement;
        this.mobile = props.mobile;
        this.menus = [];
        Array.from(this.root.querySelectorAll(props.buttonSelector)).forEach(link => {
            let menuButton = link;
            let menuContainer = link.nextElementSibling;
            let mobileBack = menuContainer.querySelector(props.mobileBackSelector);
            let menuObj = new LinkExpandable({linkElement:menuButton, expandableElement: menuContainer, mobileBackButton:mobileBack}, {mobile:props.mobile});
            this.menus.push(menuObj);
        });
        this.bind();
    }

    bind() {
        //UIEvents
        const component = this;

        //CustomEvents
        //Bubbled from ExpandableMenu
        this.root.addEventListener('expanded', function (event) {
            let expandedMenu = event.detail.menu;
            component.menus.forEach(function (menu) {
                if (menu !== expandedMenu) menu.minimize();
            });
            component.root.classList.add("open");
        });

        this.root.addEventListener('minimized', function (event) {
            component.root.classList.remove("open");
        });

    }

    expandMenu(offset) {
        let activeMenu;
        const component = this;
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
}

