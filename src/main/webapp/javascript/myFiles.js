/**
 * @author wqy81
 */
var filesModel = new FilesModel();

$(document).ready(function() {
    ko.attach("ContentModel", filesModel);
    $.ajax({
        url : userModel.userId() + "/myFiles.do" + "/html",
        type : "GET",
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
