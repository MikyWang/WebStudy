package com.miky.WebStudy.Controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miky.WebStudy.Entity.user;
import com.miky.WebStudy.Service.UserService;

@Controller
public class UserController {

	@Resource
	UserService userService;

	@RequestMapping(value = "login")
	@ResponseBody
	public user login(@RequestBody user user) {

		user selecteduser = userService.selectUser(user);

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
