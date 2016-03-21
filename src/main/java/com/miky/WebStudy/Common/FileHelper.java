package com.miky.WebStudy.Common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class FileHelper {

	@Resource
	public enum FileType {
		html, jsp
	}

	public static String GetFile(HttpServletRequest request, String fileName, FileType fileType) throws Exception {

		File file = new File(getPath(request, fileType), fileName);

		FileInputStream fileInputStream = new FileInputStream(file);
		BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
		byte[] b = new byte[1000];
		int i = 0;
		String initHtml = null;
		while ((i = bufferedInputStream.read(b)) != -1) {
			initHtml = new String(b, 0, i, "UTF-8");
		}
		bufferedInputStream.close();
		fileInputStream.close();

		return initHtml;
	}

	public static void PutFile(HttpServletRequest request, String putData, String fileName, FileType fileType)
			throws Exception {
		
		File file = new File(getPath(request, fileType), fileName);
		FileOutputStream fileOutputStream = new FileOutputStream(file);
		BufferedOutputStream outputStream=new BufferedOutputStream(fileOutputStream);
		byte[] b = putData.getBytes("UTF-8");
		outputStream.write(b);
		outputStream.close();
		fileOutputStream.close();
		
	}

	private static String getPath(HttpServletRequest request, FileType fileType) {
		String path = null;
		switch (fileType) {
		case html:
			path = request.getServletContext().getRealPath("/htmls");
			break;

		case jsp:
			path = request.getServletContext().getRealPath("/uploadJsp");
			break;

		default:
			break;
		}
		return path;
	}

}
