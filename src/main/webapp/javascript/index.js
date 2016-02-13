var viewModel = new indexViewModel();

$(window).resize(reSetSize);

$(document).ready(function() {
    reSetSize();
    ko.applyBindings(viewModel);
});

function indexViewModel() {
    var self = this;
    this.hasLogin = ko.observable(false);
    this.hasCreate = ko.observable(false);
    this.htmlUrl = ko.observable("");
    this.userName = ko.observable("");
    this.userPassword = ko.observable("");
    this.canLogin = ko.computed(function() {
        return !(isNullOrUndefined(this.userName()) || isNullOrUndefined(this.userPassword()));
    }, this);
    this.register = function() {
        var user = {
            userId : "",
            userName : this.userName(),
            password : this.userPassword(),
            power : "2"
        };
        $.ajax({
            type : "POST",
            url : "register.do",
            async : true,
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(user),
            success : function(data) {
                var newuser = data;
                self.hasLogin(true);
            }
        });
    };
    this.login = function() {
        var user = {
            userId : "",
            userName : this.userName(),
            password : this.userPassword(),
            power : "2"
        };
        $.ajax({
            type : "POST",
            url : "login.do",
            async : false,
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(user),
            success : function(data) {
                if (!isNullOrUndefined(data)) {
                    if (data.password == user.password) {
                        self.hasLogin(true);
                    } else {
                        alert("密码错误！");
                    };
                } else {
                    alert("不存在此用户，请先注册~");
                };
            }
        });
    };
    this.createJsp = function() {
        indexViewModel.hasCreate(true);
        $('#create').attr("src", "createJsp.do");
        reSetSize();
    };
    this.createHtml = function() {
        this.hasCreate(true);
        this.htmlUrl("createHtml.do");
        reSetSize();
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
