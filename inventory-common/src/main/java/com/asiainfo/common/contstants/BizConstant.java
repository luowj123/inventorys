package com.asiainfo.common.contstants;

/**
 * @ClassName BizConstant
 * @Description 业务常量类
 * @Author zhaolijun
 * @Date 2019/10/10 15:12
 * @Version 1.0
 **/
public class BizConstant {

    //流程节点状态-未到
    public static final String CHANGE_STATUS_NOT_ARRIVE="0";

    //流程节点状态-待处理
    public static final String CHANGE_STATUS_NOT_HANDLE="1";

    //流程节点状态-完成
    public static final String CHANGE_STATUS_FINISH="2";

    //流程节点状态-弃用
    public static final String CHANGE_STATUS_ABORT="3";

    //需求状态：1：完成
    public static final String REQUIRE_STATUS_FINISHED="1";

    //需求状态：0：正常
    public static final String REQUIRE_STATUS_NORMAL="0";

    //需求状态：2：弃用
    public static final String REQUIRE_STATUS_ABORT="2";

    //需求状态：3:待发布
    public static final String REQUIRE_STATUS_WAIT_PUBLISH="3";

    //资产发布：成功
    public static final String  ASSET_PUBLISH_SUCESS="2";
}
