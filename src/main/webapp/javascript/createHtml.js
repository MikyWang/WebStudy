/**
 * @author v-qimiky
 */
var path = null;
var uploadString = "是否查看代码生成的网页?";
var emptyFileNameString = "请输入文件名";
var hasPoint = false;

var CreateHtmlViewModel = {
    showPreview : showPreview,
    refreshPreview : refreshPreview,
    upload : upload,
    isShowClick : ko.observable(false),
    preview : ko.observable("预览"),
};

$(window).resize(reSetSize);

$(document).ready(function() {
    InitHtml();
    reSetSize();
    ko.applyBindings(CreateHtmlViewModel);
});

function InitHtml() {
    $.ajax({
        type : "GET",
        url : "htmls/popUp.html",
        async : true,
        success : function(data) {
            $('body').prepend(data);
            $('#submitButton').bind('click', upload);
            $('.input').bind('input', addSuffix).bind('change', checkSuffix);
            initSetUp();
        }
    });

    $.ajax({
        type : "GET",
        url : "htmls/Init.html",
        async : true,
        success : function(data) {
            $('#Pane').text(data);
        }
    });
}

function checkSuffix() {
    if (!hasPoint) {
        $(this).val($(this).val() + ".html");
        hasPoint = true;
    };
}

function addSuffix() {
    if ($(this).val().indexOf('.') > 0 && !hasPoint) {
        hasPoint = true;
        $(this).val($(this).val() + "html");
    };
    if ($(this).val().indexOf('.') < 0) {
        hasPoint = false;
    };
    if ($(this).attr('id') == "verifyFileName") {
        verifyFileName();
    };
}

function saveFile(uploadFile, success) {
    path = "htmls/" + uploadFile.fileName.toString();
    $.ajax({
        type : "POST",
        url : "uploadHtml.do",
        async : true,
        contentType : "application/json; charset=utf-8",
        data : JSON.stringify(uploadFile),
        success : success
    });
}

function upload() {
    $('.blockPane').show();
    if ($('#fileName').val() == "") {
        $('#popUpTitle').html(emptyFileNameString);
        $('#verifyFileName').show();
        verifyFileName();
        $('.cd-popup').addClass('is-visible');
        $('.alert').unbind('click', jumpToNewPage).bind('click', saveFileName);
    } else {
        var uploadFile = {
            fileName : $('#fileName').val(),
            fileBody : $('#Pane').val()
        };
        saveFile(uploadFile, function() {
            $('.alert').unbind('click', saveFileName).bind('click', jumpToNewPage);
            $('#popUpTitle').html(uploadString);
            $('.cd-popup').addClass('is-visible');
        });
    };
}

function verifyFileName() {
    var verifyFileName = $('#verifyFileName').val();
    if (isNullOrUndefined(verifyFileName)) {
        $('#yesButton').attr("disabled", "disabled").removeClass('enable');
    } else {
        $('#yesButton').removeAttr('disabled').addClass('enable');
    };
};

function saveFileName() {
    $('#verifyFileName').hide();
    if ($(this).attr('id') == "yesButton") {
        $('#fileName').val($('#verifyFileName').val());
        upload();
    };
}

function jumpToNewPage() {
    if ($(this).attr('id') == "yesButton") {
        location.href = path;
    };
}

function refreshPreview() {
    var uploadFile = generatePreviewFile();
    saveFile(uploadFile, function() {
        $('#preview').attr("src", path);
    });
}

function generatePreviewFile() {
    return {
        fileName : "temp.html",
        fileBody : $('#Pane').val()
    };
}

function showPreview() {
    CreateHtmlViewModel.isShowClick(!CreateHtmlViewModel.isShowClick());
    if (!CreateHtmlViewModel.isShowClick()) {
        CreateHtmlViewModel.preview("预览");
    } else {
        CreateHtmlViewModel.preview("取消预览");
    };
    if (CreateHtmlViewModel.isShowClick()) {
        var uploadFile = generatePreviewFile();
        saveFile(uploadFile, function() {
            $('#preview').attr("src", path);
            reSetSize();
        });
    } else {
        reSetSize();
    };
}

function reSetSize() {
    $('#lefter').clearQueue();
    if ($(window).width() <= 1000) {
        CreateHtmlViewModel.isShowClick(false);
        $('#showPreview').hide();
        $('#lefter').animate({
            width : "100%"
        });
    } else {
        $('#showPreview').show();
        if (CreateHtmlViewModel.isShowClick()) {
            $('#lefter').animate({
                width : "50%"
            });
        } else {
            $('#lefter').animate({
                width : "100%"
            });
        };
    };
    var winHeight = $(window).height();
    var htmlPaneHeight = winHeight * 0.83;
    $('.baseFrame').css("height", winHeight.toString());
}