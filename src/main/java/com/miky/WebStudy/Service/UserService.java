package com.miky.WebStudy.Service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Dao.userMapper;
import com.miky.WebStudy.Entity.user;
import com.miky.WebStudy.Entity.userKey;

@Service
public class UserService {

	@Resource
	userMapper dao;

	public user selectUser(userKey user) {
		return dao.selectByPrimaryKey(user);
	}

	public int insertUser(user user) {
		return dao.insertSelective(user);
	}
}
