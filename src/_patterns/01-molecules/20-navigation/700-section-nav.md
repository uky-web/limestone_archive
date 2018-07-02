---
Title: Section Nav
---

Section navigation is a menu structure. It mutates based on context and breakpoint. It can display a parent page, current page, sibling pages, and child pages.

If the current page has a section navigation and the display is desktop-sized:

* Section navigation appears *in the sidebar*

If the current page has section navigation and the display is mobile-sized:

* Section navigation appears *in the mobile navigation* and is *hidden from the sidebar*

If the current page's is not in the first rank of its menu structure

* Parent page ("Home") is hidden
* Current page is hidden
* Sibling pages are hidden
* Child pages show

If the current page is in the second rank or greater of its menu structure and *on desktop only*

* Parent page shows (as a back link)
* Current page shows (as plain text)
* Sibling pages show
* Child pages show

If the current page is in the second rank or greater of its menu structure and *in mobile view only*

* Parent page shows (as a back link)
* Current page shows (as plain text)
* Sibling pages are hidden
* Child pages show

