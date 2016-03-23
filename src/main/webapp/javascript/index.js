var viewModel = new indexViewModel();
var topModel = new topModel();

$(document).ready(function() {
    ko.attach("viewModel", viewModel);
    ko.attach("topModel", topModel);
    $('#userPage').html(navigate("userPage.do", '#userPage'));
    $('.file').bind('change', function() {
        var reader = new FileReader();
        var file = this.files[0];
        reader.readAsText(file, "utf8");
        var fileType = file.name.split(".")[1];
        reader.onload = function(f) {
            if (fileType == "html") {
                viewModel.fileName(file.name);
                viewModel.fileBody(this.result);
                viewModel.createHtml();
            } else if (fileType == "jsp") {
                viewModel.fileName(file.name);
                viewModel.fileBody(this.result);
                viewModel.createJsp();
            } else {
                alert("请上传html或jsp文件！");
                return;
            }
        };

    });
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
    this.fileName = ko.observable();
    this.fileBody = ko.observable();
    this.hasCreated = ko.computed(function() {
        return this.initHtml() || this.initJsp();
    }, this);
    this.height = ko.observable();

    this.showHtmlFiles = function() {
        if (!self.hasCreated()) {
            this.initHtml(true);
            this.initJsp(false);
            $('#contentHost').html(navigate("filePage.do", '#contentHost'));
            $('.userPane').css({
                color : '#FFF'
            });
        } else {
            this.initHtml(true);
            this.initJsp(false);
        } ;
    };

    this.uploadFile = function() {
        $('.file').click();
    };

    this.createJsp = function() {
        if (!self.hasCreated()) {
            this.initJsp(true);
            this.initHtml(false);
            $('#contentHost').html(navigate("createHtml.do", '#contentHost'));
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
            $('#contentHost').html(navigate("createHtml.do", '#contentHost'));
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