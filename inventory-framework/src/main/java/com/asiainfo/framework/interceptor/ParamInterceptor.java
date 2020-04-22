package com.asiainfo.framework.interceptor;

import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.assertj.core.util.Lists;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * @description 前台参数拦截器
 * @author [qiaoyu]
 * @version [版本号,2018年10月30日]
 * @see [相关类/方法]
 * @since [产品/模块版本]
 */
public abstract class ParamInterceptor implements HandlerInterceptor
{
	private List<String> excludeUrls = Lists.newArrayList("/portal/knowledge");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object paramObject) throws Exception
	{
		String requestURI = request.getRequestURI();
		for (String excludeUrl : excludeUrls)
		{
			if (StringUtils.startsWith(requestURI, excludeUrl))
			{
				return true;
			}
		}

		Enumeration<String> names = request.getParameterNames();
		while (names.hasMoreElements())
		{
			String name = names.nextElement();
			String[] values = request.getParameterValues(name);
			for (String value : values)
			{
				if (isIllegalCharacter(value.toLowerCase()))
				{
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					response.setContentType("application/json; charset=utf-8");

//					PageJson pageJson = new PageJson();
//					pageJson.setReturnFlag(false);
//					pageJson.setReturnMsg("非法参数:" + value);

					PrintWriter out = response.getWriter();
//					out.print(JSON.toJSONString(pageJson));
					out.flush();
					out.close();
					return false;
				}
			}
		}
		return true;
	}

	protected abstract boolean isIllegalCharacter(String value);

	@Override
	public void postHandle(HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse, Object paramObject,
			ModelAndView paramModelAndView) throws Exception
	{
	}

	@Override
	public void afterCompletion(HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse, Object paramObject,
			Exception paramException) throws Exception
	{
	}
}
