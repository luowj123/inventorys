package com.asiainfo.busi.service;

import java.util.List;
import java.util.Map;

import com.asiainfo.busi.entity.DatabaseInfo;

public interface IDimTableService {

	/**
	 * selectByPage: 分页查询
	 *
	 * @return List<DatabaseInfo>
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPage(Map<String, Object> param);
	
	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return DatabaseInfo
	 * @throws 
	 */
	public DatabaseInfo selectByPrimaryKey(Integer databaseId);
	
	/**
	 * insert:新增
	 *
	 * @return int
	 * @throws 
	 */
    int insert(Map<String, Object> map);
    
	/**
	 * delete:删除
	 *
	 * @return int
	 * @throws 
	 */
    int deleteByPrimaryKey(Integer databaseId);
    
}
