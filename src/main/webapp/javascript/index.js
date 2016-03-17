var viewModel = new indexViewModel();
var topModel = new topModel();

$(document).ready(function() {
    ko.attach("viewModel", viewModel);
    ko.attach("topModel", topModel);
    $('#userPage').html(navigate("userPage.do", '#userPage'));
});

function topModel() {
    var self = this;
    this.hasCreated = ko.computed(function() {
        return viewModel.hasCreated();
    }, this);
}

function indexViewModel() {
    var self = this;
    this.initHtml = ko.observable(false);
    this.initJsp = ko.observable(false);
    this.hasLogin = ko.observable(false);
    this.hasCreated = ko.computed(function() {
        return this.initHtml() || this.initJsp();
    }, this);
    this.height = ko.observable();
    this.createJsp = function() {
        if (!self.hasCreated()) {
            this.initJsp(true);
            this.initHtml(false);
            $('#createPage').html(navigate("createHtml.do", '#createPage'));
            $('.userPane').css({
                color : '#FFF'
            });
        } else {
            this.initJsp(true);
            this.initHtml(false);
            initContent();
        };

    };
    this.createHtml = function() {
        if (!self.hasCreated()) {
            this.initHtml(true);
            this.initJsp(false);
            $('#createPage').html(navigate("createHtml.do", '#createPage'));
            $('.userPane').css({
                color : '#FFF'
            });
        } else {
            this.initHtml(true);
            this.initJsp(false);
            initContent();
        };
    };
}