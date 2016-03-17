//# sourceURL=CodeEdit.js

var codeEditModel = new CodeEditModel();
$(document).ready(function() {
    ko.attach("CodeEditModel", codeEditModel);
    initContent();
});

function initContent() {
    var initFile = {
        fileName : codeEditModel.initName()
    };
    $.ajax({
        type : "POST",
        url : "getSysFile.do",
        async : true,
        contentType : "application/json; charset=utf-8",
        data : JSON.stringify(initFile),
        success : function(data) {
            codeEditModel.fileBody(data.fileBody);
        }
    });
}

function CodeEditModel() {
    var self = this;
    this.fileName = ko.observable();
    this.initName = ko.computed(function() {
        if (viewModel.initHtml()) {
            return "Init.html";
        };
        if (viewModel.initJsp()) {
            return "initJsp.jsp";
        };
    }, this);
    this.fileType = ko.computed(function() {
        if (viewModel.initHtml()) {
            return "html";
        };
        if (viewModel.initJsp()) {
            return "jsp";
        };
    }, this);
    this.hasSuffix = ko.observable(false);
    this.fileBody = ko.observable();
    this.uploadFile = function() {
        if (self.fileName() != '' && self.fileName().indexOf('.') < 0 && !self.hasSuffix()) {
            if (codeEditModel.fileType() == "html") {
                self.fileName(self.fileName() + '.html');
            };
            if (codeEditModel.fileType() == "jsp") {
                self.fileName(self.fileName() + '.jsp');
            };
            codeEditModel.hasSuffix(true);
        };
        var uploadFile = {
            fileName : self.fileName(),
            fileBody : self.fileBody(),
            fileType : self.fileType()
        };
        $.ajax({
            url : "uploadCode.do",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(uploadFile),
            success : function(data) {
                alert(data);
            }
        });
    };
}

//@ sourceURL=CodeEdit.js
