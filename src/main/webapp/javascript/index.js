var viewModel = new indexViewModel();

$(window).resize(reSetSize);

$(document).ready(function() {
    ko.attach("viewModel", viewModel);
    $('#userPage').html(navigate("userPage.do"));
    reSetSize();
});

function indexViewModel() {
    var self = this;
    this.hasCreate = ko.observable(false);
    this.hasLogin = ko.observable(false);
    this.createJsp = function() {
        $.ajax({
            url : "createHtml.do",
            async : true,
            success : function(data) {
                self.jspUrl(data);
            }
        });
        this.hasJsp(true);
        reSetSize();
    };
    this.createHtml = function() {
        this.hasCreate(true);
        $('#createPage').html(navigate("createHtml.do"));
        reSetSize();
        $('.userPane').css({color : '#FFF'});
    };
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
    if (viewModel.hasCreate()) {
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
        headerHeight = (winHeight * 0.3);
        bodyHeight = (winHeight * 0.7);
    };
    $('#header').height(headerHeight);
    $('#navigater').height(bodyHeight);
}
