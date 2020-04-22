package com.asiainfo.busi.service;

import java.util.List;
import java.util.Map;

import com.asiainfo.busi.entity.UserInfo;

public interface IUserInfoService {

	/**
	 * selectByPage: 分页查询
	 *
	 * @return List<UserInfo>
	 * @throws 
	 * @since  JDK1.7
	 */
	public List<Map<String, Object>> selectByPage(Map<String, Object> param);
	
	/**
	 * selectById: 根据ID查询
	 *
	 * @return UserInfo
	 * @throws 
	 * @since  JDK1.7
	 */
	public UserInfo selectById(String userId);
	
	/**
	 * insert:新增
	 *
	 * @return int
	 * @throws 
	 * @since  JDK1.7
	 */
    int insert(UserInfo userInfo);
    
	/**
	 * update:修改
	 *
	 * @return int
	 * @throws 
	 * @since  JDK1.7
	 */
    int update(UserInfo userInfo);
    
	/**
	 * delete:删除
	 *
	 * @return int
	 * @throws 
	 * @since  JDK1.7
	 */
    int delete(UserInfo userInfo);
    
}
