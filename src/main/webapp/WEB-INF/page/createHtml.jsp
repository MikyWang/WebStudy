<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="javascript/jquery-1.11.3.js"></script>
<script type="text/javascript" src="javascript/knockout-3.4.0.debug.js"></script>
<script src="javascript/jquery.livequery.js"></script>
<script src="javascript/knockout.multimodels-0.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/createHtml.css" />
<link rel="stylesheet" type="text/css" href="css/baseStyle.css" />
<script type="text/javascript" src="javascript/setUp.js"></script>
<script type="text/javascript" src="javascript/createHtml.js"></script>
<title>创建HTML页面</title>
</head>
<body>
	<div class="blockPane"></div>
	<div id="lefter" class="baseFrame ">
		<input type="text" placeholder="请输入文件名:" id="fileName"
			class="textBase input" />
		<div id="showPreview" class="buttonBase enable"
			data-bind="click : showPreview,html : preview"></div>
		<textarea id="Pane" class="textBase" spellcheck="false"></textarea>
		<div id="submitButton" class="buttonBase enable"
			data-bind="click : upload">上传代码</div>
	</div>
	<div id="righter" class="baseFrame" data-bind="visible : isShowClick">
		<div id="refreshPreview" class="buttonBase enable"
			data-bind="click : refreshPreview">刷新预览</div>
		<iframe id="preview"></iframe>
	</div>

</body>
</html>