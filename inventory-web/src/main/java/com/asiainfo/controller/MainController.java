package com.asiainfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.asiainfo.common.base.BaseController;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequestMapping("/main")
public class MainController extends BaseController {

    /**
     * 跳转首页
     * @param modelMap
     * @return
     */
    @GetMapping("/index")
    public String toIndexPage(ModelMap modelMap) {
        return "index";
    }

    /**
     * 跳转主框架页面
     * @param modelMap
     * @return
     */
    @GetMapping("/home")
    public String toMainIframePage(ModelMap modelMap) {
        return "main";
    }
    
    /**
     * 跳转系统管理页
     * @param modelMap
     * @return
     */
    @GetMapping("/sysManage")
    public String toSysManagePage(ModelMap modelMap) {
        return "manage/sysManage";
    }
    
    /**
     * 跳转批量导入
     * @param modelMap
     * @return
     */
    @GetMapping("/batchImport")
    public String toBatchImportPage(ModelMap modelMap) {
        return "manage/batchImport";
    }

    /**
     * 跳转手工录入
     * @param modelMap
     * @return
     */
    @GetMapping("/entering")
    public String toEnteringPage(ModelMap modelMap) {
        return "manage/entering";
    }
    
    /**
     * 跳转数据库管理
     * @param modelMap
     * @return
     */
    @GetMapping("/databaseManage")
    public String toDatabaseManagePage(ModelMap modelMap) {
        return "manage/databaseManage";
    }
    
    /**
     * 跳转表管理
     * @param modelMap
     * @return
     */
    @GetMapping("/tableManage")
    public String toTableManagePage(ModelMap modelMap) {
        return "manage/tableManage";
    }
    
    /**
     * 跳转字段管理
     * @param modelMap
     * @return
     */
    @GetMapping("/tableFiledManage")
    public String toTableFiledManagePage(ModelMap modelMap) {
        return "manage/tableFiledManage";
    }
    
    /**
     * 跳转文件管理
     * @param modelMap
     * @return
     */
    @GetMapping("/fileManage")
    public String toFileManagePage(ModelMap modelMap) {
        return "manage/fileManage";
    }

    /**
     * 跳转接口管理
     * @param modelMap
     * @return
     */
    @GetMapping("/introductionManage")
    public String toIntroductionManagePage(ModelMap modelMap) {
        return "manage/introductionManage";
    }

    /**
     * 跳转外部数据管理
     * @param modelMap
     * @return
     */
    @GetMapping("/extraDataManage")
    public String toExtraDataManagePage(ModelMap modelMap) {
        return "manage/extraDataManage";
    }
    
    /**
     * 跳转维度管理
     * @param modelMap
     * @return
     */
    @GetMapping("/dimTable")
    public String toDimTablePage(ModelMap modelMap) {
        return "manage/dimTable";
    }
    
    /**
     * 跳转归属系统弹框页
     * @param modelMap
     * @return
     */
    @GetMapping("/searchSystem")
    public String toSearchSystemPage(ModelMap modelMap) {
        return "manage/searchSystem";
    }
}
