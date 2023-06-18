const togglebutton = () => {
  $('.toggle-button').each((i, e) => {
    if ($(e).data('toggle-viz') == true) {
      const $button = $(e);
      const $toggle = $($button.data('toggle'));
      const original_label = $button.find('.label').text();
      const original_icon = $button.find('.ic').attr('class').match(/ic--(\w+)/)[1];
      $button.data('toggle-icon', original_icon);
      $button.data('toggle-label', original_label);
      if ($toggle.prop('hidden')) {
        $toggle.attr('aria-hidden', true);
      }
    }
  });
  $('.toggle-button').on('click', (e) => {
    const $button = $(e.currentTarget);
    const toggleclass = $button.data('toggle-class');
    const toggleviz = ($button.data('toggle-viz') == true);
    const $toggle = $($button.data('toggle'));
    const pressed = ($button.attr('aria-pressed') == 'true');
    const toggled_label = $button.data('toggle-toggled-label');
    const toggled_icon = $button.data('toggle-toggled-icon');
    const original_label = $button.data('toggle-label');
    const original_icon = $button.data('toggle-icon');
    const newpressed = (pressed) ? 'false' : 'true';
    if (toggled_label) {
      const nextLabel = (newpressed == 'true') ? toggled_label : original_label;
      $button.find('.label').text(nextLabel);
    }
    if (toggled_icon) {
      const nextIcon = (newpressed == 'true') ? toggled_icon : original_icon;
      const removeIcon = (newpressed == 'true') ? original_icon : toggled_icon;
      $button.find('.ic').addClass('ic--' + nextIcon).removeClass('ic--' + removeIcon);
    }
    if (toggleclass) {
      $toggle.toggleClass(toggleclass, newpressed);
    }
    if (toggleviz) {
      const isHidden = $toggle.prop('hidden');
      $toggle.prop('hidden', !isHidden);
      $toggle.attr({
        'aria-hidden': !isHidden
      });
    }
    $button.attr('aria-pressed', newpressed);
  });
};
