/**
 *@JS self-validate.js
 *@Description TODO
 *@Author zhaolijun
 *@Date 2019/8/1 16:07
 *@Version 1.0
 **/
//自定义validate验证输入的数字小数点位数不能大于两位
jQuery.validator.addMethod("maxDecimal2",function(value, element,params){
    var returnVal = true;
    inputZ=value;
    var ArrMen= inputZ.split(".");    //截取字符串
    if(ArrMen.length==2){
        if(ArrMen[1].length>params){    //判断小数点后面的字符串长度
            returnVal = false;
            return false;
        }
    }
    return returnVal;
},"小数点后最多为两位");