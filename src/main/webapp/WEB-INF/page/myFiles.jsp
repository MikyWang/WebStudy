<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="javascript/myFiles.js"></script>
<title>我的文件</title>
</head>
<body>
	<div class="FileContainer" data-bind=" foreach : filesName">
		<a href="javascript:void(0);" class="singleFile" data-bind="text : file"></a><a
			href="javascript:void(0);" class="buttonBase enable" data-bind="click : $parent.remove">删除</a>
	</div>
</body>
</html>