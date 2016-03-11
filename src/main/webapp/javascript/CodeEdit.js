/**
 * @author v-qimiky
 */
var codeEditModel = new CodeEditModel();

$(document).ready(function() {
    ko.attach("CodeEditModel", codeEditModel);
});

function CodeEditModel() {
    var self = this;
    this.fileName = ko.observable();
    this.hasSuffix = ko.observable(true);
}
