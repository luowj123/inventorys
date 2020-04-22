package com.asiainfo.framework.interceptor;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.asiainfo.common.contstants.SystemConstant;
import com.asiainfo.common.entity.AjaxResult;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @ClassName LoginValidInterceptor
 * @Description 登录验证拦截器： 判断用户是否在产品那边登录，redis存放sessionId
 * @Author zhaolijun
 * @Date 2019/10/11 16:39
 * @Version 1.0
 **/
public class LoginValidInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
//		String url = request.getRequestURI();
//		// 对外服务，不做session验证
//		if (url.indexOf("/api/") >= 0 || url.indexOf("/itsm/") >= 0 || url.indexOf("/ai/") >= 0) {
//			return true;
//		}
//
//		HttpSession session = request.getSession(false);
//		System.out.println("========================session start=======================");
//		System.out.println(session.getAttributeNames());
//		if(session != null) {
//			Enumeration<String> names=session.getAttributeNames();
//			while(names.hasMoreElements()) {
//				System.out.println(names.nextElement()+" --> "+session.getAttribute(names.nextElement()));
//			}
//		}
//		System.out.println("========================session end=======================");
//		if (session != null) {
//			Object object = session.getAttribute("sessionUserKey");
//			if (object != null) {
//				return true;
//			}
//		}
//		return false;
		return true;
	}
	
	private void responseError(HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");

		try {
			AjaxResult result = new AjaxResult<>();
			result.setMsg("未登录异常");
			result.setCode(SystemConstant.ERROR_CODE);
			response.getWriter().print(new ObjectMapper().writeValueAsString(result));
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

	protected boolean preHandle(String value) {
		
		// TODO Auto-generated method stub
		return false;
		
	}
}
