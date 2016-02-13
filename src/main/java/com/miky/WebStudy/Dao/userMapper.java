package com.miky.WebStudy.Dao;

import com.miky.WebStudy.Entity.user;

public interface userMapper {
    int deleteByPrimaryKey(String userId);

    int insert(user record);

    int insertSelective(user record);

    user selectByPrimaryKey(String userId);
    
    user selectByUserName(String userName);

    int updateByPrimaryKeySelective(user record);

    int updateByPrimaryKey(user record);
}