---
Title: Image Gallery
---

The image gallery takes a series of images with captions and arranges them in a masonry grid. Captions are not exposed until the image is clicked and a larger version of the image displays in a modal. The modal contains a slideshow of all the other images in this collection. 

Images that load in the gallery should be small; the modal can load a much larger image. The link that contains the entire figure should have an href that points to the original image; this will be used as a fallback if JS is not present and also let the modal know where to get the image.

This component has dependencies on magnific-popup, masonry, and imagesloaded JS libraries; the code that initializes the image gallery is in `image-gallery.js`.