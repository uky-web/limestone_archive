---
Title: Modal
---

Modals are elements that overlay web content and prevent scrolling until dismissed. We are using the accessible modal javascript library at https://a11y.nicolas-hoffmann.net/modal/. Most modal parameters are managed through data attributes on the trigger, which should generally be a button. At a minimum you should provide the ID of the modal that will be opened; for other configuration options see the documentation on the library.

In Patternlab, define the content of a modal in an `embed` by overriding the `modal_content` block.