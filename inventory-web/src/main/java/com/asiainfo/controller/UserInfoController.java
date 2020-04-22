package com.asiainfo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.asiainfo.busi.service.IUserInfoService;
import com.asiainfo.common.base.BaseController;
import com.asiainfo.common.entity.page.TableDataInfo;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/userInfo")
public class UserInfoController extends BaseController {

	@Autowired
	private  IUserInfoService userInfoService;
	
	/**
	 * 主界面分页查询-需求列表
	 * 
	 * @return 需求列表
	 */
	@GetMapping("/findRequiresByPage")
	@ResponseBody
	public TableDataInfo findUserInfoByPage() {
		Map<String, Object> param = getFormMap();
		startPage();
		List<Map<String, Object>> list = userInfoService.selectByPage(param);
		return getDataTable(list);
	}
}
