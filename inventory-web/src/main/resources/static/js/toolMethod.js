/**
 *@JS toolMethod.js
 *@Description 工具类
 *@Author zhaolijun
 *@Date 2019/10/17 15:44
 *@Version 1.0
 **/
/**
 * 添加jquery方法
 * @param jsonValue
 */
var SUCESS_CODE="000",
    ERROR_CODE="001";

$.fn.setForm = function (jsonValue) {
    var obj = this;
    $.each(jsonValue, function (name, ival) {
        var $oinput = obj.find("input[name=" + name + "]");
        if ($oinput.attr("type") == "checkbox") {
            if (ival !== null) {
                var checkboxObj = $("[name=" + name + "]");
                var checkArray = ival.split(";");
                for (var i = 0; i < checkboxObj.length; i++) {
                    for (var j = 0; j < checkArray.length; j++) {
                        if (checkboxObj[i].value == checkArray[j]) {
                            checkboxObj[i].click();
                        }
                    }
                }
            }
        }
        else if ($oinput.attr("type") == "radio") {
            $oinput.each(function () {
                var radioObj = $("[name=" + name + "]");
                for (var i = 0; i < radioObj.length; i++) {
                    if (radioObj[i].value == ival) {
                        radioObj[i].click();
                    }
                }
            });
        }
        else if ($oinput.attr("type") == "textarea") {
            obj.find("[name=" + name + "]").html(ival);
        }
        else {
            obj.find("[name=" + name + "]").val(ival);
        }
    })
}

var toolMethod={
    /**
     * 发送post---Ajax请求
     * @param url 请求的url
     * @param param 请求的参数
     * @param successCall 成功回调
     * @param failCall 错误回调
     */
    sendPostRequest:function(url,aysnc,param,successCall,failCall){
        $.ajax({
            type: "POST",
            url: url,
            data: param,
            async:aysnc,
            dataType: "JSON",
            crossDomain:true,
            xhrFields:{
                withCredentials:true
            },
            success:function(result){
                //获取数据成功
                // if(result.code==SUCCESS_CODE){//0000后台成功编码
                if(successCall && (typeof successCall =="function"))
                {
                    successCall(result);
                    // }
                }
                // else if(result.code==ERROR_CODE){//0001后台失败编码
                //     failCall();
                // }
            },
            error:function(data){
                if(failCall && (typeof failCall =="function"))
                {
                    failCall();
                }
            }
        })
    }
    ,
    /**
     * 发送GET---Ajax请求
     * @param url 请求的url
     * @param param 请求的参数
     * @param successCall 成功回调
     * @param failCall 错误回调
     */
    sendGetRequest:function(url,param,successCall,failCall){
        $.ajax({
            type: "GET",
            url: url,
            data: param,
            async: false,
            dataType: "JSON",
            success:function(data){
                if(successCall && (typeof successCall =="function"))
                {
                    successCall(data);
                }
            },
            error:function(data){
                if(failCall && (typeof failCall =="function"))
                {
                    failCall(data);
                }
            }
        })
    }
}