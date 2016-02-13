package com.miky.WebStudy.Service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Dao.userMapper;
import com.miky.WebStudy.Entity.user;

@Service
public class UserService {

	@Resource
	userMapper dao;

	public user selectUserByName(String userName) {
		return dao.selectByUserName(userName);
	}

	public int insertUser(user user) {
		return dao.insert(user);
	}
}
