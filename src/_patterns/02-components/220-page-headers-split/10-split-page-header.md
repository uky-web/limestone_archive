---
Title: Split Headers
---

These headers have an image on the right and a text block on the left that contains the H1 for the page and up to two CTAs. There are four color styles controlled on the slab class: slab--light-gray, slab--dark-blue, slab--wildcat-blue. The default is the same as slab--subtle-gray. The background color of the headline region changes at the large breakpoint.

*Content Fitting Concern* : If the title is too long, the hero image will not provide enough vertical space and the title block might be clipped or overflow the border.

*Apparent race condition* : I seem to be seeing a problem where Firefox (at least) does not reflow the layout of the container if images are uncached and slow to load. The headline region is thus out-of-place. We may need to arrange for a different solution.