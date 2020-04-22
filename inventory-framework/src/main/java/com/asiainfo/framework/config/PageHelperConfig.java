package com.asiainfo.framework.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * @ClassName PageHelperConfig
 * @Description TODO
 * @Author zhaolijun
 * @Date 2019/10/12 11:32
 * @Version 1.0
 **/
@Configuration
@Data
public class PageHelperConfig {

    @Value("${pagehelper.helperDialect}")
    private String helperDialect="mysql";

    @Value("${pagehelper.reasonable}")
    private String reasonable="true";

    @Value("${pagehelper.supportMethodsArguments}")
    private String supportMethodsArguments="true";

    @Value("${pagehelper.params}")
    private String params="count=countSql";

    @Value("${pagehelper.offsetAsPageNum}")
    private String offsetAsPageNum;

    @Value("${pagehelper.rowBoundsWithCount}")
    private String rowBoundsWithCount;
}
