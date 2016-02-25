<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>关于用户的页面</title>
<link rel="stylesheet" type="text/css" href="css/user.css" />
<script src="javascript/user.js"></script>
</head>
<body>
	<div class="userPane" data-bind="showVisible : hasLogin">
		<img alt="用户头像" src="images/userPicture.png">
		<div data-bind="text : userMail"></div>
		<div data-bind="text : userName"></div>
	</div>
	<div class="userTable" data-bind="showVisible : !hasLogin()">
		<div id="loginTable" data-bind="leftVisible : !isRegistering()">
			<input class="textBase input loginLine" id="userName"
				data-bind='value : userName, valueUpdate: "afterkeydown"' type="text"
				placeholder="请输入用户名" />
			<input class="textBase input loginLine" id="userPassword"
				data-bind='value:userPassword, valueUpdate: "afterkeydown"' type="password"
				placeholder="请输入密码" />
			<input type="button" value="注册" class="register buttonBase enable loginLine "
				data-bind="click : register" />
			<input type="button" id="login" value="登录" class="buttonBase loginLine"
				data-bind="click : login, enable : canLogin, css : {enable : canLogin}" />
		</div>
		<div id="registerTable" data-bind="leftVisible : isRegistering">
			<input class="textBase input loginLine"
				data-bind='value:userName, valueUpdate: "afterkeydown"' type="text"
				placeholder="请输入用户名" />
			<input class="textBase input loginLine"
				data-bind='value:userPassword, valueUpdate: "afterkeydown"' type="password"
				placeholder="请输入密码" />
			<div class="incorrect" data-bind="showVisible : isIncorrectPassword">两次密码输入不匹配!</div>
			<input class="textBase input loginLine"
				data-bind='value:userPasswordT, valueUpdate: "afterkeydown"' type="password"
				placeholder="请再次输入密码" />
			<div class="incorrect" data-bind="showVisible : isIncorrectMail">邮箱格式错误!</div>
			<input class="textBase input loginLine"
				data-bind='value : userMail, valueUpdate: "afterkeydown"' type="text"
				placeholder="请输入邮箱地址" />
			<input type="button" value="注册"
				class="register buttonBase enable registerLine "
				data-bind="click : register" />
		</div>
	</div>
</body>
</html>