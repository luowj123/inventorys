package com.asiainfo.framework.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * @ClassName RedisSessionConfig
 * @Description redis缓存session配置
 * @Author zhaolijun
 * @Date 2019/10/14 11:03
 * @Version 1.0
 **/
@EnableRedisHttpSession//session过期时间(秒)
@Configuration
public class RedisSessionConfig {
	
    @Bean
    public static ConfigureRedisAction configureRedisAction()
    {
    	System.out.println("redis start");
        //让springSession不再执行config命令
        return ConfigureRedisAction.NO_OP;
    }
}
