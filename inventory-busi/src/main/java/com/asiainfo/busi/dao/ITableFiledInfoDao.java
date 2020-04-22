package com.asiainfo.busi.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.asiainfo.busi.entity.TableFiledInfo;

@Repository
public interface ITableFiledInfoDao {

	/**
	 * selectByPage: 分页查询
	 *
	 * @return List<TableFiledInfo>
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPage(Map<String, Object> param);
	
	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return TableFiledInfo
	 * @throws 
	 */
	public TableFiledInfo selectByPrimaryKey(@Param("fieldId") Integer fieldId);
	
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
	public void insert(List<Map<String, Object>> list);
    
	/**
	 * delete:删除
	 *
	 * @return int
	 * @throws 
	 */
    int deleteByPrimaryKey(@Param("fieldId") Integer fieldId);
    
}
