/**
 * @author v-qimiky
 */
$(window).resize(setBlockSize);
var spinnerModel = new spinnerModel();

$(document).ready(function() {
    ko.attach("spinnerModel", spinnerModel);
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

function spinnerModel() {
    var self = this;
    this.spinner = ko.observable("");
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

ko.bindingHandlers.leftVisible = {
    init : function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).show();
        } else {
            $(element).hide();
        };
    },
    update : function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value == false) {
            $(element).animate({
                left : '-' + ($(window).width() - $(element).width()) / 2 + 'px',
                opacity : '0.2',
            }, "slow", function() {
                $(element).hide();
            });
        } else {
            $(element).show().animate({
                left : '50%',
                marginLeft :'-'+$(element).width(),
                opacity : '1',
            }, "slow");
        };
    }
};

ko.bindingHandlers.showVisible = {
    init : function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).show();
        } else {
            $(element).hide();
        };
    },
    update : function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).show(300);
        } else {
            $(element).hide(300);
        };
    }
};

function navigate(url) {
    var content = null;
    $.ajax({
        url : url,
        async : false,
        success : function(data) {
            content = data;
        }
    });
    return content;
}

function initSetUp() {
    $('#verifyFileName').hide();
    $('.alert').bind('click', popUp);
}

