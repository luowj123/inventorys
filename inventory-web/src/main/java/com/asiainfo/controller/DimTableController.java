package com.asiainfo.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asiainfo.busi.service.IDimTableService;
import com.asiainfo.busi.service.IModeService;
import com.asiainfo.common.base.BaseController;
import com.asiainfo.common.entity.AjaxResult;
import com.asiainfo.common.entity.page.TableDataInfo;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/dimTable")
public class DimTableController extends BaseController {

	@Autowired
	private  IDimTableService dimTableService;
	
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
		param = modeService.formatParamMap(modeService.selectByPrimaryKey("dimTable"), param);
		
//		param.put("pid", -1);
		List<Map<String, Object>> list = dimTableService.selectByPage(param);
		return getDataTable(list);
	}
	
	@PostMapping("/insert")
	@ResponseBody
	public AjaxResult insert(HttpServletRequest request) {
		Map<String, Object> map = getFormMap();
		List<Map<String, Object>> list = modeService.selectByPrimaryKey("dimTable");
		// 数据格式化处理
		map = modeService.formatParamMap(list, map);
		
		dimTableService.insert(map);
		return returnSuccess("保存成功");
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public AjaxResult delete(HttpServletRequest request) {
		Map<String, Object> map = getFormMap();
		
		if (map.containsKey("id")) {
			dimTableService.deleteByPrimaryKey(Integer.parseInt(map.get("id").toString()));
		} else {
			return returnError("参数异常");
		}
		
		return returnSuccess("保存成功");
	}
}
