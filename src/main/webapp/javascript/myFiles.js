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
                    var row = Math.floor(fileList[i].toString().length / 9);
                    filesModel.filesName.push({
                        image : ko.computed(function() {
                            if (viewModel.myHtml()) {
                                return "images/html.png";
                            };
                            if (viewModel.myJsp()) {
                                return "images/jsp.png";
                            };
                        }, this),
                        file : ko.observable(fileList[i]),
                        isSelected : ko.observable(false),
                        highLight : function() {
                            this.isSelected(!this.isSelected());
                        }
                    });
                };
            };
        }
    });
}

function FilesModel() {
    var self = this;

    this.selectedFiles=ko.observableArray([]);
    this.filesName = ko.observableArray([]);
    this.canDelete=ko.computed()
    
    this.remove = function() {
        self.filesName
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