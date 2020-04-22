package com.asiainfo.busi.service;

import java.util.List;
import java.util.Map;

public interface IModeService {

	/**
	 * selectByPrimaryKey: 根据主键查询
	 *
	 * @return List<Map<String, Object>>
	 * @throws 
	 */
	public List<Map<String, Object>> selectByPrimaryKey(String modelName);
	
	/**
	 * checkModeAttr: 校验
	 *
	 * @return String
	 * @throws 
	 */
	public String checkModeAttr(List<Map<String, Object>> list,Map<String, Object> paramMap);
	
	/**
	 * formatParamMap: 格式化
	 *
	 * @return String
	 * @throws 
	 */
	public Map<String, Object> formatParamMap(List<Map<String, Object>> list, Map<String, Object> paramMap);
}
