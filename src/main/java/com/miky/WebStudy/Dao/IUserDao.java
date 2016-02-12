package com.miky.WebStudy.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.miky.WebStudy.Entity.User;

@Repository
public interface IUserDao {

	public List<User> selectAll();
	
}
