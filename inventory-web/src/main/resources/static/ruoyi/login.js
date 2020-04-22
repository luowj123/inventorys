//var random = String(Math.round(Math.random() *100000000000));
var random = randomWord(false,16);
$(function() {
    validateRule();
	$('.imgcode').click(function() {
		var url = ctx + "captcha/captchaImage?type=" + captchaType + "&s=" + Math.random();
		$(".imgcode").attr("src", url);
	});
});

$.validator.setDefaults({
    submitHandler: function() {
		login();
    }
});

function login() {
	$.modal.loading($("#btnSubmit").data("loading"));
	var username = encrypt($.common.trim($("input[name='username']").val()));
    var password = md5($.common.trim($("input[name='password']").val()));
    var validateCode = $("input[name='validateCode']").val();
    var rememberMe = $("input[name='rememberme']").is(':checked');
    var submit=$.ajax({
        type: "post",
        url: ctx + "login",
        data: {
            "username": username,
            "password": password,
            "validateCode" : validateCode,
            "rememberMe": rememberMe,
            "random":random
        },
        success: function(r,textStatus) {
            sessionStorage.setItem('token',submit.getResponseHeader('authorization'))
            if (r.code == 0) {
                location.href = ctx + 'index';
            } else {
            	$.modal.closeLoading();
            	$('.imgcode').click();
            	$(".code").val("");
            	$.modal.msg(r.msg);
            }
        }

    });
}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: icon + "请输入您的用户名",
            },
            password: {
                required: icon + "请输入您的密码",
            }
        }
    })
}
//添加前端加密功能
// function encrypt(content){
//     var random1 = CryptoJS.enc.Hex.parse(random);
//     console.log(random1);
//     var iv = CryptoJS.enc.Hex.parse("0123456789ABCDEF0123456789ABCDEF");
//     var secret = CryptoJS.AES.encrypt(content ,random1,{
//         iv:iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return secret.ciphertext.toString();
// }
function encrypt (word) {
    var key = CryptoJS.enc.Utf8.parse(random);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

/**
 * 忘记密码 
 * chenpei 2019/12/20
 * */
function forgetPassword() {
	$.modal.openWin({
			title: '',
			area: ['380px', '400px'],
			content : '/loginResetPassword', // 重置页面跳转路径
			btn : [ '取消', '确定' ],
			btn2: function(index, layero) {
				var iframeWin = window[layero.find('iframe')[0]['name']];
				var flag = iframeWin.updatePassword();
				return flag;
			},
	});
}

