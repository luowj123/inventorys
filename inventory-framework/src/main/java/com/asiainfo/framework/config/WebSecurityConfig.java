package com.asiainfo.framework.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.asiainfo.framework.interceptor.CsrfInterceptor;
import com.asiainfo.framework.interceptor.LoginValidInterceptor;
//import com.asiainfo.framework.interceptor.ParamInterceptor;
import com.asiainfo.framework.interceptor.SqlInjectInterceptor;
import com.asiainfo.framework.interceptor.XSSInterceptor;

/**
 * @ClassName WebSecurityConfig
 * @Description 注册拦截器：登录验证拦截器
 * @Author zhaolijun
 * @Date 2019/10/11 16:45
 * @Version 1.0
 **/
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
//                        .allowedOrigins("*")
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "DELETE", "PUT","PATCH")
                        .maxAge(3600);
            }
        };
    }

    @Bean
    public LoginValidInterceptor getLoginValidInterceptor() {
        return new LoginValidInterceptor();
    }
    
    @Bean
    public SqlInjectInterceptor getSqlInjectInterceptor() {
        return new SqlInjectInterceptor();
    }
    
    @Bean
    public XSSInterceptor getXSSInterceptor() {
        return new XSSInterceptor();
    }
    
    @Bean
    public CsrfInterceptor getCsrfInterceptor() {
        return new CsrfInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry)

    {
//        registry.addInterceptor(getLoginValidInterceptor());
//        registry.addInterceptor(getCsrfInterceptor());
//        registry.addInterceptor(getSqlInjectInterceptor());
//        registry.addInterceptor(getXSSInterceptor());
    }
    
}
