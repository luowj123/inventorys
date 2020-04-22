package com.asiainfo.busi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.ITableInfoDao;
import com.asiainfo.busi.entity.TableInfo;
import com.asiainfo.busi.service.ITableInfoService;

@Service
public class TableInfoServiceImpl implements ITableInfoService {

	@Autowired
	private ITableInfoDao tableInfoDao;
	
	@Override
	public List<Map<String, Object>> selectByPage(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return tableInfoDao.selectByPage(param);
	}

	@Override
	public TableInfo selectByPrimaryKey(Integer tableId) {
		// TODO Auto-generated method stub
		return tableInfoDao.selectByPrimaryKey(tableId);
	}

	@Override
	public int insert(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return tableInfoDao.insert(map);
	}
	
	@Override
	public void insertList(List<Map<String, Object>> list) {
		tableInfoDao.insert(list);
	}

	@Override
	public int deleteByPrimaryKey(Integer tableId) {
		// TODO Auto-generated method stub
		return tableInfoDao.deleteByPrimaryKey(tableId);
	}

}
