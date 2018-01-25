<?php
/**
 * svg() : Generate different kinds of placeholder data.
 *
 * place an svg tag
 *
 * @param string $filename 	svg filename, no extension needed

 *
 * @return string markup
 */

	$function = new Twig_SimpleFunction('svgspritesheet', function($filename = null, $opts = array()) {
    if (is_null($filename)) {
        $filename = 'icons.svg';
    }
    $function_dir = dirname(__FILE__);
    $svg_dir = realpath($function_dir . '/../../sprites/');
    if ($svg_dir === FALSE) {
      return "SVG directory not found.";
    }
    if (strpos($filename, '.svg')===FALSE) {
      $filename .= '.svg';
    }
    $fn = $svg_dir . '/' . $filename;
    if (!file_exists($fn)) {
      return "SVG file not found.";
    }

    $xml = simplexml_load_file($fn);
    if ($xml === FALSE) {
      return "Unable to read SVG";
    }

    $dom = dom_import_simplexml($xml);
    if (!$dom) {
      return "Unable to convert XML to DOM";
    }

    // manipulate the output
    foreach ($opts as $k => $v) {
      $dom->setAttribute($k, $v);
    }

    // spit out the svg tag
    $output = new DOMDocument();
    $cloned = $dom->cloneNode(TRUE);
    $output->appendChild($output->importNode($cloned, TRUE));

    $spritesheet = $output->saveHTML();            
    
    return $spritesheet;

  }, array('is_safe' => array('html')));
