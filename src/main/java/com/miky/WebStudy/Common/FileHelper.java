package com.miky.WebStudy.Common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Common.FileHelper.FileType;
import com.miky.WebStudy.Entity.UploadFile;

@Service
public class FileHelper {

	@Resource
	public enum FileType {
		html, jsp
	}

	public static void DeleteFile(HttpServletRequest request, String fileName, FileType fileType, String userId)
			throws Exception {
		File file = new File(getPath(request, fileType, userId), fileName);
		if (file.isFile() && file.exists()) {
			file.delete();
		}
	}

	public static String GetFile(HttpServletRequest request, String fileName, FileType fileType, String userId)
			throws Exception {

		File file = new File(getPath(request, fileType, userId), fileName);

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

	public static String GetFiles(HttpServletRequest request, FileType fileType, String userId) {
		String path = FileHelper.getPath(request, fileType, userId);
		File file = new File(path);
		File[] tempList = file.listFiles();
		String result = "";
		for (int i = 0; i < tempList.length; i++) {
			if (tempList[i].isFile() && !tempList[i].getName().equalsIgnoreCase("default." + fileType)) {
				result += tempList[i].getName();
				if (i < tempList.length - 1) {
					result += "-_-";
				}
			}
		}
		return result;
	}

	public static void PutFile(HttpServletRequest request, UploadFile uploadFile, String userId) throws Exception {

		File file = new File(getPath(request, uploadFile.getFileType(), userId), uploadFile.getFileName());
		FileOutputStream fileOutputStream = new FileOutputStream(file);
		BufferedOutputStream outputStream = new BufferedOutputStream(fileOutputStream);
		byte[] b = uploadFile.getFileBody().getBytes("UTF-8");
		outputStream.write(b);
		outputStream.close();
		fileOutputStream.close();

	}

	private static String getPath(HttpServletRequest request, FileType fileType, String userId) {
		String path = null;
		switch (fileType) {
		case html:
			path = createDir(request.getServletContext().getRealPath("/htmls") + "\\" + userId);
			break;

		case jsp:
			path = createDir(request.getServletContext().getRealPath("/uploadJsp") + "\\" + userId);
			break;

		default:
			break;
		}
		return path;
	}

	private static String createDir(String path) {
		File dir = new File(path);
		if (!dir.exists()) {
			if (path.endsWith(File.separator)) {
				path = path + File.separator;
			}
			if (dir.mkdirs()) {
				System.out.println("创建目录" + path + "成功！");
			}
		}
		return path;
	}
}
