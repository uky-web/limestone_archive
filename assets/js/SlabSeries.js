class SlabSeries {

    constructor(el, props = {}) {
        this.rootEl = el;
        this.bind(this.rootEl);
        this.resizing;
    }

    bind(el) {
        const component = this;

        //set state
        component.rootEl.firstElementChild.dataset.slabseriesActive = true;
        //bind to each 'next' link
        var nextLinks = component.rootEl.querySelectorAll('.slab-series__next a');
        Array.from(nextLinks).forEach(linkEl => {
            linkEl.addEventListener('click', function(event){
                component.advance();
                event.preventDefault();
            });
            return event;
          });

        window.addEventListener('resize', function(){
            if (component.resizing){clearTimeout(component.resizing)};
            component.resizing = setTimeout(component.fixScroll(),100);
        });

    }

    advance(){
        const component = this;
        var currentSlab = component.rootEl.querySelector('[data-slabseries-active="true"]'),
        nextSlab;
    
        if (currentSlab.nextElementSibling){
            nextSlab = currentSlab.nextElementSibling;
        } else {
            nextSlab = component.rootEl.firstElementChild;
        }
        component.advanceTo(nextSlab);
    }

    advanceTo(el){
        const component = this;

        var activeSlab = component.rootEl.querySelectorAll('[data-slabseries-active="true"]');
        Array.from(activeSlab ).forEach(slab => {
            slab.dataset.slabseriesActive = false;
        });

        el.dataset.slabseriesActive = true;
        el.scrollIntoView(false);
    }

    fixScroll(event){
        const component = this;
        return function(){
            component.rootEl.querySelector('[data-slabseries-active="true"]').scrollIntoView(false);
            return true;
        }
    }
}