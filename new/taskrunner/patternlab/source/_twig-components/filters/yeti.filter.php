<?php
/**
 * parse markup (or a plain URL) to replace the src with a cached version
 * 
 * Usage:
 *  {{ '<img src="https://magicyeti.us/100/100" alt="a sample thumbnail">'|yeti }}
 *  {{ 'https://magicyeti.us/100/100'|yeti }}
 */
$filter = new Twig_SimpleFilter('yeti', function($img) {
    if (class_exists('\Newcity\Yeti')) {
        if (strpos($img, 'http') === 0) {
            return \Newcity\Yeti::src($img);
        }
        return \Newcity\Yeti::replace_img($img);
    }
    return $img;
}, ['is_safe' => array('html')]);