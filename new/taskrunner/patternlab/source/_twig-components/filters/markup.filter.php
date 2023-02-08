<?php

$filter = new Twig_SimpleFilter('markup', function($value) {
    return $value;
}, ['is_safe' => array('html')]);