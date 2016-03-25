var viewModel = new indexViewModel();
var topModel = new topModel();

$(document).ready(function() {
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
    this.hasCreated = ko.observable(false);
    this.height = ko.observable();
    this.myHtml = ko.observable(false);
    this.myJsp = ko.observable(false);

    this.showJspFiles = function() {
        self.myHtml(false);
        self.myJsp(true);
        self.showFiles();
    };

    this.showFiles = function() {
        ShowHost('#myFiles.contentHost');
        if (!self.hasCreated()) {
            self.hasCreated(true);
            $('.userPane').css({
                color : '#FFF'
            });
        };
        if ( typeof (filesModel) == 'undefined') {
            $('#myFiles.contentHost').html(navigate("filePage.do", '#myFiles.contentHost'));
        };
        initFiles();
    };

    this.showHtmlFiles = function() {
        self.myHtml(true);
        self.myJsp(false);
        self.showFiles();
    };

    this.uploadFile = function() {
        $('.file').click();
    };

    this.createJsp = function() {
        this.initJsp(true);
        this.initHtml(false);
        self.createFile();
    };

    this.createFile = function() {
        ShowHost('#CodeEdit.contentHost');
        if (!self.hasCreated()) {
            self.hasCreated(true);
        };
        if ( typeof (codeEditModel) == 'undefined') {
            $('#CodeEdit.contentHost').html(navigate("createHtml.do", '#CodeEdit.contentHost'));
            $('.userPane').css({
                color : '#FFF'
            });
        } else {
            initContent();
        };
    };

    this.createHtml = function() {
        this.initHtml(true);
        this.initJsp(false);
        self.createFile();
    };
}

ko.attach("viewModel", viewModel);
ko.attach("topModel", topModel);
