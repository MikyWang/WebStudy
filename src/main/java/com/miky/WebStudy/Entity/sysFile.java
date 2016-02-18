package com.miky.WebStudy.Entity;

public class sysFile extends sysFileKey {
    private String fileBody;

    public String getFileBody() {
        return fileBody;
    }

    public void setFileBody(String fileBody) {
        this.fileBody = fileBody == null ? null : fileBody.trim();
    }
}