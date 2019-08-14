const link_group_dropdown = () => {

    $('.link-group-dropdown > a').each(function() {
        $(this).on('click', function() {
            var $slabEl = $(this).parents('.link-group-dropdown');

            if ($slabEl.attr('aria-expanded') === 'false') {
                $slabEl.attr('aria-expanded', 'true');
            } else {
                $slabEl.attr('aria-expanded', 'false');
            }
        });

        $(this).on('keydown', function() {
            var $slabEl = $(this).parents('.link-group-dropdown');

            if ($slabEl.attr('aria-expanded') === 'false') {
                $(this).click();
            }
        });

    });


    $(window).on('click', function(e) {

        // if the target was not within the expanded dropdown
        console.log($(e.target).parents('.link-group-dropdown'));
        if ($(e.target).parents('.link-group-dropdown').length < 1){
            $('.link-group-dropdown[aria-expanded="true"]').attr('aria-expanded', 'false');
        }
    });

}