/**
 * @author v-qimiky
 */
var spinnerModel = new spinnerModel();
window.ContentHost = null;

$(document).ready(function() {
    ko.attach("spinnerModel", spinnerModel);
    var spinnerU = {
        fileName : "spinner.html"
    };
    spinnerModel.isLoading(true);
    $.ajax({
        type : "POST",
        url : "getSysFile.do",
        async : true,
        contentType : "application/json; charset=utf-8",
        data : JSON.stringify(spinnerU),
        success : function(data) {
            spinnerModel.spinner(data.fileBody);
            spinnerModel.isLoading(false);
        }
    });

});

function ShowHost(page) {
    if (!isNullOrUndefined(window.ContentHost)) {
        $(window.ContentHost).hide();
    }
    window.ContentHost = page;
    $(window.ContentHost).show(400);
}

function spinnerModel() {
    var self = this;
    this.spinner = ko.observable("");
    this.isLoading = ko.observable(false);
}

function isNullOrUndefined(object) {
    return object == undefined || object == null || object == "";
}

function setBlock() {
    $('.blockPane').toggle();
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
                marginLeft : '-' + $(element).width() / 2,
                opacity : '1',
            }, "slow");
        };
    }
};

ko.bindingHandlers.height = {
    update : function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).height(value);
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
            $(element).show(300).animate({
                opacity : '1'
            });
        } else {
            $(element).animate({
                opacity : '0.2'
            }).hide(300);
        };
    }
};

ko.bindingHandlers.suffix = {
    init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).bind('input', function() {
            if ($(this).val().indexOf('.') > 0 && !codeEditModel.hasSuffix()) {
                if (codeEditModel.fileType() == "html") {
                    $(this).val($(this).val() + 'html');
                };
                if (codeEditModel.fileType() == "jsp") {
                    $(this).val($(this).val() + 'jsp');
                };
                codeEditModel.hasSuffix(true);
            };
            if ($(this).val().indexOf('.') < 0 && codeEditModel.hasSuffix()) {
                codeEditModel.hasSuffix(false);
            };
        });
    },
};

function navigate(url, element) {
    var content = null;
    $.ajax({
        url : url,
        async : false,
        success : function(data) {
            content = data;
            if (element) {
                $(element).show(300);
            };
        }
    });
    return content;
}

