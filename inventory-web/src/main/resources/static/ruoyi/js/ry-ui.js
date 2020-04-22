/**
 * 通用js方法封装处理 Copyright (c) 2019 ruoyi
 */
(function ($) {
  $.extend({
    _treeTable: {},
    _tree: {},
    // 表格封装处理
    table: {
      _option: {},
      // 初始化表格参数
      init: function (options) {
        var defaults = {
          id: "bootstrap-table",
          type: 0, // 0 代表bootstrapTable 1代表bootstrapTreeTable
          height: undefined,
          sidePagination: "server",
          sortName: "",
          sortOrder: "asc",
          pagination: true,
          pageSize: 10,
          toolbar: "toolbar",
          striped: false,
          escape: false,
          showFooter: false,
          search: false,
          showSearch: true,
          showPageGo: false,
          showRefresh: true,
          showColumns: true,
          showToggle: false,
          showExport: false,
          clickToSelect: false,
          fixedColumns: false,
          fixedNumber: 0,
          rightFixedColumns: false,
          rightFixedNumber: 0,
          queryParams: $.table.queryParams,
        };
        var options = $.extend(defaults, options);
        $.table._option = options;
        $('#' + options.id).bootstrapTable({
          url: options.url, // 请求后台的URL（*）
          contentType: "application/x-www-form-urlencoded", // 编码类型
          method: 'post', // 请求方式（*）
          cache: false, // 是否使用缓存
          height: options.height, // 表格的高度
          striped: options.striped, // 是否显示行间隔色
          sortable: true, // 是否启用排序
          sortStable: true, // 设置为 true
          // 将获得稳定的排序
          sortName: options.sortName, // 排序列名称
          sortOrder: options.sortOrder, // 排序方式 asc 或者 desc
          pagination: options.pagination, // 是否显示分页（*）
          pageNumber: 1, // 初始化加载第一页，默认第一页
          pageSize: options.pageSize, // 每页的记录行数（*）
          pageList: [10, 25, 50], // 可供选择的每页的行数（*）
          escape: options.escape, // 转义HTML字符串
          showFooter: options.showFooter, // 是否显示表尾
          iconSize: 'outline', // 图标大小：undefined默认的按钮尺寸 xs超小按钮sm小按钮lg大按钮
          toolbar: '#' + options.toolbar, // 指定工作栏
          sidePagination: options.sidePagination, // server启用服务端分页client客户端分页
          search: options.search, // 是否显示搜索框功能
          showSearch: options.showSearch, // 是否显示检索信息
          showPageGo: options.showPageGo, // 是否显示跳转页
          showRefresh: options.showRefresh, // 是否显示刷新按钮
          showColumns: options.showColumns, // 是否显示隐藏某列下拉框
          showToggle: options.showToggle, // 是否显示详细视图和列表视图的切换按钮
          showExport: options.showExport, // 是否支持导出文件
          clickToSelect: options.clickToSelect, // 是否启用点击选中行
          fixedColumns: options.fixedColumns, // 是否启用冻结列（左侧）
          fixedNumber: options.fixedNumber, // 列冻结的个数（左侧）
          rightFixedColumns: options.rightFixedColumns, // 是否启用冻结列（右侧）
          rightFixedNumber: options.rightFixedNumber, // 列冻结的个数（右侧）
          queryParams: options.queryParams, // 传递参数（*）
          columns: options.columns, // 显示列信息（*）
          responseHandler: options.responseHandler, // 在加载服务器发送来的数据之前处理函数
          onLoadSuccess: options.onLoadSuccess, // 当所有数据被加载时触发处理函数
          onCheck: options.onCheck, // 选中
          onUncheck: options.onUncheck, // 取消选中
          onCheckAll: options.onCheckAll, // 全选
          onUncheckAll: options.onUncheckAll, // 取消全选
          onPostBody: options.onPostBody, // 当<tbody></tbody>中的内容被加载完后被触发
        });
      },
      // 查询条件
      queryParams: function (params) {
        // 传递参数查询参数
        return {
          pageSize: params.limit,
          pageNum: params.offset / params.limit + 1,
          searchValue: params.search,
          orderByColumn: params.sort,
          isAsc: params.order
        };
      },
      // 请求获取数据后处理回调函数
      responseHandler: function (res) {
        if(res.code == 0) {
          if($.common.isNotEmpty($.table._option.sidePagination) && $.table._option.sidePagination == 'client') {
            return res.rows;
          } else {
            return {
              rows: res.rows,
              total: res.total
            };
          }
        } else {
          $.modal.alertWarning(res.msg);
          return {
            rows: [],
            total: 0
          };
        }
      },
      // 当所有数据被加载时触发
      onLoadSuccess: function (data) {
        // 浮动提示框特效
        $("[data-toggle='tooltip']").tooltip();
        // 触发行点击事件
        $("#" + $.table._option.id).on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table load-success.bs.table", function () {
          var ids = $("#" + $.table._option.id).bootstrapTable("getSelections");
          $('#' + $.table._option.toolbar + ' .btn-del').toggleClass('disabled', !ids.length);
          $('#' + $.table._option.toolbar + ' .btn-edit').toggleClass('disabled', ids.length != 1);
        });
      },
      // 表格销毁
      destroy: function (tableId) {
        var currentId = $.common.isEmpty(tableId) ? $.table._option.id : tableId;
        $("#" + currentId).bootstrapTable('destroy');
      },
      // 序列号生成
      serialNumber: function (index) {
        var table = $('#' + $.table._option.id).bootstrapTable('getOptions');
        var pageSize = table.pageSize;
        var pageNumber = table.pageNumber;
        return pageSize * (pageNumber - 1) + index + 1;
      },
      // 列超出指定长度浮动提示
      tooltip: function (value, length) {
        var _length = $.common.isEmpty(length) ? 20 : length;
        var _text = "";
        var _value = $.common.nullToStr(value);
        if(_value.length > _length) {
          _text = _value.substr(0, _length) + "...";
        } else {
          _text = _value;
        }
        return '<a href="#" class="tooltip-show" data-toggle="tooltip" title="' + _value + '">' + _text + '</a>';
      },
      // 下拉按钮切换
      dropdownToggle: function (value) {
        var actions = [];
        actions.push('<div class="btn-group">');
        actions.push('<button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">');
        actions.push('<i class="fa fa-cog"></i>&nbsp;<span class="fa fa-chevron-down"></span></button>');
        actions.push('<ul class="dropdown-menu">');
        actions.push(value.replace(/<a/g, "<li><a").replace(/<\/a>/g, "</a></li>"));
        actions.push('</ul>');
        actions.push('</div>');
        return actions.join('');
      },
      // 搜索-默认第一个form
      search: function (formId) {
        var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
        var params = $("#" + $.table._option.id).bootstrapTable('getOptions');
        params.queryParams = function (params) {
          var search = {};
          $.each($("#" + currentId).serializeArray(), function (i, field) {
            search[field.name] = field.value;
          });
          search.pageSize = params.limit;
          search.pageNum = params.offset / params.limit + 1;
          search.searchValue = params.search;
          search.orderByColumn = params.sort;
          search.isAsc = params.order;
          return search;
        }
        $("#" + $.table._option.id).bootstrapTable('refresh', params);
      },
      // 导出数据
      exportExcel: function (formId) {
        var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
        $.modal.loading("正在导出数据，请稍后...");
        $.post($.table._option.exportUrl, $("#" + currentId).serializeArray(), function (result) {
          if(result.code == web_status.SUCCESS) {
            window.location.href = ctx + "common/downloadOriginal?fileName=" + encodeURI(result.msg) + "&delete=" + true;
          } else {
            $.modal.alertError(result.msg);
          }
          $.modal.closeLoading();
        });
      },
      // 下载模板
      importTemplate: function () {
        $.get($.table._option.importTemplateUrl, function (result) {
          if(result.code == web_status.SUCCESS) {
            window.location.href = ctx + "common/templateDownload?fileName=" + encodeURI(result.msg) + "&delete=" + true;
          } else {
            $.modal.alertError(result.msg);
          }
        });
      },
      // 导入数据
      importExcel: function (formId) {
        var currentId = $.common.isEmpty(formId) ? 'importForm' : formId;
        $.form.reset(currentId);
        layer.open({
          type: 1,
          area: ['400px', '230px'],
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.3,
          title: '导入' + $.table._option.modalName + '数据',
          content: $('#' + currentId),
          btn: ['取消', '导入'],
          // 弹层外区域关闭
          shadeClose: true,
          btn2: function (index, layero) {
            var file = layero.find('#file').val();
            if(file == '' || (!$.common.endWith(file, '.xls') && !$.common.endWith(file, '.xlsx'))) {
              $.modal.msgWarning("请选择后缀为 “xls”或“xlsx”的文件。");
              return false;
            }
            var index = layer.load(2, {
              shade: false
            });
            $.modal.disable();
            var formData = new FormData();
            formData.append("file", $('#file')[0].files[0]);
            formData.append("updateSupport", $("input[name='updateSupport']").is(':checked'));
            $.ajax({
              url: $.table._option.importUrl,
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              type: 'POST',
              success: function (result) {
                if(result.code == web_status.SUCCESS) {
                  $.modal.closeAll();
                  $.modal.alertSuccess(result.msg);
                  $.table.refresh();
                } else {
                  layer.close(index);
                  $.modal.enable();
                  $.modal.alertError(result.msg);
                }
              }
            });
          }
        });
      },
      // 刷新表格 -- 数据
      refresh: function () {
        $("#" + $.table._option.id).bootstrapTable('refresh', {
          silent: true
        });
      },
			/***
			 * 刷新表格 -- 展示
			 *
			 * @param elem 表格dom元素
			 * 				opt 需要刷新的参数
			 */
      resetView: function (elem, opt) {
        $(elem).bootstrapTable('resetView', opt);
      },
      // 查询表格指定列值
      selectColumns: function (column) {
        return $.map($('#' + $.table._option.id).bootstrapTable('getSelections'), function (row) {
          return row[column];
        });
      },
      // 查询表格首列值
      selectFirstColumns: function () {
        return $.map($('#' + $.table._option.id).bootstrapTable('getSelections'), function (row) {
          return row[$.table._option.columns[1].field];
        });
      },
      // 回显数据字典
      selectDictLabel: function (datas, value) {
        var actions = [];
        $.each(datas, function (index, dict) {
          if(dict.dictValue == ('' + value)) {
            actions.push("<span class='badge badge-" + dict.listClass + "'>" + dict.dictLabel + "</span>");
            return false;
          }
        });
        return actions.join('');
      },
      // 显示表格指定列
      showColumn: function (column) {
        $("#" + $.table._option.id).bootstrapTable('showColumn', column);
      },
      // 隐藏表格指定列
      hideColumn: function (column) {
        $("#" + $.table._option.id).bootstrapTable('hideColumn', column);
      },
			/***
			 * 监听 表格搜索按钮 -- form表单 收起 / 展开
			 *
			 * @author chenpei 2019/08/14
			 * @param resizeDiv 监听form dom元素
			 * 				ele 需要改变展示的table dom元素
			 * 			 	optHide 收起时--需改变展示的参数
			 * 				optShow 展开时--需改变展示的参数
			 */
      searchBarListener: function () {
        var array = arguments[0];
        var toolbar = $('.fixed-table-toolbar >.btn-group >button');

        for(var i = 0; i < toolbar.length; i++) {
          if($(toolbar[i]).attr('name') == 'showSearch') {
            $(toolbar[i]).on('click', function () {
              setTimeout(function () {
                if(getComputedStyle(array.resizeDiv, null).display == 'none') {
                  //		      				console.log('收起')
                  $.table.resetView(array.ele, array.optHide);
                } else {
                  //		  	      		console.log('展开')
                  $.table.resetView(array.ele, array.optShow);
                }
              }, 500)
            })
          }
        }
      },
    },
    // 表格树封装处理
    treeTable: {
      // 初始化表格
      init: function (options) {
        var defaults = {
          id: "bootstrap-tree-table",
          type: 1, // 0 代表bootstrapTable 1代表bootstrapTreeTable
          height: 0,
          rootIdValue: null,
          ajaxParams: {},
          toolbar: "toolbar",
          striped: false,
          expandColumn: 1,
          showRefresh: true,
          showColumns: true,
          expandAll: true,
          expandFirst: true
        };
        var options = $.extend(defaults, options);
        $.table._option = options;
        var treeTable = $('#' + options.id).bootstrapTreeTable({
          code: options.code, // 用于设置父子关系
          parentCode: options.parentCode, // 用于设置父子关系
          type: 'get', // 请求方式（*）
          url: options.url, // 请求后台的URL（*）
          ajaxParams: options.ajaxParams, // 请求数据的ajax的data属性
          rootIdValue: options.rootIdValue, // 设置指定根节点id值
          height: options.height, // 表格树的高度
          expandColumn: options.expandColumn, // 在哪一列上面显示展开按钮
          striped: options.striped, // 是否显示行间隔色
          bordered: true, // 是否显示边框
          toolbar: '#' + options.toolbar, // 指定工作栏
          showRefresh: options.showRefresh, // 是否显示刷新按钮
          showColumns: options.showColumns, // 是否显示隐藏某列下拉框
          expandAll: options.expandAll, // 是否全部展开
          expandFirst: options.expandFirst, // 是否默认第一级展开--expandAll为false时生效
          columns: options.columns
        });
        $._treeTable = treeTable;
      },
      // 条件查询
      search: function (formId) {
        var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
        var params = {};
        $.each($("#" + currentId).serializeArray(), function (i, field) {
          params[field.name] = field.value;
        });
        $._treeTable.bootstrapTreeTable('refresh', params);
      },
      // 刷新
      refresh: function () {
        $._treeTable.bootstrapTreeTable('refresh');
      },
    },
    // 表单封装处理
    form: {
      // 表单重置
      reset: function (formId) {
        var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
        $("#" + currentId)[0].reset();
      },
      // 获取选中复选框项
      selectCheckeds: function (name) {
        var checkeds = "";
        $('input:checkbox[name="' + name + '"]:checked').each(function (i) {
          if(0 == i) {
            checkeds = $(this).val();
          } else {
            checkeds += ("," + $(this).val());
          }
        });
        return checkeds;
      },
      // 获取选中下拉框项
      selectSelects: function (name) {
        var selects = "";
        $('#' + name + ' option:selected').each(function (i) {
          if(0 == i) {
            selects = $(this).val();
          } else {
            selects += ("," + $(this).val());
          }
        });
        return selects;
      }
    },
    // 弹出层封装处理
    modal: {
      // 显示图标
      icon: function (type) {
        var icon = "";
        if(type == modal_status.WARNING) {
          icon = 0;
        } else if(type == modal_status.SUCCESS) {
          icon = 1;
        } else if(type == modal_status.FAIL) {
          icon = 2;
        } else {
          icon = 3;
        }
        return icon;
      },
      // 消息提示
      msg: function (content, type) {
        if(type != undefined) {
          layer.msg(content, {
            icon: $.modal.icon(type),
            time: 3000,
            shift: 5
          });
        } else {
          layer.msg(content);
        }
      },
      // 错误消息
      msgError: function (content) {
        $.modal.msg(content, modal_status.FAIL);
      },
      // 成功消息
      msgSuccess: function (content) {
        $.modal.msg(content, modal_status.SUCCESS);
      },
      // 警告消息
      msgWarning: function (content) {
        $.modal.msg(content, modal_status.WARNING);
      },
      // 弹出提示
      alert: function (content, type) {
        var height = ($(window).height() - 50);
        layer.alert(content, {
          icon: $.modal.icon(type),
          title: "",
          maxHeight: height,
          btn: ['确定'],
          btnclass: ['btn btn-primary'],
        });
      },
      // 消息提示并刷新父窗体
      msgReload: function (msg, type) {
        layer.msg(msg, {
          icon: $.modal.icon(type),
          time: 500,
          shade: [0.1, '#8F8F8F']
        }, function () {
          $.modal.reload();
        });
      },
      // 错误提示
      alertError: function (content) {
        $.modal.alert(content, modal_status.FAIL);
      },
      // 成功提示
      alertSuccess: function (content) {
        $.modal.alert(content, modal_status.SUCCESS);
      },
      // 警告提示
      alertWarning: function (content) {
        $.modal.alert(content, modal_status.WARNING);
      },
      // 关闭窗体
      close: function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
      },
      // 关闭全部窗体
      closeAll: function () {
        layer.closeAll();
      },
      // 确认窗体
      confirm: function (title, content, callBack) {
        layer.confirm(content, {
          icon: 3,
          title: title,
          btn: ['取消', '确定'],
          btnclass: ['btn btn-danger', 'btn btn-primary'],
        }, '', function (index) {
          layer.close(index);
          callBack(true);
        });
      },
      // 本层弹框
      openWin: function (option) {
        if(!option.area) {
          option.area = [];
          option.area[0] = "800px";
          option.area[1] = ($(window).height() - 50) + "px"
        }

        var defOption = {
          type: 2,
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.1,
          btn: ['取消', '确定'],
          content: '',
          // 弹层外区域关闭
          shadeClose: true,
          btn2: function (index, layero) {
            var iframeWin = layero.find('iframe')[0];
            var flag = iframeWin.contentWindow.submitHandler();
            if(flag != undefined) {
              return flag;
            }
          },
          cancel: function (index) {
            return true;
          }
        };
        $.extend(defOption, option);
        layer.open(defOption);
      },
      // 父级弹框
      openWinParent: function (option) {
        if(!option.area) {
          option.area = [];
          option.area[0] = "800px";
          option.area[1] = ($(window).height() - 50) + "px"
        }

        var defOption = {
          type: 2,
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.1,
          btn: ['取消', '确定'],
          content: 'aaaaaaa',
          // 弹层外区域关闭
          shadeClose: true,
          btn2: function (index, layero) {
            return true;
          },
          cancel: function (index) {
            return true;
          }
        };
        $.extend(defOption, option);
        parent.layer.open(defOption);
      },
      openWinParentWithoutConfirm: function (option) {
        if(!option.area) {
          option.area = [];
          option.area[0] = "800px";
          option.area[1] = ($(window).height() - 50) + "px"
        }

        var defOption = {
          type: 2,
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.1,
          btn: [],
          content: 'aaaaaaa',
          // 弹层外区域关闭
          shadeClose: true,
          btn2: function (index, layero) {
            return true;
          },
          cancel: function (index) {
            return true;
          }
        };
        $.extend(defOption, option);
        parent.layer.open(defOption);
      },
      // 通用编辑弹出层(可支持3个按钮操作)
      editOpen: function () {
        var params = arguments[0];
        var width = params.width || 800,
          height = params.height || ($(window).height() - 50),
          shadeClose = true;
        if(params.shadeClose != null && !params.shadeClose) shadeClose = params.shadeClose;
        layer.open({
          type: 2,
          area: [width + 'px', height + 'px'],
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.1,
          // 弹层外区域关闭
          shadeClose: shadeClose,
          zIndex: params.zIndex || 0,
          title: params.title,
          content: params.url,
          btn: params.btnArray, // 例如['取消', '通过一级稽核','确定']
          yes: params.yes, // 按钮【取消】的回调 layer.close(index)
          btn2: params.callback1, // 按钮【确定】的回调
          btn3: params.callback2,// 按钮【通过一级稽核 / 通过二级稽核 / 中间的按钮】的回调
          success: params.successCallBack, // 弹出后的成功回调方法
          end: params.end, // 层销毁后触发的回调
          cancel: function (index) { // 右上角关闭回调
            return true;
          }
        });
      },
      // 弹出层指定参数选项
      openOptions: function (options) {
        var _url = $.common.isEmpty(options.url) ? "/404.html" : options.url;
        var _title = $.common.isEmpty(options.title) ? "系统窗口" : options.title;
        var _width = $.common.isEmpty(options.width) ? "800" : options.width;
        var _height = $.common.isEmpty(options.height) ? ($(window).height() - 50) : options.height;
        layer.open({
          type: 2,
          maxmin: true,
          shade: 0.3,
          title: _title,
          fix: false,
          area: [_width + 'px', _height + 'px'],
          content: _url,
          shadeClose: true,
          btn: ['<i class="fa fa-close"></i> 取消', '<i class="fa fa-check"></i> 确定'],
          btn2: function (index, layero) {
            options.callBack(index, layero)
          },
          cancel: function () {
            return true;
          }
        });
      },
      // 弹出层全屏
      openFull: function (title, url, width, height) {
        // 如果是移动端，就使用自适应大小弹窗
        if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
          width = 'auto';
          height = 'auto';
        }
        if($.common.isEmpty(title)) {
          title = false;
        }
        ;
        if($.common.isEmpty(url)) {
          url = "/404.html";
        }
        ;
        if($.common.isEmpty(width)) {
          width = 800;
        }
        ;
        if($.common.isEmpty(height)) {
          height = ($(window).height() - 50);
        }
        ;
        var index = layer.open({
          type: 2,
          area: [width + 'px', height + 'px'],
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.1,
          title: title,
          content: url,
          btn: ['取消', '确定'],
          // 弹层外区域关闭
          shadeClose: true,
          btn2: function (index, layero) {
            var iframeWin = layero.find('iframe')[0];
            iframeWin.contentWindow.submitHandler();
          },
          cancel: function (index) {
            return true;
          }
        });
        layer.full(index);
      },
      // 选卡页方式打开 dataUrl: 跳转路径, dataIndex： 页面标识(建议使用'Custom'+html名), menuName: tab名
      // 最多可在二级弹框里面使用
      openTab: function (dataUrl, dataIndex, menuName) {
        createMenuItem(dataUrl, dataIndex, menuName);
      },
      // 禁用按钮
      disable: function () {
        var doc = window.top == window.parent ? window.document : window.parent.document;
        $("a[class*=layui-layer-btn]", doc).addClass("layer-disabled");
      },
      // 启用按钮
      enable: function () {
        var doc = window.top == window.parent ? window.document : window.parent.document;
        $("a[class*=layui-layer-btn]", doc).removeClass("layer-disabled");
      },
      // 打开遮罩层
      loading: function (message) {
        $.blockUI({
          message: '<div class="loaderbox"><div class="loading-activity"></div> ' + message + '</div>'
        });
      },
      // 关闭遮罩层
      closeLoading: function () {
        setTimeout(function () {
          $.unblockUI();
        }, 50);
      },
      // 重新加载
      reload: function () {
        parent.location.reload();
      }
    },
    // 操作封装处理
    operate: {
      // 提交数据
      submit: function (url, type, dataType, data) {
        var config = {
          url: url,
          type: type,
          dataType: dataType,
          data: data,
          beforeSend: function () {
            $.modal.loading("正在处理中，请稍后...");
          },
          success: function (result) {
            $.operate.ajaxSuccess(result);
          }
        };
        $.ajax(config)
      },
      // post请求传输
      post: function (url, data) {
        $.operate.submit(url, "post", "json", data);
      },
      // get请求传输
      get: function (url) {
        $.operate.submit(url, "get", "json", "");
      },
      // 详细信息
      detail: function (id, width, height) {
        var _url = $.common.isEmpty(id) ? $.table._option.detailUrl : $.table._option.detailUrl.replace("{id}", id);
        var _width = $.common.isEmpty(width) ? "800" : width;
        var _height = $.common.isEmpty(height) ? ($(window).height() - 50) : height;
        // 如果是移动端，就使用自适应大小弹窗
        if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
          _width = 'auto';
          _height = 'auto';
        }
        layer.open({
          type: 2,
          area: [_width + 'px', _height + 'px'],
          fix: false,
          // 不固定
          maxmin: true,
          shade: 0.3,
          title: $.table._option.modalName + "详细",
          content: _url,
          btn: ['关闭'],
          // 弹层外区域关闭
          shadeClose: true,
          cancel: function (index) {
            return true;
          }
        });
      },
      // 删除信息
      remove: function (id) {
        $.modal.confirm('', "确定删除该条" + $.table._option.modalName + "信息吗？", function () {
          var url = $.common.isEmpty(id) ? $.table._option.removeUrl : $.table._option.removeUrl.replace("{id}", id);
          if($.table._option.type == table_type.bootstrapTreeTable) {
            $.operate.get(url);
          } else {
            var data = {
              "ids": id
            };
            $.operate.submit(url, "post", "json", data);
          }
        });
      },
      // 批量删除信息
      removeAll: function () {
        var rows = $.common.isEmpty($.table._option.uniqueId) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.uniqueId);
        if(rows.length == 0) {
          $.modal.alertWarning("请至少选择一条记录");
          return;
        }
        $.modal.confirm('', "确认要删除选中的" + rows.length + "条数据吗?", function () {
          var url = $.table._option.removeUrl;
          var data = {
            "ids": rows.join()
          };
          $.operate.submit(url, "post", "json", data);
        });
      },
      // 清空信息
      clean: function () {
        $.modal.confirm('', "确定清空所有" + $.table._option.modalName + "吗？", function () {
          var url = $.table._option.cleanUrl;
          $.operate.submit(url, "post", "json", "");
        });
      },
      // 添加信息
      add: function (id, width) {
        $.modal.open("添加" + $.table._option.modalName, $.operate.addUrl(id), width);
      },
      // 添加信息，以tab页展现
      addTab: function (id) {
        $.modal.openTab($.operate.addUrl(id), 'CustomAdd', "添加" + $.table._option.modalName);
      },
      // 添加信息 全屏
      addFull: function (id) {
        var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
        $.modal.openFull("添加" + $.table._option.modalName, url);
      },
      // 添加访问地址
      addUrl: function (id) {
        var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
        return url;
      },
			/**
			 * fix by changtong
			 * add parameter for size of the modal to adjust the requirement
			 */
      addDetail: function (id, width, height, name, url, callback) { //title, url, width, height, callback
        var finalName = name || '添加' + $.table._option.modalName;
        var finalUrl = url || $.operate.addUrl(id);
        $.modal.open(finalName, finalUrl, width, height, callback);
      },

			/**
			 * fix by changtong
			 * add parameter for size of the modal to adjust the requirement
			 */
      editDetail: function (id, width, height, name, url) {
        var finalname = name || "编辑" + $.table._option.modalName;
        var finalUrl = url || $.operate.editUrl(id);
        $.modal.open(finalname, finalUrl, width, height);
      },
      // 修改信息
      edit: function (id, width) {
        if($.common.isEmpty(id) && $.table._option.type == table_type.bootstrapTreeTable) {
          var row = $('#' + $.table._option.id).bootstrapTreeTable('getSelections')[0];
          if($.common.isEmpty(row)) {
            $.modal.alertWarning("请至少选择一条记录");
            return;
          }
          var url = $.table._option.updateUrl.replace("{id}",
            row[$.table._option.uniqueId]);
          $.modal.open("修改" + $.table._option.modalName, url, width);
        } else {
          $.modal.open("修改" + $.table._option.modalName, $.operate.editUrl(id), width);
        }
      },
      // 表格编辑信息
      config: function () {
        if(arguments.length == 1) {
          var row = $('#' + $.table._option.id).bootstrapTreeTable('getSelections')[0];
          if($.common.isEmpty(row)) {
            $.modal.alertWarning("请至少选择一条记录");
            return;
          }
          var paramModes = $.table._option.configUrl.match(/({\w+})/gi);
          var url = $.table._option.configUrl;
          var params = arguments;
          $.each(paramModes, function (i, v) {
            url = url.replace(v, row[v.substr(1, v.length - 2)]);
          });
          $.modal.open(params[0], url);
        } else {
          var paramModes = $.table._option.configUrl.match(/({\w+})/gi);
          var url = $.table._option.configUrl;
          var params = arguments;
          $.each(paramModes, function (i, v) {
            url = url.replace(v, params[i + 1]);
          });
          $.modal.open(params[0], url);
        }
      },
      // 修改信息，以tab页展现
      editTab: function (id) {
        $.modal.openTab($.operate.editUrl(id), 'CustomChange', "修改" + $.table._option.modalName);
      },
      // 修改信息 全屏
      editFull: function (id) {
        var url = "/404.html";
        if($.common.isNotEmpty(id)) {
          url = $.table._option.updateUrl.replace("{id}", id);
        } else {
          var row = $.common.isEmpty($.table._option.uniqueId) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.uniqueId);
          url = $.table._option.updateUrl.replace("{id}", row);
        }
        $.modal.openFull("修改" + $.table._option.modalName, url);
      },
      // 修改访问地址
      editUrl: function (id) {
        var url = "/404.html";
        //				debugger;
        if($.common.isNotEmpty(id)) {
          url = $.table._option.updateUrl.replace("{id}", id);
        } else {
          var id = $.common.isEmpty($.table._option.uniqueId) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.uniqueId);
          if(id.length == 0) {
            $.modal.alertWarning("请至少选择一条记录");
            return;
          }
          url = $.table._option.updateUrl.replace("{id}", id);
        }
        return url;
      },
      // 保存信息
      save: function (url, data) {
        var config = {
          url: url,
          type: "post",
          dataType: "json",
          data: data,
          beforeSend: function () {
            $.modal.loading("正在处理中，请稍后...");
            $.modal.disable();
          },
          success: function (result) {
            $.operate.successCallback(result);
          }
        };
        $.ajax(config)
      },
      saveAsync: function (url, data) { // 同步
        var flag = false;
        var config = {
          url: url,
          type: "post",
          dataType: "json",
          data: data,
          async: false,
          beforeSend: function () {
            $.modal.loading("处理中...");
            $.modal.disable();
          },
          success: function (result) {
            if(result.code == web_status.SUCCESS) {
              var parent = window.parent;
              if(parent.$.table._option.type == table_type.bootstrapTable) {
                $.modal.close();
                parent.$.modal.msgSuccess(result.msg);
                parent.$.table.refresh();
              } else if(parent.$.table._option.type == table_type.bootstrapTreeTable) {
                $.modal.close();
                parent.$.modal.msgSuccess(result.msg);
                parent.$.treeTable.refresh();
              } else {
                $.modal.msgReload("保存成功,正在刷新数据请稍后……", modal_status.SUCCESS);
              }
              flag = true;
            } else if(result.code == web_status.PARAM) {
              var parent = window.parent;
              parent.$.modal.msgSuccess(result.msg);
              parent.$('#' + result.data.id).val(result.data.value);
              flag = false;
            } else {
              $.modal.alertError(result.msg);
              flag = false;
            }
            $.modal.closeLoading();
            $.modal.enable();
          }
        };
        $.ajax(config);
        return flag;
      },
      // 保存选项卡信息
      saveTab: function (url, data) {
        var config = {
          url: url,
          type: "post",
          dataType: "json",
          data: data,
          beforeSend: function () {
            $.modal.loading("正在处理中，请稍后...");
          },
          success: function (result) {
            $.operate.successTabCallback(result);
          }
        };
        $.ajax(config)
      },
      // 保存结果弹出msg刷新table表格
      ajaxSuccess: function (result) {
        if(result.code == web_status.SUCCESS && $.table._option.type == table_type.bootstrapTable) {
          $.modal.msgSuccess(result.msg);
          $.table.refresh();
        } else if(result.code == web_status.SUCCESS && $.table._option.type == table_type.bootstrapTreeTable) {
          $.modal.msgSuccess(result.msg);
          $.treeTable.refresh();
        } else {
          $.modal.alertError(result.msg);
        }
        $.modal.closeLoading();
      },
      // 成功结果提示msg（父窗体全局更新）
      saveSuccess: function (result) {
        if(result.code == web_status.SUCCESS) {
          $.modal.msgReload("保存成功,正在刷新数据请稍后……", modal_status.SUCCESS);
        } else {
          $.modal.alertError(result.msg);
        }
        $.modal.closeLoading();
      },
      // 成功回调执行事件（父窗体静默更新）
      successCallback: function (result) {
        if(result.code == web_status.SUCCESS) {
          var parent = window.parent;
          if(parent.$.table._option.type == table_type.bootstrapTable) {
            $.modal.close();
            parent.$.modal.msgSuccess(result.msg);
            parent.$.table.refresh();
          } else if(parent.$.table._option.type == table_type.bootstrapTreeTable) {
            $.modal.close();
            parent.$.modal.msgSuccess(result.msg);
            parent.$.treeTable.refresh();
          } else {
            $.modal.msgReload("保存成功,正在刷新数据请稍后……", modal_status.SUCCESS);
          }
        } else if(result.code == web_status.PARAM) {
          var parent = window.parent;
          parent.$.modal.msgSuccess(result.msg);
          parent.$('#' + result.data.id).val(result.data.value);
        } else {
          $.modal.alertError(result.msg);
        }
        $.modal.closeLoading();
        $.modal.enable();
      },
      // 选项卡成功回调执行事件（父窗体静默更新）
      successTabCallback: function (result) {
        if(result.code == web_status.SUCCESS) {
          var topWindow = $(window.parent.document);
          var currentId = $('.page-tabs-content', topWindow).find('.active').attr('data-panel');
          var $contentWindow = $('.RuoYi_iframe[name="' + currentId + '"]', topWindow)[0].contentWindow;
          $.modal.close();
          $contentWindow.$.modal.msgSuccess(result.msg);
          $contentWindow.$(".layui-layer-padding").removeAttr("style");
          if($contentWindow.$.table._option.type == table_type.bootstrapTable) {
            $contentWindow.$.table.refresh();
          } else if($contentWindow.$.table._option.type == table_type.bootstrapTreeTable) {
            $contentWindow.$.treeTable.refresh();
          }
          closeItem();
        } else {
          $.modal.alertError(result.msg);
        }
        $.modal.closeLoading();
      }
    },
    // 校验封装处理
    validate: {
      // 判断返回标识是否唯一 false 不存在 true 存在
      unique: function (value) {
        if(value == "0") {
          return true;
        }
        return false;
      },
      // 表单验证
      form: function (formId) {
        var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
        return $("#" + currentId).validate().form();
      }
    },
    // 树插件封装处理
    tree: {
      _option: {},
      _lastValue: {},
      // 初始化树结构
      init: function (options) {
        var defaults = {
          id: "tree", // 属性ID
          expandLevel: 0, // 展开等级节点
          view: {
            selectedMulti: false, // 设置是否允许同时选中多个节点
            nameIsHTML: true
            // 设置 name 属性是否支持 HTML 脚本
          },
          check: {
            enable: false, // 置 zTree 的节点上是否显示 checkbox / radio
            nocheckInherit: true, // 设置子节点是否自动继承
          },
          data: {
            key: {
              title: "title" // 节点数据保存节点提示信息的属性名称
            },
            simpleData: {
              enable: true
              // true / false 分别表示 使用 / 不使用 简单数据模式
            }
          },
        };
        var options = $.extend(defaults, options);
        $.tree._option = options;
        // 树结构初始化加载
        var setting = {
          callback: {
            onClick: options.onClick, // 用于捕获节点被点击的事件回调函数
            onCheck: options.onCheck, // 用于捕获 checkbox /
            // radio 被勾选 或
            // 取消勾选的事件回调函数
            onDblClick: options.onDblClick
            // 用于捕获鼠标双击之后的事件回调函数
          },
          check: options.check,
          view: options.view,
          data: options.data
        };
        $.get(options.url, function (data) {
          var treeId = $("#treeId").val();
          tree = $.fn.zTree.init($("#" + options.id), setting, data);
          $._tree = tree;
          var nodes = tree.getNodesByParam("level", options.expandLevel - 1);
          for(var i = 0; i < nodes.length; i++) {
            tree.expandNode(nodes[i], true, false, false);
          }
          var node = tree.getNodesByParam("id", treeId, null)[0];
          $.tree.selectByIdName(treeId, node);
        });
      },
      // 搜索节点
      searchNode: function () {
        // 取得输入的关键字的值
        var value = $.common.trim($("#keyword").val());
        if($.tree._lastValue == value) {
          return;
        }
        // 保存最后一次搜索名称
        $.tree._lastValue = value;
        var nodes = $._tree.getNodes();
        // 如果要查空字串，就退出不查了。
        if(value == "") {
          $.tree.showAllNode(nodes);
          return;
        }
        $.tree.hideAllNode(nodes);
        // 根据搜索值模糊匹配
        $.tree.updateNodes($._tree.getNodesByParamFuzzy("name", value));
      },
      // 根据Id和Name选中指定节点
      selectByIdName: function (treeId, node) {
        if($.common.isNotEmpty(treeId) && node && treeId == node.id) {
          $._tree.selectNode(node, true);
        }
      },
      // 显示所有节点
      showAllNode: function (nodes) {
        nodes = $._tree.transformToArray(nodes);
        for(var i = nodes.length - 1; i >= 0; i--) {
          if(nodes[i].getParentNode() != null) {
            $._tree.expandNode(nodes[i], true, false, false, false);
          } else {
            $._tree.expandNode(nodes[i], true, true, false, false);
          }
          $._tree.showNode(nodes[i]);
          $.tree.showAllNode(nodes[i].children);
        }
      },
      // 隐藏所有节点
      hideAllNode: function (nodes) {
        var tree = $.fn.zTree.getZTreeObj("tree");
        var nodes = $._tree.transformToArray(nodes);
        for(var i = nodes.length - 1; i >= 0; i--) {
          $._tree.hideNode(nodes[i]);
        }
      },
      // 显示所有父节点
      showParent: function (treeNode) {
        var parentNode;
        while((parentNode = treeNode.getParentNode()) != null) {
          $._tree.showNode(parentNode);
          $._tree.expandNode(parentNode, true, false, false);
          treeNode = parentNode;
        }
      },
      // 显示所有孩子节点
      showChildren: function (treeNode) {
        if(treeNode.isParent) {
          for(var idx in treeNode.children) {
            var node = treeNode.children[idx];
            $._tree.showNode(node);
            $.tree.showChildren(node);
          }
        }
      },
      // 更新节点状态
      updateNodes: function (nodeList) {
        $._tree.showNodes(nodeList);
        for(var i = 0, l = nodeList.length; i < l; i++) {
          var treeNode = nodeList[i];
          $.tree.showChildren(treeNode);
          $.tree.showParent(treeNode)
        }
      },
      // 获取当前被勾选集合
      //add tips by ct
      //当有2颗树存在时，$._tree存的是最新加载树的数据，老的树需要利用原生API 调用
      getCheckedNodes: function (column) {
        var _column = $.common.isEmpty(column) ? "id" : column;
        var nodes = $._tree.getCheckedNodes(true);
        var newArr = [];
        for(var i = 0; i < nodes.length; i++) {
          if(nodes[i].check_Child_State == -1 || nodes[i].check_Child_State == 2) {
            newArr.push(nodes[i]);
          }
        }
				/*nodes = nodes.filter(function(value, index, array){
					return  value.check_Child_State == -1 || value.check_Child_State == 2 ;
				})*/
        return $.map(newArr, function (row) {
          return row[_column];
        }).join();
      },

      //=> {return value[_column];}).join();
      // return $.map(nodes, function(row) {
      // 	return row[_column];
      // }).join();
      getDefaultCheckedNodes: function (column) {
        var _column = $.common.isEmpty(column) ? "id" : column;
        var nodes = $._tree.getCheckedNodes(true);
        return $.map(nodes, function (row) {
          return row[_column];
        }).join();
      },
      //add function by ct
      //the purpose is selecting the changing nodes by sending the form
      //when the children's nodes are checked,the node's check_Child_State ==2 ,add this node
      getChangeCheckedNodes: function (column) {
        var _column = $.common.isEmpty(column) ? "id" : column;
        var nodes = $._tree.getChangeCheckedNodes();
        console.log(nodes);
        return $.map(nodes, function (row) {
          if(row.check_Child_State == 1) {

          } else if(row.check_Child_State == 2) {
            return row[_column];
          } else {
            return row[_column];
          }
        }).join();
      },
      // 不允许根父节点选择
      notAllowParents: function (_tree) {
        var nodes = _tree.getSelectedNodes();
        for(var i = 0; i < nodes.length; i++) {
          if(nodes[i].level == 0) {
            $.modal.msgError("不能选择根节点（" + nodes[i].name + "）");
            return false;
          }
          // if (nodes[i].isParent) {
          // 	$.modal.msgError("不能选择父节点（" + nodes[i].name + "）");
          // 	return false;
          // }
        }
        return true;
      },
      // 不允许最后层级节点选择
      notAllowLastLevel: function (_tree) {
        var nodes = _tree.getSelectedNodes();
        for(var i = 0; i < nodes.length; i++) {
          if(nodes[i].level == nodes.length + 1) {
            $.modal.msgError("不能选择最后层级节点（" + nodes[i].name + "）");
            return false;
          }
        }
        return true;
      },
      // 隐藏/显示搜索栏
      toggleSearch: function () {
        $('#search').slideToggle(200);
        $('#btnShow').toggle();
        $('#btnHide').toggle();
        $('#keyword').focus();
      },
      // 折叠
      collapse: function () {

        $._tree.expandAll(false);
      },
      // 展开
      expand: function () {
        $._tree.expandAll(true);
      }
    },
    // 通用方法封装处理
    common: {
      // 判断字符串是否为空
      isEmpty: function (value) {
        if(value == null || this.trim(value) == "") {
          return true;
        }
        return false;
      },
      // 判断一个字符串是否为非空串
      isNotEmpty: function (value) {
        return !$.common.isEmpty(value);
      },
      // 空对象转字符串
      nullToStr: function (value) {
        if($.common.isEmpty(value)) {
          return "-";
        }
        return value;
      },
      // 是否显示数据 为空默认为显示
      visible: function (value) {
        if($.common.isEmpty(value) || value == true) {
          return true;
        }
        return false;
      },
      // 空格截取
      trim: function (value) {
        if(value == null) {
          return "";
        }
        return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
      },
      // 指定随机数返回
      random: function (min, max) {
        return Math.floor((Math.random() * max) + min);
      },
      // 判断字符串是否是以start开头
      startWith: function (value, start) {
        var reg = new RegExp("^" + start);
        return reg.test(value)
      },
      // 判断字符串是否是以end结尾
      endWith: function (value, end) {
        var reg = new RegExp(end + "$");
        return reg.test(value)
      }
    }
  });
})(jQuery);

/** 表格类型 */
table_type = {
  bootstrapTable: 0,
  bootstrapTreeTable: 1
};

/** 消息状态码 */
web_status = {
  SUCCESS: 0,
  FAIL: 500,
  PARAM: 200

};

/** 弹窗状态码 */
modal_status = {
  SUCCESS: "success",
  FAIL: "error",
  WARNING: "warning"
};