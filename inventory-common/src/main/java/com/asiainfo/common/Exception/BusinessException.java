package com.asiainfo.common.Exception;

/**
 * @ClassName BusinessException
 * @Description 业务异常类
 * @Author zhaolijun
 * @Date 2019/10/15 17:55
 * @Version 1.0
 **/
public class BusinessException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    protected final String message;

    public BusinessException(String message)
    {
        this.message = message;
    }

    public BusinessException(String message, Throwable e)
    {
        super(message, e);
        this.message = message;
    }

    @Override
    public String getMessage()
    {
        return message;
    }
}

