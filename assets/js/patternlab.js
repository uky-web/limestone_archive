/* 
 * code specific to patternlab goes here
 */

$(document).ready(() => {
    // Grid toggle behavior, dev only
    $('.gridToggle').on('click', () => {
        $('body').toggleClass('layout-grid--on')
    });
    // Include labels
    $('.includeToggle').on('click', () => {
        $('body').toggleClass('twig-includes--on')
    }); 

    // Initialize RIA components; 
    // this is handled differently in Drupal
    image_gallery();
    accordion();
    ambient_video();
    carousel();
    modals();
    togglebutton();
});