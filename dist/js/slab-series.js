'use strict';

var slabseriesEls = function slabseriesEls() {
    domReady(function () {
        var slabseriesEls = document.querySelectorAll('.slab-series');
        Array.from(slabseriesEls).forEach(function (El) {
            var slabseries = new SlabSeries(El);
        });
    });
};
//# sourceMappingURL=slab-series.js.map
