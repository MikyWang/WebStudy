<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/createHtml.css" />
<script type="text/javascript" src="javascript/createHtml.js"></script>
<title>创建HTML页面</title>
</head>
<body>
	<div class="blockPane"></div>
	<div id="lefter" class="baseFrame ">
		<input type="text" placeholder="请输入文件名:" id="fileName" class="textBase input" />
		<div id="showPreview" class="buttonBase enable"
			data-bind="click : showPreview,html : preview"></div>
		<textarea id="Pane" class="textBase" spellcheck="false"></textarea>
		<div id="submitButton" class="buttonBase enable" data-bind="click : upload">上传代码</div>
	</div>
	<div id="righter" class="baseFrame" data-bind="visible : isShowClick">
		<div id="refreshPreview" class="buttonBase enable"
			data-bind="click : refreshPreview">刷新预览</div>
		<iframe id="preview"></iframe>
	</div>

</body>
</html>