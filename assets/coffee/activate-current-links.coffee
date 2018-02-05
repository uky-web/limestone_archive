$ = jQuery
Drupal.behaviors.activate_current_links =
  attach: (context, settings) ->
    $('a').each ->
        $a = $(this)
        url = $a.attr('href')
        if url == window.location.href or url == window.location.pathname
            $a.addClass 'is-active'
        return
    return