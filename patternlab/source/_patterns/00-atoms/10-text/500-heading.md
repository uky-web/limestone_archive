---
Title: Heading, base pattern
---
Include this atom to make a semantic heading tag.

Variables:
   
* _level_ : Pass 1-6 to make H1s to H6s. Default is 1.
* _style_modifier_ : Pass additional class names here. Please create a matching `heading~style_modifier.json` file to expose these variants.
* _linked_ : `true` if the headline should be linked. Contents will be wrapped in an anchor tag. Default : `false`
* _headline_ : Text to use as the headline. Default: `fake('bs')`.
