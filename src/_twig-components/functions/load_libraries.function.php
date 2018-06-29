<?php

// the other half of attach_library
// runs the post-processing to actually add the asset for a page

$function = new Twig_SimpleFunction(
    'load_libraries',
    function () {
      return <<< EOF
<script>
      var head = document.head || document.getElementsByTagName('head')[0];
      var body = document.body;

      // gather asset elements
      function addSources(el) {
        var sources = [];
        for (var i = 0; i < el.length; i++) {
          sources.push({
            src: el[i].getAttribute("data-src"),
            weight: el[i].getAttribute("weight")
          });
        }
        return sources;
      }

      // remove duplicates, sort by weight (heavier weights added to page first)
      function filterSources(sources) {
        var i, e, weight_sources, weight_assets;
        var assets = [];

        if (sources.length == 0) {
          return assets;
        }

        var weights = sources.map(function(e) {
          return parseFloat(e.weight);
        });
        var maxweight = Math.max.apply(null, weights);
        
        for (i = maxweight; i >= 0; i--) {
          // grab this weight
          weight_sources = sources.filter(function(e) {
            return (e.weight == i);
          });
          // get src
          weight_assets = weight_sources.map(function(e) {
            return e.src;
          });
          // remove duplicates
          weight_assets = weight_assets.filter(function(e, i, self) {
            return self.indexOf(e) === i;
          });
          // remove (lower weight) duplicates
          weight_assets = weight_assets.filter(function(e) {
            return !(assets.indexOf(e) > -1);
          });
          assets = assets.concat(weight_assets);
        }
        return assets;
      }

      // add assets to page
      function addToPage(sources, type, use_header) {
        var i, el, src;
        for (i = 0; i < sources.length; i++) {
          el = document.createElement(type);
          src = sources[i];
          if (type == "link") {
            el.type = "text/css";
            el.rel = "stylesheet";
            el.href = src;
            head.appendChild(el);
          }
          if (type == "script") {
            el.src = src;
            if (use_header) {
              head.appendChild(el);
            }
            else {
              el.defer = "defer";
              body.appendChild(el);
            }
          }
        }
      }

      var sources;
      var css = body.getElementsByTagName("component-asset-css");
      sources = filterSources(addSources(css));
      addToPage(sources, 'link', true);

      var js = document.body.getElementsByTagName("component-asset-js-head");
      sources = filterSources(addSources(js));
      addToPage(sources, 'script', true);

      js = document.body.getElementsByTagName("component-asset-js");
      sources = filterSources(addSources(js));
      addToPage(sources, 'script', false);
</script>
EOF;
    },
    ['is_safe' => ['html']]
);