<?php

$function = new Twig_SimpleFunction(
    'attach_script',
    function ($js) {
      $js_base = '../../js/';
      if (strpos($js, '.js') === FALSE) {
        $js .= '.js';
      }
      return '<script src="' . $js_base . $js . '" defer></script>';
    },
    array('is_safe' => array('html'))
);
