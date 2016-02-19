var viewModel = new indexViewModel();

$(window).resize(reSetSize);

$(document).ready(function() {
    ko.attach("viewModel",viewModel);
    reSetSize();
});

function indexViewModel() {
    var self = this;
    this.hasLogin = ko.observable(false);
    this.hasCreate = ko.observable(false);
    this.isRegistering = ko.observable(false);
    this.htmlUrl = ko.observable("");
    this.userName = ko.observable("");
    this.userPassword = ko.observable("");
    this.userPasswordT = ko.observable("");
    this.isIncorrectMail = ko.observable(false);
    this.userMail = ko.observable("");
    this.isIncorrectPassword = ko.observable(false);
    this.isInputNull = ko.computed(function() {
        return (isNullOrUndefined(self.userName()) || isNullOrUndefined(self.userPassword()) || isNullOrUndefined(self.userPasswordT()) || isNullOrUndefined(self.userMail()));
    }, this);
    this.userPasswordT.subscribe(function(password) {
        if (self.userPassword() != self.userPasswordT()) {
            self.isIncorrectPassword(true);
        } else {
            self.isIncorrectPassword(false);
        };
    });
    this.userMail.subscribe(function(mail) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(mail)) {
            self.isIncorrectMail(true);
        } else {
            self.isIncorrectMail(false);
        };
    });
    this.canLogin = ko.computed(function() {
        return !(isNullOrUndefined(this.userName()) || isNullOrUndefined(this.userPassword()));
    }, this);
    this.register = function() {
        if (this.isRegistering()) {
            if (self.isIncorrectMail() || self.isIncorrectPassword() || self.isInputNull()) {
                alert("请输入正确的注册信息!");
            } else {
                var user = {
                    userName : this.userName(),
                    password : this.userPassword(),
                    userMail : this.userMail()
                };
                spinnerModel.isLoading(true);
                $.ajax({
                    type : "POST",
                    url : "register.do",
                    async : true,
                    contentType : "application/json; charset=utf-8",
                    data : JSON.stringify(user),
                    success : function(data) {
                        self.hasLogin(true);
                        spinnerModel.isLoading(false);
                    }
                });
            };
        } else {
            this.isRegistering(true);
        };

    };
    this.login = function() {
        var user = {
            userName : this.userName(),
            password : this.userPassword(),
        };
        spinnerModel.isLoading(true);
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
                spinnerModel.isLoading(false);
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
        headerHeight = (winHeight * 0.3);
        bodyHeight = (winHeight * 0.7);
    };
    $('#header').animate({
        height : headerHeight,
    });
    $('#navigater').animate({
        height : bodyHeight,
    });
}
