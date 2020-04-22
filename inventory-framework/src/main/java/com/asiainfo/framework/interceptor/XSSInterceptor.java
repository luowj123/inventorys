package com.asiainfo.framework.interceptor;

import java.util.Enumeration;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import com.google.common.collect.Lists;

/**
 * 
 * @description xss攻击参数拦截器
 * @author lwj
 * @since JDK1.8
 * @Date 2020 2020年3月25日 下午9:23:21
 */
public class XSSInterceptor implements HandlerInterceptor 
{
	private static List<String> illegalCharList = Lists.newArrayList("script", "alert", "img", "onerror", "cookie", "document", "iframe", "input",
			"title", "bgsound", "link", "javascript", "href", "onload");

	private final String DELIMITERS = " \t\n\r\f():;<>&\\/\"='";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		Enumeration<String> names = request.getParameterNames();
		while (names.hasMoreElements())
		{
			String name = names.nextElement();
			String[] values = request.getParameterValues(name);
			for (String value : values)
			{
				if (!isIllegalCharacter(value.toLowerCase())) {
					continue;
				} else {
					System.out.println(value.toLowerCase() + "：疑是xss攻击");
					return false;
				}
			}
		}
		return true;
	}

	public boolean isIllegalCharacter(String value)
	{
		if (StringUtils.isEmpty(value))
		{
			return false;
		}

		StringTokenizer token = new StringTokenizer(value, DELIMITERS, false);
		String tokenStr = StringUtils.EMPTY;
		while (token.hasMoreTokens())
		{
			tokenStr = StringUtils.lowerCase(StringUtils.trim(token.nextToken()));
			if (illegalCharList.contains(tokenStr))
			{
				return true;
			}
		}
		return false;
	}
}
