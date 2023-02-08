<?php
/**
 * random : Shuffle a list -- good for randomized for loops through %includes
 *
 * {% for mb in mediaBlock|random %}
 *   {% include molecules-media-block with {"mediaBlock": mb} %}
 * {% endforeach %}
 *
 * @param string $arr   List
 *
 * @return shuffled $arr
 */

  $filter= new Twig_SimpleFilter('random',function($arr) {
    shuffle($arr);
    return $arr;
  });
?>
