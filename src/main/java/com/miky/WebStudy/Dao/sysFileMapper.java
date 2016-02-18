package com.miky.WebStudy.Dao;

import org.springframework.stereotype.Repository;

import com.miky.WebStudy.Entity.sysFile;
import com.miky.WebStudy.Entity.sysFileKey;

@Repository
public interface sysFileMapper {
    int deleteByPrimaryKey(sysFileKey key);

    int insert(sysFile record);

    int insertSelective(sysFile record);

    sysFile selectByPrimaryKey(sysFileKey key);

    int updateByPrimaryKeySelective(sysFile record);

    int updateByPrimaryKeyWithBLOBs(sysFile record);
}