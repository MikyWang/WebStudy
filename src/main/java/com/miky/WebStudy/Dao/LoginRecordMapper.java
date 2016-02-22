package com.miky.WebStudy.Dao;

import org.springframework.stereotype.Repository;

import com.miky.WebStudy.Entity.LoginRecord;
import com.miky.WebStudy.Entity.LoginRecordKey;

@Repository
public interface LoginRecordMapper {
    int deleteByPrimaryKey(LoginRecordKey key);

    int insert(LoginRecord record);

    int insertSelective(LoginRecord record);

    LoginRecord selectByPrimaryKey(LoginRecordKey key);

    int updateByPrimaryKeySelective(LoginRecord record);

    int updateByPrimaryKey(LoginRecord record);
}