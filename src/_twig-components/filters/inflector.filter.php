<?php
/**
 * a bunch of inflector functions
 * uses https://github.com/koenpunt/php-inflector
 *
 * {{ foo|pluralize }}
 * {{ foo|humaize }}
 *
 * @param string $action  One of:
 *     singularize
 *     pluralize
 *     camelize
 *     underscoreize
 *     humanize
 *     titleize
 *     tableize
 *     dasherize
 *     ordinalize
 * @param string $str   Text the filter operates on.
 *
 * @return string $str if an inflector is matched, the inflected output; otherwise the input $str
 */

  $filter= new Twig_SimpleFilter('*ize', function($action, $data) {
    $action .= "ize";
    if (in_array(
        $action,
        ['titleize', 'camelize', 'underscorize', 'humanize', 'ordinalize', 'tableize', 'dasherize', 'singularize', 'pluralize']
    )) {
        if ($action == 'underscorize') $action = 'underscore';

        return PhpInflector\Inflector::$action($data);
    } else {
        return $data;
    }
  });
?>
