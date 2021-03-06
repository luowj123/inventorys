package com.asiainfo.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asiainfo.busi.service.IDatabaseInfoService;
import com.asiainfo.busi.service.IModeService;
import com.asiainfo.common.base.BaseController;
import com.asiainfo.common.entity.AjaxResult;
import com.asiainfo.common.entity.page.TableDataInfo;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/databaseInfo")
public class DatabaseInfoController extends BaseController {

	@Autowired
	private  IDatabaseInfoService databaseInfoService;
	
	@Autowired
	private IModeService modeService;
	
	/**
	 * 主界面分页查询-需求列表
	 * 
	 * @return 需求列表
	 */
	@PostMapping("/selectByPage")
	@ResponseBody
	public TableDataInfo selectByPage() {
		Map<String, Object> param = getFormMap();
		startPage();
		// 数据格式化处理
		param = modeService.formatParamMap(modeService.selectByPrimaryKey("databaseInfo"), param);
		
		List<Map<String, Object>> list = databaseInfoService.selectByPage(param);
		return getDataTable(list);
	}
	
	@PostMapping("/insert")
	@ResponseBody
	public AjaxResult insert(HttpServletRequest request) {
		Map<String, Object> map = getFormMap();
		
		// 从配置库获取模块的字段信息
		if (map.containsKey("model")) {
			List<Map<String, Object>> list = modeService.selectByPrimaryKey((String) map.get("model"));
			
			// 标准校验
			String null_check = modeService.checkModeAttr(list, map);
			if (false && null_check != null && !null_check.trim().equals("")) {
				return returnError(null_check);
			}
			
			// 数据格式化处理
			map = modeService.formatParamMap(list, map);
			
			map.put("createTime", new Date());
			databaseInfoService.insert(map);
			
		} else {
			return returnError("参数异常");
		}
		
		return returnSuccess("保存成功");
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public AjaxResult delete(HttpServletRequest request) {
		Map<String, Object> map = getFormMap();
		
		if (map.containsKey("databaseId")) {
			databaseInfoService.deleteByPrimaryKey(Integer.parseInt(map.get("databaseId").toString()));
		} else {
			return returnError("参数异常");
		}
		
		return returnSuccess("保存成功");
	}
	
}
