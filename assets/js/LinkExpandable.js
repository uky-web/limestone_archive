class LinkExpandable {
    constructor(elements, props = {}) {
        this.linkElement = elements.linkElement;
        this.expandableElement = elements.expandableElement;
        this.backButton = elements.mobileBackButton;
        this.mobile = props.mobile;
        this.bind();
    }

    expand() {
        if (this.linkElement.getAttribute('aria-expanded') !== 'true') {
            this.linkElement.setAttribute('aria-expanded', 'true');
            this.linkElement.focus();
            this.linkElement.dispatchEvent(new CustomEvent('expanded', {bubbles: true, detail: {menu: this}}));
        }
    }

    minimize() {
        if (this.linkElement.getAttribute('aria-expanded') !== 'false') {
            this.linkElement.setAttribute('aria-expanded', 'false');
            this.linkElement.dispatchEvent(new CustomEvent('minimized', {bubbles: true, detail: {menu: this}}));
        }
    }

    bind() {
        const component = this;

        document.addEventListener('keydown', function (event) {
            let isEscape = false;

            if ("key" in event) {
                isEscape = (event.key === "Escape" || event.key === "Esc");
            }
            if (isEscape) {
                component.minimize();
                //if we were focused on a expandableElement child, move focus back up to the button
                if (component.expandableElement.contains(document.activeElement)) {
                    component.linkElement.focus();
                }
            }
        });

        if (this.mobile){
            component.backButton.addEventListener('click', function(event){
                component.minimize();
            });
        }

        if(!this.mobile){
            document.addEventListener('click', function(event){
                if(component.expandableElement.contains(event.target) || component.linkElement.contains(event.target) ){
                    //event.stopPropagation();
                } else{
                    component.minimize();
                }

            });
        }

        this.linkElement.addEventListener('keydown', function (event) {
            console.log('link keydown')
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
                        if (event.shiftKey){
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
                        component.focusLink(-1)
                        break;
                    case 'ArrowDown':
                        component.focusLink(1)
                        break;
                }
            }
        });

        //mousedown
        this.linkElement.addEventListener('click', function (event) {
            let ariaExpanded = component.linkElement.getAttribute('aria-expanded');
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
    focusLink(offset) {
        const component = this;
        let links = this.expandableElement.querySelectorAll('a');
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
}