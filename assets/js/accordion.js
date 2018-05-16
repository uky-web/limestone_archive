const accordion = () => {
    $('.js-accordion').accordion();
}

$(document).ready( () => {
    accordion({ buttonsGeneratedContent: 'html' });
})
