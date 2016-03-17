var viewModel = new indexViewModel();
var topModel = new topModel();

$(document).ready(function() {
    ko.attach("viewModel", viewModel);
    ko.attach("topModel", topModel);
    $('#userPage').html(navigate("userPage.do"));
    setBlockSize();
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
        $.ajax({
            url : "createHtml.do",
            async : true,
            success : function(data) {
                self.jspUrl(data);
            }
        });
        this.initJsp(true);
    };
    this.createHtml = function() {
        this.initHtml(true);
        $('#createPage').html(navigate("createHtml.do"));
        $('.userPane').css({
            color : '#FFF'
        });
    };
}