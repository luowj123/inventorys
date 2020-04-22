package com.asiainfo.busi.service;

import java.util.List;
import java.util.Map;

import com.asiainfo.busi.entity.IntroductionInfo;

public interface IIntroductionInfoService {

	/**
	 * selectByPage: 分页查询
	 *
	 * @return List<IntroductionInfo>
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPage(Map<String, Object> param);
	
	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return IntroductionInfo
	 * @throws 
	 */
	public IntroductionInfo selectByPrimaryKey(Integer intId);
	
	/**
	 * insert:新增
	 *
	 * @return int
	 * @throws 
	 */
    int insert(Map<String, Object> map);
    
    /**
	 * insert:批量新增
	 *
	 * @throws 
	 */
	public void insertList(List<Map<String, Object>> list);
    
	/**
	 * delete:删除
	 *
	 * @return int
	 * @throws 
	 */
    int deleteByPrimaryKey(Integer intId);
    
}
