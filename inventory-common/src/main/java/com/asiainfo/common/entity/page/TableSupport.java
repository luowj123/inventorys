package com.asiainfo.common.entity.page;

import com.asiainfo.common.contstants.SystemConstant;
import com.asiainfo.common.utils.ServletUtils;

/**
 * 表格数据处理
 * 
 * @author yichen
 */
public class TableSupport
{
    /**
     * 封装分页对象
     */
    public static PageDomain getPageDomain()
    {
        PageDomain pageDomain = new PageDomain();
        pageDomain.setPageNum(ServletUtils.getParameterToInt(SystemConstant.PAGE_NUM));
        pageDomain.setPageSize(ServletUtils.getParameterToInt(SystemConstant.PAGE_SIZE));
        pageDomain.setOrderByColumn(ServletUtils.getParameter(SystemConstant.ORDER_BY_COLUMN));
        pageDomain.setIsAsc(ServletUtils.getParameter(SystemConstant.IS_ASC));
        return pageDomain;
    }

    public static PageDomain buildPageRequest()
    {
        return getPageDomain();
    }
}
