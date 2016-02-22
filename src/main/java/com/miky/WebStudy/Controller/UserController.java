package com.miky.WebStudy.Controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miky.WebStudy.Common.MacUtil;
import com.miky.WebStudy.Entity.LoginRecord;
import com.miky.WebStudy.Entity.user;
import com.miky.WebStudy.Service.RecordService;
import com.miky.WebStudy.Service.UserService;

@Controller
public class UserController {

	@Resource
	UserService userService;
	@Resource
	RecordService recordService;

	@RequestMapping(value = "loginByRecord")
	@ResponseBody
	public user loginByRecord() {
		LoginRecord loginRecord = new LoginRecord();
		try {
			loginRecord.setLoginMac(MacUtil.getMacAddress());
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		LoginRecord record = recordService.selectLoginRecordByMac(loginRecord);
		user user = new user();
		if (record != null) {
			user.setUserId(record.getUserId());
		} else {
			user = null;
		}
		return userService.selectUser(user);

	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public user login(@RequestBody user user) {

		user selecteduser = userService.selectUser(user);
		if (selecteduser != null) {
			LoginRecord loginRecord = new LoginRecord();
			try {
				loginRecord.setLoginMac(MacUtil.getMacAddress());
				loginRecord.setUserId(selecteduser.getUserId());
				loginRecord.setUserPassword(selecteduser.getPassword());
				loginRecord.setUserName(selecteduser.getUserName());
				recordService.insertRecord(loginRecord);
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}

		return selecteduser;

	}

	@RequestMapping(value = "register", method = RequestMethod.POST)
	@ResponseBody
	public user register(@RequestBody user user) {
		user oldUser = userService.selectUser(user);
		user newUser = null;
		if (oldUser == null) {
			userService.insertUser(user);
			newUser = userService.selectUser(user);
		}
		return newUser;
	}

}
