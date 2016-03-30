<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="css/CodeEdit.css" />
<title>CodeEdit</title>
</head>
<body>
	<div class="lefter">
		<input type="text" class="textBase input"
			data-bind='value : fileName, valueUpdate : "afterkeydown", suffix :hasSuffix'
			placeholder="请输入文件名:" />
		<div id="showPreview" class="buttonBase enable" data-bind='click : showPreview '>提交预览</div>
		<textarea class="fileBody textBase" data-bind='value : fileBody, valueUpdate : "afterkeydown"'
			spellcheck="false"></textarea>
		<input value="上传" type="button" id="uploadFile" class="buttonBase"
			data-bind="click : uploadFile, enable : canUpload, css : {enable : canUpload}" />
	</div>
	<iframe id="preview" class="preview textBase" data-bind='attr :{src : previewUrl}'></iframe>
	<script src="javascript/CodeEdit.js"></script>
</body>
</html>
