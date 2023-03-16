<?php

$filter = new Twig_SimpleFilter('uniqid', function ($string) {
  return uniqid($string);
});
