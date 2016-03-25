//# sourceURL=CodeEdit.js

var codeEditModel = new CodeEditModel();
$(document).ready(function() {
    initContent();
});

function initContent() {
    if (!(isNullOrUndefined(viewModel.fileName()) || isNullOrUndefined(viewModel.fileBody()))) {
        codeEditModel.fileName(viewModel.fileName());
        codeEditModel.fileBody(viewModel.fileBody());
        viewModel.fileName(null);
        viewModel.fileBody(null);
    } else {
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

}

function CodeEditModel() {
    var self = this;
    this.fileName = ko.observable();
    this.previewUrl = ko.observable();
    
    this.previewUrl.extend({
        notify : 'always'
    });
    this.showPreview = function() {
        var uploadFile = {
            fileName : "default." + self.fileType(),
            fileBody : self.fileBody(),
            fileType : self.fileType()
        };
        $.ajax({
            url : userModel.userId()+"/uploadCode.do",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(uploadFile),
            success : function(data) {
                self.previewUrl(data);
            }
        });
    };
    this.canUpload = ko.computed(function() {
        return !isNullOrUndefined(self.fileName());
    }, this);
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
            url : userModel.userId()+"/uploadCode.do",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(uploadFile),
            success : function(data) {
                alert(data);
            }
        });
    };
}
ko.attach("ContentModel", codeEditModel);
//@ sourceURL=CodeEdit.js
