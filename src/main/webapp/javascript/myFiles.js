//# sourceURL=myFiles.js

var filesModel = new FilesModel();

function initFiles() {
    $.ajax({
        url : userModel.userId() + "/myFiles.do?fileType=" + filesModel.fileType(),
        success : function(data) {
            var fileList = data.toString().split("-_-");
            filesModel.clearUp();
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
                            if (filesModel.selectedFiles.indexOf(this) == -1) {
                                filesModel.selectedFiles.push(this);
                            } else {
                                filesModel.selectedFiles.remove(this);
                            }
                        }
                    });
                };
            };
        }
    });
}

function FilesModel() {
    var self = this;

    this.selectedFiles = ko.observableArray([]);
    this.filesName = ko.observableArray([]);
    this.readUrl = ko.observable();
    this.isBlocking = ko.observable(false);
    this.isReading = ko.observable(false);
    this.readUrl.extend({
        notify : 'always'
    });

    this.canDelete = ko.computed(function() {
        return this.selectedFiles().length > 0;
    }, this);

    this.canEditOrRead = ko.computed(function() {
        return this.selectedFiles().length == 1;
    }, this);

    this.clearUp = function() {
        self.filesName.removeAll();
        self.selectedFiles.removeAll();
        self.isBlocking(false);
        self.isReading(false);
    };

    this.back = function() {
        self.clearUp();
        initFiles();
    };

    this.edit = function() {

    };

    this.read = function() {
        self.isBlocking(true);
        self.isReading(true);
        var url = userModel.userId() + "/getFileUrl.do?fileType=" + self.fileType() + "&fileName=" + self.selectedFiles()[0].file();
        $.ajax({
            url : url,
            success : function(data) {
                self.readUrl(data);
            }
        });
    };

    this.remove = function() {
        $('div.highLight').hide(300, function() {
            var url = userModel.userId() + "/deleteFiles.do?fileType=" + filesModel.fileType() + "&fileNames=";
            self.selectedFiles().forEach(function(file) {
                url += "-_-" + file.file();
                self.filesName.remove(file);
            });
            self.selectedFiles.removeAll();
            $.ajax({
                url : url,
                success : function(data) {
                    alert(data);
                }
            });
        });
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