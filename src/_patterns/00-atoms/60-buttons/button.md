---
Title: Button
---
`Button` refers to visual elements that appear to be button-like, not just standard buttons. Button styles are provided for links (`<a>`) styled as buttons, actual `<button>` elements, and form `input` types: `button`, `submit`, `reset`.

`link` and `button` button styles can have more complex markup in the content slot; you can specify that by using `content_button_link` and `content_button_button` blocks respectively.

Variables:

* `url` : The url for the link if `button_style` is a link. Default: `www.example.com`
* `style_modifier` : Pass additional class names here. Create a matching json file to expose these variants.
* `label` : The button text. Default: `fake('bs')`
* `button_style` : One of (link|button|input|submit|reset). Describes what kind of HTML element to use to express the button. Default: `link`

Blocks:

* `content_button_link` : Override this if you are using the `link` button style and have complex markup.
* `content_button_button` : Override this if you are using the `button` button style and have complex markup.
