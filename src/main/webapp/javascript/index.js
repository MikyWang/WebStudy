var viewModel = new indexViewModel();
var topModel=new topModel();

$(document).ready(function() {
    ko.attach("viewModel", viewModel);
    ko.attach("topModel",topModel);
    $('#userPage').html(navigate("userPage.do"));
    setBlockSize();
});

function topModel() {
    var self = this;
    this.hasCreate = ko.computed(function() {
        return viewModel.hasCreate();
    }, this);
}

function indexViewModel() {
    var self = this;
    this.hasCreate = ko.observable(false);
    this.hasLogin = ko.observable(false);
    this.height = ko.observable();
    this.createJsp = function() {
        $.ajax({
            url : "createHtml.do",
            async : true,
            success : function(data) {
                self.jspUrl(data);
            }
        });
        this.hasJsp(true);
    };
    this.createHtml = function() {
        this.hasCreate(true);
        $('#createPage').html(navigate("createHtml.do"));
        $('.userPane').css({
            color : '#FFF'
        });
    };
}