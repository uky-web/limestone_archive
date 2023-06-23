Dropping this into code instead of issues, since it seems like it could turn into docs.

## Using Patternlab components vs. library components

When building higher-level composed 'stories' for Patternlab (like a page), it's possible to include other patternlab 'stories' into slots (twig 'blocks'), instead of using the actual library components and providing them with appropriate input props. I'm recommending we *don't* do this for a couple of reasons;

* It adds an additional dependency on those smaller PL stories, which may be refactored. 
* It also breaks up the full set of input props that has gone into generating the higher-level stories. 

It will mean some redundant prop data generation, but I think that will be clearer when looking at the code.
So this means that we never use an include/embed of a patternlab 'story' twig file, they're always `@limestone` files.

## Replicating props pattern in Twig
I'd like to have all twig components closely manage the variables they use. We can do this by using a `with props only` clause on embeds and includes. The problem is that this relies on the caller instead of the component. We just need to find a way to make the props signature for each component clear, and avoid references to variables in the global twig space.

I'd really prefer to have the component need to explicit reference a `props` object, but to get that data structure, we'd need to double wrap props, e.g. `with {props:{prop1,prop2}}`.

## Nesting props
In the case of higher-level components, they will typically need to pass props through to constituent child components. I recommend that the props structure passed to the parent component is *flat* and doesn't make reference to specific child components. This will encapsulate the composition of the parent component. Then, within the parent component, the subsets of props to be passed to child components could be structured if needed.

### Twig `embed` issues
Within a twig `embed`, the variable context needs to be passed in; we don't necessarily get the props/variables from the file context. This is how I arrived at the pattern for structuring the child component props into nested objects, to make it simple to pass them through. See `universal-header.twig`.


## QUESTIONS & IDEAS ABOUT TWIG CODING PATTERNS

### Naming prop objects
Prop object variables should be named for the interior component they are being passed to. E.G. the `toggle_button` component `includes` the `icon-button` component, so all values to be passed to `icon-button` should be put into an `icon_button_props` variable, and passed e.g. 
>`include "@limestone/icon_button.twig" with icon_button_props only`.

### Naming individual props (not sure about this one - not fully implemented)
I think it could be helpful to name props based on the immediate receiving component being sent the prop, rather than the component that may ultimately consume the prop. This helps clarify and encapsulate the component prop signatures. This would mean a component's context would always only have variables with its name as a prefix. e.g. `toggle_button` would have `toggle_button_variant` passed to it (and therefore available in twig context), which it would then pass through to `icon_button` in an `icon_button_props` object thus: `"icon_button_variant":toggle_button_variant`.


### Merging `object` or `array` prop values
We can use twig's `merge` function to combine (and override) default prop values stored in objects or arrays. To do this, the keys within an object prop value (e.g. `html_attributes`) would need to stay the same as it gets passed down. This could actually be a good way to enforce some typing of object prop values.


### html attributes
Components pass `html_attributes` and another more specific `data_attributes` props as objects. This should be standardized. in principle data_attributes are html_attirbues. Additionally, `id` and `class` seem to be handled invidually as well. At a minimum, if we keep them as separate props, html_attributes needs to check against `id` or `class`, otherwise we could get redundant attributes being added.

### Classes vs. variants
It seems like defining a variant of a child component should be kept semantically separate from html_attributes (or any other way we'd pass css class values directly), since the component that needs to operate on a variant prop may need to do more with it than just add a different css class (e.g. conditional markup depending on which variant). Even if the only change in *current implementation* is a css class difference, that decision should be incapsulated within the component. So, don't pass variant configuration through classes, let the component with the variant decide to do that. In the future if we have any sort of prop type checking.

### Prop type checking
Speaking of prop-type checking, this exists: https://github.com/guym4c/twig-prop-types. Looks like a port of react prop-types, ported into twig. This would preclude using twig.js or twing.js for anything meaningful (unless we ported it *back* to js).


### Carousel (and probably similar) components
In the current Drupal theme, `carousel` items might be implicitly inheriting some props. `Carousel-slab` passes `level` to `carousel`, which doesn't mention it, but then implicitly passes it to `eck-entity--collection-item--media-figure`, which passes it on to `components-media-with-caption`, who finally references it. The question here is how flexible the child components can be. Should the `carousel` just have a single slot to take an array of arbitrary objects? and if so how does it pass necessary props (e.g. `aspect`, `width`, `level`, etc)? 

#### Option 1: It's up to the drupal template
In this case, the eck entity template is responsible for knowing what presentation props to pass to `media-with-caption`. This makes sense, you'd just write a 'slide' specific template for the entity, and configure Drupal to use that when rendering them in a carousel. This would let the eck template break the carousel render (maybe).

#### Option 2: Pass the props somehow
Not sure this is doable, but maybe when you output drupal renderable variables (e.g `{{content}}`, or in this case `{{figures}}`), they have access to the parent twig context. Then you could do what looks like is happening now, and leave some 'hint' props for the child elements to use if they want. This is sloppy and not really 'type safe'. A variant of this would be to at least namespace it in some sort of 'parent_props' object. blech.

#### Option 3: Skip the renderables
Instead of letting drupal templates render the contents of the carousel, accept an array of specific data types and render them within the carousel component. This would be least flexible and most stable. This is an un-drupally solution.



