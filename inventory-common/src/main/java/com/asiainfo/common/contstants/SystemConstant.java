package com.asiainfo.common.contstants;

/**
 * @ClassName SystemConstant
 * @Description 系统常量类
 * @Author zhaolijun
 * @Date 2019/10/10 15:10
 * @Version 1.0
 **/
public class SystemConstant {

    //返回成功code-000
    public final static String SUCCESS_CODE="000";

    //返回失败code-001
    public final static String ERROR_CODE="001";

    /**
     * 当前记录起始索引
     */
    public static String PAGE_NUM = "pageNum";

    /**
     * 每页显示记录数
     */
    public static String PAGE_SIZE = "pageSize";

    /**
     * 排序列
     */
    public static String ORDER_BY_COLUMN = "orderByColumn";

    /**
     * 排序的方向 "desc" 或者 "asc".
     */
    public static String IS_ASC = "isAsc";
}
