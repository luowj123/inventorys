package com.asiainfo.framework.aspect;

import com.asiainfo.common.utils.StringUtils;
import com.asiainfo.framework.annotation.DataSource;
import com.asiainfo.framework.config.PageHelperConfig;
import com.asiainfo.framework.constant.DataSourceType;
import com.asiainfo.framework.datasource.DynamicDataSourceContextHolder;
import org.apache.ibatis.session.SqlSessionFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Properties;

/**
 * @ClassName DataSourceAspect
 * @Description 数据源切面实现根据注解来切换数据源，注意事务，无法在service层保证事务的特性
 * @Author zhaolijun
 * @Date 2019/10/9 11:35
 * @Version 1.0
 **/
@Aspect
@Order(1)
@Component
public class DataSourceAspect {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Autowired
    private PageHelperConfig pageHelperConfig;
    /**
     * 方法有@DataSource注解
     */
    @Pointcut("@annotation(com.asiainfo.framework.annotation.DataSource)")
    public void dsPointCut()
    {

    }

    @Around("dsPointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable
    {

        MethodSignature signature = (MethodSignature) point.getSignature();

        Method method = signature.getMethod();

         DataSource dataSource = method.getAnnotation(DataSource.class);

         Properties properties = new Properties();
         properties.setProperty("offsetAsPageNum", pageHelperConfig.getOffsetAsPageNum());
         properties.setProperty("rowBoundsWithCount",pageHelperConfig.getRowBoundsWithCount());
         properties.setProperty("reasonable", pageHelperConfig.getReasonable());
         properties.setProperty("supportMethodsArguments",pageHelperConfig.getSupportMethodsArguments());
         properties.setProperty("params",pageHelperConfig.getParams());
        if (StringUtils.isNotNull(dataSource))
        {
            //切换数据源和改变断言，分页的时候用到断言！！！！！！
            DynamicDataSourceContextHolder.setDataSourceType(dataSource.value().name());
            properties.setProperty("helperDialect", dataSource.value().getDialect());
            sqlSessionFactory.getConfiguration().getInterceptors().get(0).setProperties(properties);
        }

        try
        {
            return point.proceed();
        }
        finally
        {
            //恢复默认断言
            properties.setProperty("helperDialect", DataSourceType.MASTER.getDialect());
            sqlSessionFactory.getConfiguration().getInterceptors().get(0).setProperties(properties);
            // 销毁数据源 在执行方法之后
            DynamicDataSourceContextHolder.clearDataSourceType();
        }
    }

}
