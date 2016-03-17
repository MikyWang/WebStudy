package com.miky.WebStudy.Entity;

import com.miky.WebStudy.Common.FileHelper.FileType;

public class UploadFile {

	private String fileName;

	private String fileBody;
	
	private FileType fileType;


	public FileType getFileType() {
		return fileType;
	}

	public void setFileType(FileType fileType) {
		this.fileType = fileType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileBody() {
		return fileBody;
	}

	public void setFileBody(String fileBody) {
		this.fileBody = fileBody;
	}

}
