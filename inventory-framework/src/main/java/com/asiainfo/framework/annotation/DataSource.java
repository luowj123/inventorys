package com.asiainfo.framework.annotation;

import com.asiainfo.framework.constant.DataSourceType;

import java.lang.annotation.*;

/**
 * @AnnotationName DataSource
 * @Description 自定义多数据源切换注解
 * @Author zhaolijun
 * @Date 2019/10/9 11:32
 * @Version 1.0
 **/
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface DataSource {

    //指定数据源，不指定默认MASTER数据源
    public DataSourceType value() default DataSourceType.MASTER;
}
