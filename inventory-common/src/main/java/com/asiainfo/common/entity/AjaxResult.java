package com.asiainfo.common.entity;

import com.asiainfo.common.contstants.SystemConstant;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @ClassName AjaxResult
 * @Description 结果返回实体
 * @Author zhaolijun
 * @Date 2019/10/10 15:08
 * @Version 1.0
 **/
@Data
@Accessors(chain = true)
public class AjaxResult<T> {

    //返回结果编码
    private String code;

    //返回数据
    private T data;

    //异常提示信息
    private String msg;
}
