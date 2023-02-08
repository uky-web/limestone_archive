<?php
 /*
  loads custom provider functions out of a JSON key -> array() map
  such that a value from the array is randomly selected

  allows, for instance, in Twig:

    {{ fake('json', {'custom' : 'academicTitle'}) }}

  where academicTitle is a key in the JSON providing an array

 */

namespace Faker\Provider;

class JSON extends \Faker\Provider\Base
{
  private $map = array();

  function __construct() {
    // we're going to make a bunch of functions based on what's in a JSON file (in src/data)
    try {
      $contents = file_get_contents(dirname(__FILE__).'/../../../../data/faker.json');
      $this->map = json_decode($contents);
    }
    catch (Exception $e) {
      print "Couldn't load Faker JSON file.";
    }
  }

  function json($json_function = null) {
    if (array_key_exists($json_function, $this->map)) {
      return static::randomElement($this->map->$json_function);
    }
    return static::randomElement(static::$wordList);
  }
}