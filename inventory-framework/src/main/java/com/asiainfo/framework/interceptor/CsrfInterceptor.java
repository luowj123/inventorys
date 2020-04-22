/**
 * CsrfInterceptor.java
 * com.asiainfo.framework.interceptor
 * 2020年3月25日 LWJ
 *
 * Copyright (c) 2020, TNT All Rights Reserved.
*/

package com.asiainfo.framework.interceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * ClassName:CsrfInterceptor Function: TODO Csrf跨域访问拦截器
 *
 * @author lwj
 * @since JDK1.8
 * @Date 2020 2020年3月25日 下午9:23:21
 */
public class CsrfInterceptor extends HandlerInterceptorAdapter {

	private static final String	WEBHTTP_DEV = "http://localhost:8082";
	private static final String	WEBHTTP_PRO = "http://10.251.80.202:8082";
	private static final String	WEBHTTP_ASSET = "http://10.251.80.202:16666";
	private static final String	WEBHTTP_FACTORY = "http://10.251.80.202:16665";
	private static final String	WEBHTTP_RESULT = "http://10.251.80.202:18181";
	

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		/** 解决跨站点请求 **/
		if (csrfJudge(request)) {
			request.getSession().invalidate();
			Cookie[] cookies = request.getCookies();
			if (null != cookies && cookies.length > 0) {
				Cookie cookie = cookies[0];
				cookie.setMaxAge(0);
			}
			return false;
		}
		return true;
	}

	private boolean csrfJudge(HttpServletRequest request) {
		boolean isCsrf = false;
		String reqUrl = request.getRequestURL().toString();
		StringBuffer str = new StringBuffer();
		str.append(request.getServerName());
		String url = str.toString();
		String referer = request.getHeader("referer");
		String xreq = request.getHeader("X-Requested-With");
		// 判断referer是不是为空
		if (null != referer) {
			// referer不为空，判断referer和当前请求是否同站点
			if (referer.startsWith(WEBHTTP_DEV) || referer.startsWith(WEBHTTP_PRO)
					|| referer.startsWith(WEBHTTP_ASSET) || referer.startsWith(WEBHTTP_RESULT)
					|| referer.startsWith(WEBHTTP_FACTORY)){
				isCsrf = false;
			} else {
				// 不同站点--跨站请求
				isCsrf = true;
				System.out.println(referer + "：疑是CSRF--跨站请求伪造");
			}
		}
		return isCsrf;
	}
}
