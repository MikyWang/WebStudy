/**
 * @author v-qimiky
 */
$(window).resize(setBlockSize);

$(document).ready(function() {
    setBlockSize();
    $('.blockPane').hide();
});

function setBlockSize() {
    var winHeight = $(window).height();
    $('.blockPane').height(winHeight);
}

function popUp() {
    if ($(this).attr('id') == "noButton") {
        $('.cd-popup').removeClass('is-visible');
        $('.blockPane').hide();
    };
}

function isNullOrUndefined(object) {
    return object == null || object == "" || object == undefined;
}

function initSetUp() {
    $('#verifyFileName').hide();
    $('.alert').bind('click', popUp);
}
