<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="css/CodeEdit.css" />
<script src="javascript/CodeEdit.js"></script>
<title>CodeEdit</title>
</head>
<body>
	<div class="blockPane"></div>
	<input type="text" class="textBase input" data-bind='value : fileName, suffix :hasSuffix'
		placeholder="请输入文件名:" />
	<textarea class="fileBody textBase" data-bind='value : fileBody, valueUpdate : "afterkeydown"'
		spellcheck="false"></textarea>
	<button id="uploadFile" class="buttonBase enable" data-bind="click : uploadFile">上传代码</button>
</body>
</html>
