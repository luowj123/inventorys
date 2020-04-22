package com.asiainfo.common.base;

import com.alibaba.fastjson.JSONObject;
import com.asiainfo.common.contstants.SystemConstant;
import com.asiainfo.common.entity.AjaxResult;
import com.asiainfo.common.entity.page.PageDomain;
import com.asiainfo.common.entity.page.TableDataInfo;
import com.asiainfo.common.entity.page.TableSupport;
import com.asiainfo.common.utils.ServletUtils;
import com.asiainfo.common.utils.SqlUtil;
import com.asiainfo.common.utils.StringUtils;
import com.asiainfo.common.utils.text.Convert;
import com.baseutil.model.User;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName BaseController
 * @Description 基本控制层
 * @Author zhaolijun
 * @Date 2019/10/10 15:27
 * @Version 1.0
 **/
public class BaseController {

    /**
     * 获取request
     */
    public HttpServletRequest getRequest()
    {
        return ServletUtils.getRequest();
    }


    /**
     * 获取session
     */
    public HttpSession getSession()
    {
        return ServletUtils.getSession();
    }

    /**
     * 获取session
     */
    public String getUserId()
    {
    	HttpSession session = getSession();
    	User user = (User) session.getAttribute("sessionUserKey");
//        return "luowenjun";
    	/* 资产管理平台调用接口时，获取不到session值
    	* 后期优化，让产品传用户账号
    	*/
    	if(user == null || user.getUserAccount() == null) {
    		return "luowenjun";
    	}
    	return user.getUserAccount();
//        return Convert.toStr(getSession().getAttribute("loginUserId"));
    }

    /**
     * 获取表单参数
     * @return 表单参数
     */
    public Map<String,Object> getFormMap(){
        Map<String, Object> paramMap = parseRequest(ServletUtils.getRequest());
        return paramMap;
    }
    
    public Map<String, Object> getHttpMap(){
    	Map<String, Object> paramMap = new HashMap<String, Object>();
    	try{
    	BufferedReader br = null;
		StringBuilder sb = new StringBuilder("");
		br = ServletUtils.getRequest().getReader();
		String str;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		br.close();
		paramMap = JSONObject.parseObject(sb.toString(), Map.class);
    	}catch (Exception e) {
			// TODO: handle exception
		}
		return paramMap;
    }

    /**
     * 响应请求分页数据
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected TableDataInfo getDataTable(List<?> list)
    {
    	TableDataInfo rspData = new TableDataInfo();
    	if (list == null) {
    		return rspData;
    	}
        rspData.setCode(0);
        rspData.setRows(list);
        rspData.setTotal(new PageInfo(list).getTotal());
        return rspData;
    }

    /**
     * 设置请求分页数据
     */
    protected void startPage()
    {
        Map<String, Object> paramMap = parseRequest(ServletUtils.getRequest());
        PageDomain pageDomain = TableSupport.buildPageRequest();
        Integer pageNum = pageDomain.getPageNum();
        Integer pageSize = pageDomain.getPageSize();
        if (StringUtils.isNotNull(pageNum) && StringUtils.isNotNull(pageSize))
        {
            String orderBy = SqlUtil.escapeOrderBySql(pageDomain.getOrderBy());
            PageHelper.startPage(pageNum, pageSize, orderBy);
        }
    }
    /**
     * 解析request里面的参数为Map
     * @param request 请求
     * @return 解析后的map
     */
    private static Map<String,Object> parseRequest(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String,Object>();
        Enumeration en = request.getParameterNames();
        while(en.hasMoreElements()){
            String name=(String)en.nextElement();
            String [] values= request.getParameterValues(name);
            if(!name.contains("[]")){
                if(!"".equals(values[0])) {
                    map.put(name, values[0]);
                }
            }else {
                map.put(name.replace("[]", ""), values);
            }
        }
        return map;
    }

    /**
     * 返回成功信息
     * @param data 数据
     * @return 结果对象
     */
    public  <T> AjaxResult<T> returnSuccess(T data){
        return new AjaxResult<T>().setCode(SystemConstant.SUCCESS_CODE).setData(data);
    }

    /**
     *  返回成功信息
     * @param data 数据
     * @param msg 描述信息
     * @return 结果对象
     */
    public static <T> AjaxResult returnSuccess(T data,String msg){
        return new AjaxResult<T>().setCode(SystemConstant.SUCCESS_CODE).setData(data).setMsg(msg);
    }

    /**
     *  返回成功信息
     * @param msg 描述信息
     * @return 结果对象
     */
    public static AjaxResult returnSuccess(String msg){
        return new AjaxResult().setCode(SystemConstant.SUCCESS_CODE).setMsg(msg);
    }

    /**
     * 返回错误信息结果
     * @param data 错误实体
     * @return 结果对象
     */
    public static <T> AjaxResult returnError(T data){
        return new AjaxResult<T>().setCode(SystemConstant.ERROR_CODE).setData(data);
    }

    /**
     * 返回错误信息结果
     * @param msg 错误信息
     * @return 结果对象
     */
    public  static AjaxResult returnError(String msg){
        return new AjaxResult().setCode(SystemConstant.ERROR_CODE).setMsg(msg);
    }
}
