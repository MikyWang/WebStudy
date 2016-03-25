//# sourceURL=myFiles.js

var filesModel = new FilesModel();

function initFiles() {
    $.ajax({
        url : userModel.userId() + "/myFiles.do?fileType=" + filesModel.fileType(),
        success : function(data) {
            var fileList = data.toString().split("-_-");
            filesModel.filesName.removeAll();
            for (var i = 0; i < fileList.length; i++) {
                if (!isNullOrUndefined(fileList[i])) {
                    filesModel.filesName.push({
                        image : ko.computed(function() {
                            if (viewModel.myHtml()) {
                                return "images/html.png";
                            };
                            if (viewModel.myJsp()) {
                                return "images/jsp.png";
                            };
                        }, this),
                        file : ko.observable(fileList[i])
                    });
                };
            };
        }
    });
}

function FilesModel() {
    var self = this;
    this.filesName = ko.observableArray([]);
    this.remove = function() {
        self.filesName.remove(this);
    };
    this.fileType = ko.computed(function() {
        if (viewModel.myHtml()) {
            return "html";
        };
        if (viewModel.myJsp()) {
            return "jsp";
        };
    }, this);
}

ko.attach("FilesModel", filesModel);
//@ sourceURL=myFiles.js