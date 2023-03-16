<?php
/**
 * insert a cached image from magicyeti
 * works for src attribute; takes a partial path, returns a data URL
 * 
 * Parameters:
 *  path: anything after the hostname to pass to magicyeti
 *  show_dims: overlay image dimensions in white text on the image
 * 
 * Usage: 
 *  <img src="{{ yeti('640/480') }}">
 *  <img src="{{ yeti('1200/300?v=1') }}">
 *  <img src="{{ yeti('400/400/dog/gray', FALSE) }}">
 * 
 */
$function = new Twig_SimpleFunction('yeti', function($path, $show_dims = TRUE) {
    $path = "https://magicyeti.us/" . $path;
    if (class_exists('\Newcity\Yeti')) {
        return \Newcity\Yeti::src($path, $show_dims);
    }
    return $path;
});