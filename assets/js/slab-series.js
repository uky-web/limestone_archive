
const slabseriesEls = () => {
    domReady(() => {
        var slabseriesEls = document.querySelectorAll('.slab-series');
        Array.from(slabseriesEls ).forEach(El => {
            var slabseries = new SlabSeries(El);
        });
    });
};

