<?php

$function = new Twig_SimpleFunction(
    'attach_stylesheet',
    function ($css) {
      $css_base = '../../css/';
      if (strpos($css, '.css') === FALSE) {
        $css .= '.css';
      }
      return '<link rel="stylesheet" href="' . $css_base . $css . '" media="all">';
    },
    array('is_safe' => array('html'))
);
