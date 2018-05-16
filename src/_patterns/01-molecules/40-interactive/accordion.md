---
Title: Accordion
---

This accordion uses `jquery-accessible-accordion-aria` from https://a11y.nicolas-hoffmann.net/accordion/ with keyboard navigation and aria tags closly following WC3 recommendations and progressive markup. We've kept all of the options at their defaults, including *not* opening a panel on first load (that tends to obscure the fact that there's an accordion at all) and also allowing multiple panes to be open at once. 

Content in accordion panels should be kept pretty limited in general; with that assumption we've added a transition effect that works nicely but has a `max-height` of 100em for the content. You can increase the size of this, but increasing the size will also increase the apparent speed of the transition (because it transitions the entire value of `max-height` instead of actual height).