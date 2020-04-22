package com.asiainfo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;


/**
 * @ClassName WebApplication
 * @Description 启动类
 * @Author zhaolijun
 * @Date 2019/10/8 22:53
 * @Version 1.0
 **/
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@MapperScan("com.asiainfo.*.dao")
public class WebApplication {
	
    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class);
    }
    
    /*
     * 解决spring boot 1.x和2.x的session编码不一致问题
     * 1.x useBase64Encoding=false
     * 2.x useBase64Encoding=true
     */
	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
		cookieSerializer.setUseBase64Encoding(false);
		return cookieSerializer;
	}
    
}
