/**
 * @author v-qimiky
 */
var spinnerModel = new spinnerModel();

$(window).resize(setBlockSize);

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

function spinnerModel() {
    var self = this;
    this.spinner = ko.observable("");
    this.isLoading = ko.observable(false);
}

function isNullOrUndefined(object) {
    return object == null || object == "" || object == undefined;
}

function setBlockSize() {
    var winHeight = $(window).height();
    $('.blockPane').height(winHeight);
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
    init : function(element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var allBindings = allBindingsAccessor();
        $(element).bind('input', function() {
            if (allBindings.fileName().indexOf('.') < 0) {
                value(true);
            } else {
                value(false);
            };
        });
    },
    update : function(element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var allBindings = allBindingsAccessor();
        if (value) {
            allBindings.fileName(allBindings.fileName + 'html');
            value(false);
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

