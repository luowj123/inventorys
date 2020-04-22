package com.asiainfo.framework.interceptor;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import com.google.common.collect.Lists;

/**
 * 
 * @description 防止SQL注入拦截器
 * @author lwj
 * @since JDK1.8
 * @Date 2020 2020年3月25日 下午9:23:21
 */
public class SqlInjectInterceptor implements HandlerInterceptor
{
	private List<String> sqlKeywordList = Lists.newArrayList("and", "or", "select", "update", "delete", "drop", "truncate");
	private List<String> specialStrList = Lists.newArrayList("(", ")");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
//		Enumeration<String> names = request.getParameterNames();
//		while (names.hasMoreElements())
//		{
//			String name = names.nextElement();
//			String[] values = request.getParameterValues(name);
//			for (String value : values)
//			{
//				if (!isIllegalCharacter(value.toLowerCase())) {
//					continue;
//				} else {
//					System.out.println(value.toLowerCase() + "：疑是SQL注入攻击");
//					return false;
//				}
//			}
//		}
//		return true;
        Map rm = request.getParameterMap();
        Iterator iterator = rm.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry) iterator.next();
            Object key = entry.getKey();
            String[] value = (String[]) entry.getValue();
            if (value != null && value.length > 0) {
                for (int i = 0, m = value.length; i < m; i++) {
                    if (sqlValidate(value[i])) {
//                        response.setContentType("text/html;charset=UTF-8");
//                        response.getWriter().write("存在非法字符串！");
                    	System.out.println("疑是SQL注入攻击");
                        return false;
                    }
                }
            }
        }
		return true;
	}
	
    // 效验
    protected static boolean sqlValidate(String str) {
        str = str.toLowerCase();// 统一转为小写
        str.replaceAll("--","——");
        str.replaceAll("'","’");
        String badStr = "'|or |exec|execute|insert|select|delete|update|master|truncate|javascript|count(*)|"
                + "declare|create|grant|script|iframe";// 过滤掉的sql关键字，可以手动添加
        String[] badStrs = badStr.split("\\|");
        for (int i = 0; i < badStrs.length; i++) {
            if (str.indexOf(badStrs[i].toLowerCase()) >= 0) {
                return true;
            }
        }
        return false;
    }
	
	/**
	 * 判断参数是否含有攻击串
	 * 
	 * @param value
	 * @return
	 */
	public boolean isIllegalCharacter(String value)
	{
		if (StringUtils.isEmpty(value))
		{
			return false;
		}

		List<String> values = Lists.newArrayList(value.split("\\s+"));
		for (String val : values)
		{
			if (sqlKeywordList.contains(val) || containSpecialStr(val))
			{
				return true;
			}
		}
		return false;
	}

	private boolean containSpecialStr(String val)
	{
		for (String specialStr : specialStrList)
		{
			if (val.indexOf(specialStr) != -1)
			{
				return true;
			}
		}
		return false;
	}
}