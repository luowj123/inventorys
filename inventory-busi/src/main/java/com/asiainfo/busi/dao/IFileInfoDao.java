package com.asiainfo.busi.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.asiainfo.busi.entity.FileInfo;

@Repository
public interface IFileInfoDao {

	/**
	 * selectByPage: 分页查询
	 *
	 * @return List<FileInfo>
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPage(Map<String, Object> param);
	
	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return FileInfo
	 * @throws 
	 */
	public FileInfo selectByPrimaryKey(@Param("fileId") Integer fileId);
	
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
    int deleteByPrimaryKey(@Param("fileId") Integer fileId);

    /**
	 * insertList:批量新增
	 *
	 * @throws 
	 */
	public void insertList(List<Map<String, Object>> list0);
    
}
