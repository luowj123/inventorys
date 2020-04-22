package com.asiainfo.busi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.IUserInfoDao;
import com.asiainfo.busi.entity.UserInfo;
import com.asiainfo.busi.service.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService{
	
	@Autowired
	private IUserInfoDao userInfoDao;

	@Override
	public List<Map<String, Object>> selectByPage(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userInfoDao.selectByPage(param);
	}

	@Override
	public UserInfo selectById(String userId) {
		// TODO Auto-generated method stub
		return userInfoDao.selectById(userId);
	}

	@Override
	public int insert(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userInfoDao.insert(userInfo);
	}

	@Override
	public int update(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userInfoDao.update(userInfo);
	}

	@Override
	public int delete(UserInfo userInfo) {
		// TODO Auto-generated method stub
		return userInfoDao.delete(userInfo);
	}

}
