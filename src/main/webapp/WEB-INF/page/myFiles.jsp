<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/myFiles.css" />
<title>我的文件</title>
</head>
<body>
	<div class="container" data-bind=" foreach : filesName">
		<div class="fileContainer">
			<img data-bind="attr : {src : image}" /> <a href="javascript:void(0);" class="singleFile"
				data-bind="text : file"></a>
		</div>
	</div>
	<script src="javascript/myFiles.js"></script>
</body>
</html>