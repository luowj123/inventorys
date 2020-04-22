package com.asiainfo.busi.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IModelDao {

	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return FileInfo
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPrimaryKey(@Param("modelName") String modelName);
	
}
