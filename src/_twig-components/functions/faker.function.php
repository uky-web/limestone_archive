<?php
/**
 * gen() : Generate different kinds of placeholder data.
 *
 * This passes most things to fzaninotto/Faker
 * https://github.com/fzaninotto/Faker
 *
 * All fake requests accept these options:
 * - (int) num => (1) How many of the thing to generate
 *
 * Other fake requests can accept other configuration parameters, see docs
 * for details.
 *
 *
 * @param string $what 	What we're generating
 * @param array(varies) $options	Configure the output. Hash names match function
 * signatures for faker routines with some exceptions. See the default options
 * hash below.

 *
 * @return string|array	The assembled placeholder text as string or array of strings
 * depending on what the providers provide
 */

	$function = new Twig_SimpleFunction('fake',function($what = null, $options = array()) {

		$faker = Faker\Factory::create();

		// add any custom providers here
		//require_once('FakerExtensions/Provider/JSON.php');
		//$faker->addProvider(new Faker\Provider\JSON($faker));
		require_once('FakerExtensions/Provider/FontAwesome.php');
		$faker->addProvider(new Faker\Provider\FontAwesome($faker));
		// end custom providers

		if(empty($what)) {
			return "If you want to fake something, you need to tell me \$what.";
		}
		if (!is_callable(array($faker,$what))) {
			return "Unknown fake content generator $what. See https://github.com/fzaninotto/Faker.";
		}

		if (is_array($options)) {
			$default_options = array(
				'nb' => 3,
				'nbWords' => 6,
				'nbSentences'=> 3,
				'maxNbChars' => 200,
				'variableNbWords' => true,
				'variableNbSentences' => true,
				'asText' => false, // I hate this default but I am keeping it to match faker docs. JHW
				'gender' => null,
				'latMin' => -90,
				'latMax' => 90,
				'lonMin' => -180,
				'lonMax' => 180,
				'dateMax' => 'now',
				'dateFormat' => 'Y-m-d',
				'timeFormat' => 'H:i:s',
				'timeZone' => null, // null will use the system setting or UTC if there is no system setting
				'startDate' => '-30 years',
				'endDate' => 'now',
				'interval' => '+5 days',
				'countryCode' => 'US',    // 2-letter ISO country code? https://countrycode.org/
				'width' => 640,
				'height' => 480,
				'imgTag' => '*',
				'imgProvider' => 'https://magicyeti.us',
				'imgFilter' => '',
				'indexSize' => 2,
				'chanceOfGettingTrue' => 50,
				'biasMin' => 10,
				'biasMax' => 20,
				'biasFunc' => 'sqrt',
				'unique' => false
			);
			$o = array_merge($default_options,$options);

					// make sure there's a timezone set
			if (is_null($o['timeZone'])) {
				// but if not specified don't override the system setting
				if (!ini_get('date.timezone')) {
					date_default_timezone_set('UTC');
				}
			}
			else {
				// otherwise set to the specified timezone
				date_default_timezone_set($o['timeZone']);
			}

			if($o['unique'] === true) {
				$faker = $faker->unique();
			}
		} else {
			$o = $options;
		}


		// Most faker routines accept no parameters so they can
		// fall through to the default. For the ones that do,
		// we need some special handling.
		switch($what) {
			// Lorem text
			case 'words':
			case 'sentences':
			case 'paragraphs':
				$returnable = $faker->$what(5,false);
				$returnable = $faker->$what($o['nb'],$o['asText']);
			break;
			case 'lexify':
			case 'numerify':
			case 'bothify':
				// These three typically take a string as an argument instead of an array of options. 
				if(is_string($o)) {
					$returnable = $faker->$what($o);
				} elseif (is_array($o) && !empty($o['string'])) { 
					// But we'll take an array with an option of 'string if that's on offer.
					$returnable = $faker->$what($o['string']);
				} else {
					// I'm not going to advertise that in the error message, tho.
					$returnable = "Pass a string instead of an array hash to `$what`";
				}
			break;
			case 'sentence':
				$returnable = $faker->sentence($o['nbWords'],$o['variableNbWords']);
			break;
			case 'paragraph':
				$returnable = $faker->paragraph($o['nbSentences'],$o['variableNbSentences']);
			break;
			case 'text':
				$returnable = $faker->text($o['maxNbChars']);
			break;
			// Person
			case 'title':
			case 'name':
			case 'firstName':
				$returnable = $faker->$what($o['gender']);
			break;
			// Address
			case 'latitude':
				$returnable = $faker->latitude($o['latMin'],$o['latMax']);
			break;
			case 'longitude':
				$returnable = $faker->longitude($o['lonMin'],$o['lonMax']);
			break;
			// Text
			case 'realText':
				$returnable = $faker->realText($o['maxNbChars'],$o['indexSize']);
			break;
			case 'unixTime':
			case 'dateTime':
			case 'dateTimeAD':
			case 'dateTimeThisCentury':
			case 'dateTimeThisDecade':
			case 'dateTimeThisYear':
			case 'dateTimeThisMonth':
			case 'amPm':
			case 'dayOfMonth':
			case 'dayOfWeek':
			case 'month':
			case 'monthName':
			case 'year':
				$returnable = $faker->$what($o['dateMax']);
			break;
			case 'date':
				$returnable = $faker->date($o['dateFormat'],$o['dateMax']);
			break;
			case 'time':
				$returnable = $faker->time($o['timeFormat'],$o['dateMax']);
			break;
			case 'dateTimeBetween':
				$returnable = $faker->dateTimeBetween($o['startDate'],$o['endDate']);
			break;
			case 'dateTimeInInterval':
				$returnable = $faker->dateTimeInInterval($o['startDate'],$o['interval']);
			break;
			// Payment
			case 'iban':
				$returnable = $faker->iban($o['countryCode']);
			break;
			// Miscellaneous
			case 'boolean':
				$returnable = $faker->boolean($o['chanceOfGettingTrue']);
			break;
			// Biased
			case 'biasedNumberBetween':
				$returnable = $faker->biasedNumberBetween($o['biasMin'],$o['biasMax'],$o['biasFunc']);
			break;
			case 'json':
				$returnable = $faker->json($o['custom']);
			break;

			// Unsupported features
			case 'imageUrl':
				if (!empty($o['aspectRatio'])) {
					$aspect_components = explode(':',$o['aspectRatio']);
					try {
						$height_as_fraction_of_width = $aspect_components[1] / $aspect_components[0];
						$w = $o['width'];
						$h = floor($w * $height_as_fraction_of_width);
					} catch (Exception $e) {
						$w = $o['width'];
						$h = $o['height'];
					}
				} else {
					$w = $o['width'];
					$h = $o['height'];
				}
				// Stomp Faker's generation of image urls in favor of our own
				$returnable = "{$o['imgProvider']}/{$w}/{$h}/{$o['imgTag']}/{$o['imgFilter']}";
			break;
			case 'file':
			case 'image':
				$returnable = "Fake: $what is not currently supported.";
			break;
			default:
				$returnable = $faker->$what();
		}

		return $returnable;
	});
?>
