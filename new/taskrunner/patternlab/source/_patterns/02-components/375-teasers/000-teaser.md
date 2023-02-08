---
Title: Teaser
---

The Teaser has an image, headline group, optional meta region consisting of taxonomy and date information, and a block of text. Usually the text block will be provided by a WYSIWYG editor. Callouts usually have linked headers. Teasers should not be included in callouts; for those, see `Call to Action.`

News teasers have a date with day precision; events have a date with minute precision. Generic page teasers have neither date nor taxonomy meta; if blog teasers are created, date and taxonomy meta may be present.

Variables:

* _teaser_variant_ : Pass additional class names here. Create a matching `json` file to expose this variant.
* _content_date_ : Boolean; whether or not to display a date
* _content_date_format_ : String, see php date format docs at http://php.net/manual/en/function.date.php
* _content_taxonomy_ : Boolean, whether or not to include a taxonomy list.
