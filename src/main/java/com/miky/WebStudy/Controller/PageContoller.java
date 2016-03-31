package com.miky.WebStudy.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miky.WebStudy.Common.FileHelper;
import com.miky.WebStudy.Common.FileHelper.FileType;
import com.miky.WebStudy.Entity.UploadFile;

@Controller
@RequestMapping("/{userId}")
public class PageContoller {

	@RequestMapping(value = "/uploadCode", method = RequestMethod.POST)
	@ResponseBody
	public String upload_html(@PathVariable String userId, @RequestBody UploadFile uploadFile,
			HttpServletRequest request, HttpServletResponse response) {
		try {
			FileHelper.PutFile(request, uploadFile, userId);
			response.setContentType("text/html;charset=UTF-8");
		} catch (Exception e) {

		}
		String result = uploadFile.getFileType() == FileType.html ? "htmls/" : "uploadJsp/";
		result += userId + "/" + uploadFile.getFileName();
		return result;
	}

	@RequestMapping(value = "/getFileUrl")
	@ResponseBody
	public String getFile(@PathVariable String userId, String fileType, String fileName) {
		String result = FileType.valueOf(fileType) == FileType.html ? "htmls/" : "uploadJsp/";
		result += userId + "/" + fileName;
		return result;
	}

	@RequestMapping(value = "/deleteFiles")
	@ResponseBody
	public boolean deleteFiles(@PathVariable String userId, String fileType, String fileNames,
			HttpServletRequest request) {
		String[] FileNames = fileNames.split("-_-");
		try {
			for (int i = 0; i < FileNames.length; i++) {
				FileHelper.DeleteFile(request, FileNames[i], FileType.valueOf(fileType), userId);
			}
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@RequestMapping(value = "/myFiles")
	@ResponseBody
	public String myFiles(@PathVariable String userId, String fileType, HttpServletRequest request) {
		return FileHelper.GetFiles(request, FileType.valueOf(fileType), userId);
	}
}
