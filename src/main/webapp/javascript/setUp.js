/**
 * @author v-qimiky
 */
$(window).resize(setBlockSize);
var spinnerModel=new spinnerModel();

$(document).ready(function() {
    ko.attach("spinnerModel",spinnerModel);
    var spinnerU = {
        fileName : "spinner.html"
    };
    spinnerModel.isLoading(true);
    $.ajax({
        type : "POST",
        url : "getSpinner.do",
        async : true,
        contentType : "application/json; charset=utf-8",
        data : JSON.stringify(spinnerU),
        success : function(data) {
            spinnerModel.spinner(data.fileBody);
            spinnerModel.isLoading(false);
        }
    });
    setBlockSize();
});

function spinnerModel(){
    var self=this;
    this.spinner=ko.observable("");
    this.isLoading = ko.observable(false);
}

function setBlockSize() {
    var winHeight = $(window).height();
    $('.blockPane').height(winHeight);
}

function popUp() {
    if ($(this).attr('id') == "noButton") {
        $('.cd-popup').removeClass('is-visible');
    };
}

function isNullOrUndefined(object) {
    return object == null || object == "" || object == undefined;
}

function initSetUp() {
    $('#verifyFileName').hide();
    $('.alert').bind('click', popUp);
}

