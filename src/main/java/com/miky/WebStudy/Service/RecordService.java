package com.miky.WebStudy.Service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Dao.LoginRecordMapper;
import com.miky.WebStudy.Entity.LoginRecord;

@Service
public class RecordService {

	@Resource
	LoginRecordMapper dao;

	public LoginRecord selectLoginRecordByMac(LoginRecord loginRecord) {
		return dao.selectByPrimaryKey(loginRecord);
	}

	public void insertRecord(LoginRecord loginRecord) {
		dao.insertSelective(loginRecord);
	}
}
