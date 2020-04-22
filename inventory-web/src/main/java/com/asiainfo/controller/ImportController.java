package com.asiainfo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.asiainfo.busi.service.ImportService;
import com.asiainfo.common.base.BaseController;
import com.asiainfo.common.entity.AjaxResult;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/Import")
public class ImportController extends BaseController  {

	@Autowired
	private ImportService importService;
	
	/**
	 * exImport: 文件导入
	 * 
	 * @param file Excel文件
	 * @param sceneId 业务场景ID
	 * @return String
	 * @throws 
	 * @since  JDK1.7
	 */
	@PostMapping("/exImport")
	@ResponseBody
	public AjaxResult exImport(@RequestParam(value = "file") MultipartFile file) {
		
//		Map<String, Object> map = getFormMap();
		
//		if (map.containsKey("model")) {
		if (true) {
			try {
//				importService.batchImport(file, (String) map.get("model"));
				importService.batchImport(file, "systemInfo");
			} catch (Exception e) {
				e.printStackTrace();
				return returnError("导入失败：导入数据异常");
			}		
		} else {
			return returnError("导入失败：参数异常");
		}
		
		return returnSuccess("导入成功");
	}
	
}
