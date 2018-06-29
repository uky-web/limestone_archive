<?php

// adds asset depenencies as
//   <components-asset-[js|css] data-src="[asset relative url]" weight="[priority]/>
// requires frontend post-processing provided by {{ load_libraries() }} to actually add the assets

if (!function_exists('_attach_library_add_dependency')) {
  function _attach_library_add_dependency($config, $key, $depth = 1) {
    $output = [];
    if ($depth > 10) {
      // probably some sort of dependency loop
      printf('Dependency depth limit exceeded. Check your libraries.');
      return $output;
    }
    if (isset($config[$key])) {
      foreach (['js', 'css'] as $type) {
        $assetname = $type;
        if (isset($config[$key]['head']) && $config[$key]['head']) {
          $assetname = $type . '-head';
        }
        if (isset($config[$key][$type])) {
          foreach ($config[$key][$type] as $asset) {
            $output[] = '<component-asset-' . $assetname . ' data-src="' . $asset . '" weight="' . $depth . '"></component-asset-' . $type. '>';
          }
        }
      }
      if (isset($config[$key]['dependencies'])) {
        foreach ($config[$key]['dependencies'] as $dep) {
          $output = array_merge($output, _attach_library_add_dependency($config, $dep, $depth + 1));
        }
      }
    }
    return $output;
  }
}

$function = new Twig_SimpleFunction(
    'attach_library',
    function ($key) {
      $output = [];
      $config_file = __DIR__ . '/../../../config/libraries.yml';
      $library_config = FALSE;
      if (file_exists($config_file)) {
        if (class_exists('Symfony\Component\Yaml\Yaml')) {
          try {
            $library_config = \Symfony\Component\Yaml\Yaml::parseFile($config_file);
          }
          catch (\Symfony\Component\Yaml\Exception\ParseException $exception) {
            printf('Unable to parse libraries.yml: %s', $exception->getMessage());
          }
        }
      }
      else {
        printf('Unable to find libraries config file %s.', $config_file);
      }

      if ($library_config) {
        $output = _attach_library_add_dependency($library_config, $key);
      }

      // dedupe
      $output = array_unique($output);

      return implode("\n", $output);
    },
    ['is_safe' => ['html']]
);
