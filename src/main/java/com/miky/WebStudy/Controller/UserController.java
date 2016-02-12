package com.miky.WebStudy.Controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.miky.WebStudy.Entity.User;
import com.miky.WebStudy.Service.UserService;

@Controller
public class UserController {

	@Resource
	UserService userService;

	@RequestMapping(value = "index")
	public String selectUsers() {

		List<User> users = userService.selectAllUsers();

		for (User user : users) {
			System.out.println(user.toString());
		}

		return "index";
	}

}
