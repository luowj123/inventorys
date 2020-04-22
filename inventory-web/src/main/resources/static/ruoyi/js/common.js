/**
 * 通用方法封装处理 update by chenpei 2020/04/15
 */

$(function () {
  // laydate 时间控件绑定
  if($(".select-time").length > 0) {
    layui.use('laydate', function () {
      var laydate = layui.laydate;
      var startDate = laydate.render({
        elem: '#startTime',
        max: $('#endTime').val(),
        theme: '#1E9FFF',
        done: function (value, date) {
          // 结束时间大于开始时间
          if(value !== '') {
            endDate.config.min.year = date.year;
            endDate.config.min.month = date.month - 1;
            endDate.config.min.date = date.date;
          } else {
            endDate.config.min.year = '';
            endDate.config.min.month = '';
            endDate.config.min.date = '';
          }
        }
      });
      var endMaxDate = publicFnc.getDateStr(0);
      var endDate = laydate.render({
        elem: '#endTime',
        min: $('#startTime').val(),
        max: endMaxDate,
        theme: '#1E9FFF',
        done: function (value, date) {
          // 开始时间小于结束时间
          if(value !== '') {
            startDate.config.max.year = date.year;
            startDate.config.max.month = date.month - 1;
            startDate.config.max.date = date.date;
          } else {
            startDate.config.max.year = '';
            startDate.config.max.month = '';
            startDate.config.max.date = '';
          }
        }
      });
    });
  }
  // laydate time-input 时间控件绑定
  if($(".time-input").length > 0) {
    layui.use('laydate', function () {
      var laydate = layui.laydate;
      var times = $(".time-input");
      for(var i = 0; i < times.length; i++) {
        // 控制控件外观
        var type = $(times[i]).attr("data-type") || 'date';
        // 控制回显格式
        var format = $(times[i]).attr("data-format") || 'yyyy-MM-dd';
        var time = times[i];
        laydate.render({
          elem: time,
          theme: '#1E9FFF',
          type: type,
          format: format,
          max: new Date().valueOf(),
          done: function (value, date) { }
        });
      }
    });
  }
  // tree 关键字搜索绑定
  if($("#keyword").length > 0) {
    $("#keyword").bind("focus", function focusKey (e) {
      if($("#keyword").hasClass("empty")) {
        $("#keyword").removeClass("empty");
      }
    }).bind("blur", function blurKey (e) {
      if($("#keyword").val() === "") {
        $("#keyword").addClass("empty");
      }
      $.tree.searchNode(e);
    }).bind("input propertychange", $.tree.searchNode);
  }

  // tree表格树 展开/折叠
  var expandFlag;
  $("#expandAllBtn").click(function () {
    var dataExpand = $.common.isEmpty($.table._option.expandAll) ? true : $.table._option.expandAll;
    expandFlag = $.common.isEmpty(expandFlag) ? dataExpand : expandFlag;
    if(!expandFlag) {
      $('#' + $.table._option.id).bootstrapTreeTable('expandAll');
    } else {
      $('#' + $.table._option.id).bootstrapTreeTable('collapseAll');
    }
    expandFlag = expandFlag ? false : true;
  })
});

/** 刷新选项卡 */
var refreshItem = function () {
  var topWindow = $(window.parent.document);
  var currentId = $('.page-tabs-content', topWindow).find('.active').attr('data-id');
  var target = $('.RuoYi_iframe[data-id="' + currentId + '"]', topWindow);
  var url = target.attr('src');
  target.attr('src', url).ready();
}

/** 关闭选项卡 */
var closeItem = function () {
  var topWindow = $(window.parent.document);
  var panelUrl = window.frameElement.getAttribute('data-panel');
  $('.page-tabs-content .active i', topWindow).click();
  if($.common.isNotEmpty(panelUrl)) {
    $('.menuTab[data-id="' + panelUrl + '"]', topWindow).addClass('active').siblings('.menuTab').removeClass('active');
    $('.mainContent .RuoYi_iframe', topWindow).each(function () {
      if($(this).data('id') == panelUrl) {
        $(this).show().siblings('.RuoYi_iframe').hide();
        return false;
      }
    });
  }
}

function getParent () {
  var base = window.parent.parent;
  var panelParent = window.parent;
  if(base.name != '') {
    base = window.parent.parent.parent;
    panelParent = window.parent.parent;
  }
  return {
    base: base,
    panelParent: panelParent
  };
}

/** 创建选项卡  */
function createMenuItem (dataUrl, dataIndex, menuName) {
  var panelUrl = window.frameElement.getAttribute('name');
  //    dataIndex = $.common.random(1,100),
  var flag = true;
  if(dataUrl == undefined || $.trim(dataUrl).length == 0) return false;
  var topWindow = $(window.parent.document);
  if(window.parent.name != '') {
    var baseParent = getParent();
    topWindow = $(baseParent.base.document);
    panelUrl = baseParent.panelParent.frameElement.getAttribute('name');
  }
  // 选项卡菜单已存在
  $('.menuTab', topWindow).each(function () {
    if($(this).data('id') == 'iframe' + dataIndex) {
      if(!$(this).hasClass('active')) {
        $(this).addClass('active').siblings('.menuTab').removeClass('active');
        $('.page-tabs-content').animate({ marginLeft: "" }, "fast");
        // 显示tab对应的内容区
        $('.mainContent .RuoYi_iframe', topWindow).each(function () {
          if($(this).attr('name') == 'iframe' + dataIndex) {
            $(this).show().siblings('.RuoYi_iframe').hide();
            return false;
          }
        });
      }
      $('.mainContent', parent.document).find('.RuoYi_iframe').each(function () {
        if($(this).attr('name') == 'iframe' + dataIndex) {
          if($(this).attr('src') != dataUrl) {
            $(this).show().siblings('.RuoYi_iframe').hide();
            $(this).attr('data-id', dataUrl);
            $(this).attr('src', dataUrl)
          }
          return false;
        }
      });

      flag = false;
      return false;
    }
  });
  // 选项卡菜单不存在
  if(flag) {
    var str = '<a href="javascript:;" class="active menuTab" data-id="iframe' + dataIndex + '" data-panel="' + panelUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
    $('.menuTab', topWindow).removeClass('active');

    // 添加选项卡对应的iframe
    var str1 = '<iframe class="RuoYi_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" data-panel="' + panelUrl + '" seamless></iframe>';
    $('.mainContent', topWindow).find('iframe.RuoYi_iframe').hide().parents('.mainContent').append(str1);

    window.parent.$.modal.loading("数据加载中，请稍后...");
    $('.mainContent iframe:visible', topWindow).load(function () {
      window.parent.$.modal.closeLoading();
    });

    // 添加选项卡
    $('.menuTabs .page-tabs-content', topWindow).append(str);
  }
  return false;
}

//日志打印封装处理
var log = {
  log: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.info(msg);
  },
  warn: function (msg) {
    console.warn(msg);
  },
  error: function (msg) {
    console.error(msg);
  }
};

/** 设置全局ajax处理 */
$.ajaxSetup({
  complete: function (XMLHttpRequest, textStatus) {
    if(textStatus == 'timeout') {
      $.modal.alertWarning("服务器超时，请稍后再试！");
      $.modal.closeLoading();
    } else if(textStatus == "parsererror") {
      $.modal.alertWarning("服务器错误，请联系管理员！");
      $.modal.closeLoading();
    }
  }
});

// layui时间控件全局配置
layer.config({
  extend: 'moon/style.css',
  skin: 'layer-ext-moon'
});
