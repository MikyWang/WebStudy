package com.miky.WebStudy.Service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.miky.WebStudy.Dao.sysFileMapper;
import com.miky.WebStudy.Entity.sysFile;
import com.miky.WebStudy.Entity.sysFileKey;

@Service
public class sysFileService {

	@Resource
	sysFileMapper dao;

	public sysFile getSysFile(sysFileKey sysFileKey) {

		return dao.selectByPrimaryKey(sysFileKey);
	}

}
