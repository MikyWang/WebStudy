package com.miky.WebStudy.Controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.catalina.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public user loginByRecord(HttpSession session) {
		user user = (user) session.getAttribute("user");
		if (user != null) {
			return userService.selectUser(user);
		} else {
			return null;
		}

	}

	@RequestMapping(value = "logout.do")
	@ResponseBody
	public void logout(HttpSession session) {
		if (session.getAttribute("user") != null) {
			session.removeAttribute("user");
		}
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public user login(@RequestBody user user, HttpSession session) {

		user selecteduser = userService.selectUser(user);
		if (selecteduser != null) {
			try {
				session.setAttribute("user", selecteduser);
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
