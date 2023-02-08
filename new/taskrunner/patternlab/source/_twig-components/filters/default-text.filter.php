<?php
/**
 * dT() : Filter that checks the incoming string. If null,
 * it replaces the string with the passed default text
 *
 * {{ foo|dT("bar") }}
 * {{ foo|dT(loremWords(5)) }}
 *
 * @param string $str 	Text the filter operates on.
 * @param string $default	Replacement string
 *
 * @return string	$default if $str is empty, otherwise $str
 */

	$filter= new Twig_SimpleFilter('dT',function($str,$default) {
		if (empty($str)) return($default);
		return $str;
	});
?>
