package com.asiainfo.busi.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.IModelDao;
import com.asiainfo.busi.service.IModeService;

@Service
public class ModelServiceImpl implements IModeService{
	
	@Autowired
	private IModelDao modelDao;

	@Override
	public List<Map<String, Object>> selectByPrimaryKey(String modelName) {
		// TODO Auto-generated method stub
		return modelDao.selectByPrimaryKey(modelName);
	}

	/**
	 * checkModeAttr: 校验
	 *
	 * @return String
	 * @throws 
	 */
	@Override
	public String checkModeAttr(List<Map<String, Object>> list, Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		
		String result = "";
		for (int i = 0; i < list.size(); i++) {
			String attr_cname = (String) list.get(i).get("attr_cname");
			String attr_name = (String) list.get(i).get("attr_name");
			String enable_find = list.get(i).get("enable_find") == null?"":list.get(i).get("enable_find").toString();
			String enable_null = list.get(i).get("enable_null") == null?"1":list.get(i).get("enable_null").toString();
			
			// 空置校验
			if (enable_null.equals("0")) {
				if(paramMap.get(attr_name) == null) {
					result += '"' + attr_cname + '"' + "不能为空，";
				} else {
					// 关键词校验
					if (!enable_null.trim().equals("")) {
						String[] keys = enable_find.split(",");
						for (int j = 0; j < keys.length; j++) {
							if (paramMap.get(attr_name).toString().indexOf(keys[j]) >= 0) {
								result += '"' + attr_cname + '"' + "不能包含关键词" + '"' + keys[j] + '"';
							}
						}
					}
				}
			}
		}
		return result;
	}
	
	/**
	 * formatParamMap: 格式化
	 *
	 * @return String
	 * @throws 
	 */
	@Override
	public Map<String, Object> formatParamMap(List<Map<String, Object>> list, Map<String, Object> paramMap) {
	
		for (int i = 0; i < list.size(); i++) {
			String attr_name = (String) list.get(i).get("attr_name");
			String attr_type = (String) list.get(i).get("attr_type");
			// 如果是时间格式
			if (paramMap.get(attr_name) != null && attr_type.equals("Date")) {
				// 时间格式转换
				try {
					Date date = new SimpleDateFormat("yyyy-MM-dd").parse(paramMap.get(attr_name).toString());
					paramMap.put(attr_name, date);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			// 如果是布尔格式
			if (paramMap.get(attr_name) != null && attr_type.equals("Boolean")) {
				if (paramMap.get(attr_name).equals("1")) {
					paramMap.put(attr_name, true);
				} else {
					paramMap.put(attr_name, false);
				}
			} 
			// 如果是布尔格式
			if (paramMap.get(attr_name) != null && attr_type.equals("Integer")) {
				paramMap.put(attr_name, Integer.parseInt(paramMap.get(attr_name).toString()));
			} 
		}
		return paramMap;
	}
	

}
