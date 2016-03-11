<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>CodeEdit</title>
    </head>
    <body>
        <div class="blockPane"></div>
        <div>
            <input type="text" class="textBase input" data-bind='value : fileName, valueUpdate : "afterkeydown", suffix : hasSuffix'   placeholder="请输入文件名:"  />
        </div>
    </body>
</html>
