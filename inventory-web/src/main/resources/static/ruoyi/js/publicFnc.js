/**
 * 通用js方法封装处理 2019 chenpei
 */

var publicFnc = {
	/**
	 * 获取目标类型
	 * 
	 * @param item 目标参数
	 */
  getType: function (item) {
    var type = Object.prototype.toString.call(item);
    return type.slice(type.indexOf(' ') + 1, -1);
  },
	/**
	 * 检查文件类型是否和目标类型一致
	 * 
	 * @param type 文件类型
	 * @param targetType 目标类型
	 */
  checkFileType: function (type, targetType) {
    var _type = publicFnc.getType(targetType);
    if(_type === 'String') {
      if(type !== targetType)
        return '文件格式必须是' + targetType;
    } else if(_type === 'Array') {
      var flag = targetType.some(function (item) {
        return item === type;
      });
      if(!flag)
        return '文件格式必须是' + targetType.toString() + '之一';
    }
    if(_type !== 'String' && _type !== 'Array')
      return false;
    return 'pass';
  },
	/**
	 * 检查文件大小是否小于等于目标大小
	 * 
	 * @param size 文件大小
	 * @param maxSize 目标大小
	 */
  checkFileSize: function (size, maxSize) {
    return size > maxSize ? '文件必须小于' + (maxSize / 1024) + 'M' : 'pass';
  },
	/**
	 * 上传文件
	 * 
	 * @param url 接口地址
	 * @param targetFile dom直接获取的file
	 * @param targetType 目标类型
	 * @param maxSize 文件最大体积
	 * @param data 上传的文件具体formData
	 */
  uploadFiles: function (url, targetFile, targetType, maxSize, data) {
    if(!url || publicFnc.getType(url) !== 'String' || !targetFile || publicFnc.getType(targetFile) !== 'FileList' || !targetType || !maxSize || isNaN(maxSize - 0) || !data) return false;
    var file = targetFile[0],
      type = file && file.name && file.name.split('.').pop(),
      size = file && file.size,
      checkType = publicFnc.checkFileType(type, targetType),
      checkSize = publicFnc.checkFileSize(size, maxSize),
      checkRes = '',
      xhr = new XMLHttpRequest();
    if(checkType !== 'pass') checkRes = checkType;
    if(checkSize !== 'pass') checkRes = checkRes || checkSize;
    if(!checkRes) {
      xhr.open('POST', url, true);
      xhr.responseType = 'json';
      xhr.send(data);
    }
    return {
      on: function (state, callBack) {
        this[state](callBack);
      },
      done: function (cb) {
        if(!checkRes) {
          xhr.onreadystatechange = function () {
            if(xhr.status === 200 && xhr.readyState === 4) {
              cb.call(this, JSON.parse(JSON.stringify(xhr.response)));
            }
          }
        } else {
          cb.call(this, {
            msg: checkRes
          });
        }
      }
    }
  },
	/**
	 * 添加事件
	 * 
	 * @param ele 元素
	 * @param type 事件类型
	 * @param fn 回调函数
	 */
  addEvent: function (ele, type, fn) {
    var doms = document.querySelectorAll(ele);
    Array.prototype.forEach.call(doms, function (item, index) {
      item.addEventListener(type, function (event) {
        return fn.call(this, event)
      });
    })
  },
	/**
	 * 获取当前日期的前n天，后n天的日期
	 * 
	 * @param AddDayCount
	 * 
	 * 例如： console.log('前天：',getDateStr(-2)); // 前天： 2018-09-11
	 * console.log('昨天：',getDateStr(-1)); // 昨天： 2018-09-12
	 * console.log('今天：',getDateStr(0)); // 今天： 2018-09-13
	 * console.log('明天：',getDateStr(1)); // 明天： 2018-09-14
	 * console.log('后天：',getDateStr(2)); // 后天： 2018-09-15
	 */
  getDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;// 获取当前月份的日期
    var d = dd.getDate();
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
  },
	/**
	 * 获取url参数
	 * 
	 * @param variable
	 * 
	 * 例如： http://www.****.com/index?id=1&image=awesome.jpg
	 * getQueryVariable("id"); // 返回 1 getQueryVariable("image"); // 返回
	 * awesome.jpg
	 */
  getQueryVariable: function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable) { return pair[1]; }
    }
    return (false);
  },
}


// 数组操作--删除对象
Array.prototype.remove = function (o, prop) {
  var val;
  if(typeof (o) === "object") {
    val = o[prop];
    for(var i = 0; i < this.length; i++) {
      if(this[i][prop] == val) {
        this.splice(i, 1);
      }
    }
  }
};

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    "S": this.getMilliseconds()
  };
  if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for(var i in args) {
    var n = args[i];
    if(new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
};
