<?php
/**
 * print_r : Simple filter that runs PHP's `print_r()` function
 * on a Twig value. This is already present in Timber for Wordpress
 * Unlike the default behavior of `print_r()`, this automatically wraps the output
 * in `<pre></pre>` for easy debugging in browser.
 *
 * {{ foo|print_r }}
 * {{ foo|print_r(false) }} (to turn off `<pre>` wrapper)
 *
 * @param mixed $expression 	Most useful for arrays and objects, but can also accept strings, integers, or floats
 * @param mixed $pre 	Whether or not to include a `<pre>` wrapper. Default: true
 *
 * @return string	String output of $expression passed through `print_r` function, wrapped in `<pre></pre>` tag.
 *                  If given a string, integer or float, the value itself will be printed.
 *                  If given an array, values will be presented in a format that shows keys and elements.
 *                  Similar notation is used for objects.
 */

	$filter= new Twig_SimpleFilter('print_r',function($arr, $pre = true ) {
        if ( $pre ) {
            return '<pre>' . print_r($arr, true) . '</pre>';
        }
		return print_r($arr, true);
	}, array( 'pre_escape' => 'html', 'is_safe' => array('html') ) );
?>
