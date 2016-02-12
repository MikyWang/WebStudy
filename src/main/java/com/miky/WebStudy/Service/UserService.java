package com.miky.WebStudy.Service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Dao.IUserDao;
import com.miky.WebStudy.Entity.User;

@Service
public class UserService {

	@Resource
	IUserDao dao;

	public List<User> selectAllUsers() {
		return dao.selectAll();
	}

}
