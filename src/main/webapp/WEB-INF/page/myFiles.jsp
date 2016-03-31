<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/myFiles.css" />
<title>我的文件</title>
</head>
<body>
	<div class="blockPane" data-bind="showVisible : isBlocking"></div>
	<div id="files" class="container  container2" data-bind=" foreach : filesName">
		<div class="fileContainer" data-bind="click : highLight, css : {highLight : isSelected}">
			<img data-bind="attr : {src : image}" />
			<div class="singleFile" data-bind="text : file, css : {highLight : isSelected}"></div>
		</div>
	</div>
	<div class="readContainer" data-bind="showVisible : isReading">
		<iframe class="textBase readFrame" data-bind="attr : {src : readUrl}"></iframe>
		<input type="button" value="返回" class="buttonBase  fileControl"
			data-bind="enable : canEditOrRead, click : back ,css : {enable : canEditOrRead}">
		<input type="button" value="编辑" class="buttonBase  fileControl"
			data-bind="enable : canEditOrRead, click : edit ,css : {enable : canEditOrRead}">
	</div>
	<div class="toolbar">
		<input type="button" value="删除" class="buttonBase  fileControl"
			data-bind="enable : canDelete,  click : remove, css : {enable : canDelete}">
		<input type="button" value="编辑" class="buttonBase  fileControl"
			data-bind="enable : canEditOrRead, click : edit ,css : {enable : canEditOrRead}">
		<input type="button" value="查看" class="buttonBase  fileControl"
			data-bind="enable : canEditOrRead, click : read, css : {enable : canEditOrRead}">
	</div>
	<script src="javascript/myFiles.js"></script>
</body>
</html>