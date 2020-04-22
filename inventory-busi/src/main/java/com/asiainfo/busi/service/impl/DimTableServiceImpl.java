package com.asiainfo.busi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.IDimTableDao;
import com.asiainfo.busi.entity.DatabaseInfo;
import com.asiainfo.busi.service.IDimTableService;

@Service
public class DimTableServiceImpl implements IDimTableService {

	@Autowired
	private IDimTableDao baseDataManagerDao;
	
	@Override
	public List<Map<String, Object>> selectByPage(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return baseDataManagerDao.selectByPage(param);
	}

	@Override
	public DatabaseInfo selectByPrimaryKey(Integer databaseId) {
		// TODO Auto-generated method stub
		return baseDataManagerDao.selectByPrimaryKey(databaseId);
	}

	@Override
	public int insert(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return baseDataManagerDao.insert(map);
	}
	
	@Override
	public int deleteByPrimaryKey(Integer databaseId) {
		// TODO Auto-generated method stub
		return baseDataManagerDao.deleteByPrimaryKey(databaseId);
	}

}
