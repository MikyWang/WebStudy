//# sourceURL=CodeEdit.js

var codeEditModel = new CodeEditModel();

$(document).ready(function() {
    ko.attach("CodeEditModel", codeEditModel);
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
});

function CodeEditModel() {
    var self = this;
    this.fileName = ko.observable();
    this.initName = ko.computed(function() {
        if (viewModel.initHtml()) {
            return "Init.html";
        };
        if (viewModel.initJsp) {
            return "initJsp.jsp";
        };
    }, this);
    this.hasSuffix = ko.observable(true);
    this.fileBody = ko.observable();
}

//@ sourceURL=CodeEdit.js
