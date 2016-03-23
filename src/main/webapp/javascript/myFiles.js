//# sourceURL=myFiles.js

var filesModel = new FilesModel();

$(document).ready(function() {
    ko.attach("ContentModel", filesModel);
    $.ajax({
        url : userModel.userId() + "/myFiles.do" + "?fileType=html",
        success : function(data) {
            var fileList = data.toString().split("-_-");
            for (var i = 0; i < fileList.length; i++) {
                filesModel.filesName.push(fileList[i]);
            };
        }
    });
});

function FilesModel() {
    var self = this;
    this.filesName = ko.observableArray([]);
    this.remove = function() {
        self.filesName.remove(this);
    };
}



//@ sourceURL=myFiles.js