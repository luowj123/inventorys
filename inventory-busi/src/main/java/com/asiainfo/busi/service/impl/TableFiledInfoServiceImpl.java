package com.asiainfo.busi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.ITableFiledInfoDao;
import com.asiainfo.busi.entity.TableFiledInfo;
import com.asiainfo.busi.service.ITableFiledInfoService;

@Service
public class TableFiledInfoServiceImpl implements ITableFiledInfoService {

	@Autowired
	private ITableFiledInfoDao tableFiledInfoDao;
	
	@Override
	public List<Map<String, Object>> selectByPage(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return tableFiledInfoDao.selectByPage(param);
	}

	@Override
	public TableFiledInfo selectByPrimaryKey(Integer fieldId) {
		// TODO Auto-generated method stub
		return tableFiledInfoDao.selectByPrimaryKey(fieldId);
	}

	@Override
	public int insert(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return tableFiledInfoDao.insert(map);
	}
	
	@Override
	public void insertList(List<Map<String, Object>> list) {
		tableFiledInfoDao.insert(list);
	}

	@Override
	public int deleteByPrimaryKey(Integer fieldId) {
		// TODO Auto-generated method stub
		return tableFiledInfoDao.deleteByPrimaryKey(fieldId);
	}

}
