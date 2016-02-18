package com.miky.WebStudy.Dao;

import org.springframework.stereotype.Repository;

import com.miky.WebStudy.Entity.user;
import com.miky.WebStudy.Entity.userKey;

@Repository
public interface userMapper {
    int deleteByPrimaryKey(userKey key);

    int insert(user record);

    int insertSelective(user record);

    user selectByPrimaryKey(userKey key);

    int updateByPrimaryKeySelective(user record);

    int updateByPrimaryKey(user record);
}