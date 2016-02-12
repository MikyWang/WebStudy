var createType;

$(window).resize(reSetSize);

$(document).ready(function() {
    reSetSize();
    ko.applyBindings(indexViewModel);
});

var indexViewModel = {
    createHtml : createHtml,
    createJsp : createJsp,
    hasCreate:ko.observable(false),
};

function createHtml() {
    indexViewModel.hasCreate(true);
    $('#create').attr("src", "createHtml.do");
    reSetSize();

}

function createJsp() {
    indexViewModel.hasCreate(true);
    $('#create').attr("src", "../createJsp.do");
    reSetSize();
}

function reSetSize() {
    $('#header').clearQueue();
    $('#title').clearQueue();
    $('navigater').clearQueue();
    $('#create').clearQueue();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var headerHeight;
    var bodyHeight;
    if (indexViewModel.hasCreate()) {
        headerHeight = winHeight * 0.1;
        bodyHeight = winHeight * 0.9;
        $('#create').animate({
            height : (winHeight * 0.9).toString(),
            width : (winWidth - 220).toString()
        }, function() {
            $('#title').animate({
                right : winWidth / 2 - 100
            });
            $('#navigater').animate({
                width : 200
            });
        });
    } else {
        headerHeight = (winHeight * 0.4);
        bodyHeight = (winHeight * 0.6);
    };
    $('#header').animate({
        height : headerHeight,
    });
    $('#navigater').animate({
        height : bodyHeight,
    });
}
