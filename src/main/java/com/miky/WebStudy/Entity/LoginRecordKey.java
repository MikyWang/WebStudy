package com.miky.WebStudy.Entity;

public class LoginRecordKey {
    private String loginMac;

    private String userId;

    public String getLoginMac() {
        return loginMac;
    }

    public void setLoginMac(String loginMac) {
        this.loginMac = loginMac == null ? null : loginMac.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
}