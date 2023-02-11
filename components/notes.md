## Using Patternlab components vs. library components

When building higher-level composed 'stories' for Patternlab (like a page), it's possible to include other patternlab 'stories', instead of using the actual library components and providing them with appropriate input props. I'm recommending we *don't* do this for a couple of reasons;

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