package com.asiainfo.framework.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.asiainfo.framework.config.properties.DruidProperties;
import com.asiainfo.framework.constant.DataSourceType;
import com.asiainfo.framework.datasource.DynamicDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * druid 配置多数据源
 * 
 * @author zhaolijun
 */
@Configuration
@EnableConfigurationProperties
public class DruidConfig {
	
	@Bean
	@Primary
	@ConfigurationProperties(prefix = "spring.datasource.druid")
	public DruidProperties dataSourceDruidProperties() {
		return new DruidProperties();
	}

//	@Bean
//	@ConfigurationProperties(prefix = "spring.datasource2.druid")
//	public DruidProperties dataSourceDruidProperties2() {
//		return new DruidProperties();
//	}

	@Bean
	@ConfigurationProperties("spring.datasource")
	public DataSource masterDataSource(DruidProperties DruidProperties1) {
		DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
		return dataSourceDruidProperties().dataSource(dataSource);
	}

//	@Bean
//	@ConfigurationProperties("spring.datasource3")
//	public DataSource factoryDataSource() {
//		DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
//		return dataSourceDruidProperties().dataSource(dataSource);
//	}

	@Bean
	public SqlSessionTemplate sqlSessionTemplate1(SqlSessionFactory sqlSessionFactory) throws Exception {
		SqlSessionTemplate template = new SqlSessionTemplate(sqlSessionFactory); // 使用上面配置的Factory
		return template;
	}

	@Bean(name = "dynamicDataSource")
	@Primary
	public DynamicDataSource dataSource(DataSource masterDataSource, DataSource factoryDataSource) {
		Map<Object, Object> targetDataSources = new HashMap<>();
		targetDataSources.put(DataSourceType.MASTER.name(), masterDataSource);
//		targetDataSources.put(DataSourceType.FACTORY.name(), factoryDataSource);

		return new DynamicDataSource(masterDataSource, targetDataSources);
	}
}
