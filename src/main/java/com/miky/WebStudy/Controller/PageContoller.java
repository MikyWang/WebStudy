package com.miky.WebStudy.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miky.WebStudy.Common.FileHelper;
import com.miky.WebStudy.Common.FileHelper.FileType;
import com.miky.WebStudy.Entity.UploadFile;

@Controller
public class PageContoller {

	@RequestMapping(value = "createHtml")
	public String createHtml() {

		return "CodeEdit";
	}

	@RequestMapping(value = "userPage")
	public String userPage() {
		return "User";
	}

	@RequestMapping(value = "test")
	public String test() {
		return "test";
	}

	@RequestMapping(value = "uploadCode", method = RequestMethod.POST)
	@ResponseBody
	public String upload_html(@RequestBody UploadFile uploadFile, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			FileHelper.PutFile(request, uploadFile.getFileBody(), uploadFile.getFileName(), uploadFile.getFileType());
			response.setContentType("text/html;charset=UTF-8");

		} catch (Exception e) {

		}
		return ("htmls/" + uploadFile.getFileName());
	}
}
