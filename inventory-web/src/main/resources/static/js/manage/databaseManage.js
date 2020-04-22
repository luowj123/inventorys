/*
 * @Descripttion: 数据库管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-16 17:09:40
 * @LastEditTime: 2020-04-21 21:04:12
 */

var databaseManage = {
  init: function () {
    this.initLayui();
    this.getUrlParams();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(databaseSearch)', function (data) {
        var params = data.field;
        var opt = {
          url: ctx + "/databaseInfo/selectByPage",
          silent: true,
          query: params
        };

        //带参数 刷新
        $("#databaseTable").bootstrapTable('showLoading');
        $("#databaseTable").bootstrapTable('refresh', opt);

        return false;
      });
    })
  },
  // 获取url路径后面的参数
  getUrlParams: function () {
    var systemParams = publicFnc.getQueryVariable("systemParams"); // 点击菜单:false, 如果是从系统管理等表格操作栏点击进来 会有具体系统id值
    systemParams = JSON.parse(decodeURI(systemParams));
    if(systemParams) {
      $('#systemId').val(systemParams.systemId);
      $('#systemName').val(systemParams.systemName);
    }
    this.getTableHeight();
  },
  // 获取表格高度
  getTableHeight: function () {
    var rowHeight = $('.select-table').parent().height();
    var formHeight = $('.search-collapse').height();
    databaseManage.height = rowHeight - formHeight - 48;
    databaseManage.initTable();
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'databaseTable',
      url: ctx + 'databaseInfo/selectByPage', // 请求路径
      height: databaseManage.height,
      queryParams: function (params) { // 传递参数查询参数
        var search = {};
        $.each($(".databaseForm").serializeArray(), function (i, field) {
          search[field.name] = field.value;
        });
        search.pageSize = params.limit;
        search.pageNum = params.offset / params.limit + 1;
        return search;
      },
      onLoadSuccess: function (data) {
        $("#databaseTable").bootstrapTable('hideLoading');
      },
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#databaseTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#databaseTable').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: 'databaseType',
          title: '数据库类型',
          halign: 'center',
        },
        {
          field: 'databaseIp',
          title: '分布式填客户端IP',
          halign: 'center',
        },
        {
          field: 'databaseName',
          title: '数据库的实例名称',
          halign: 'center',
        },
        {
          field: 'databaseVersion',
          title: '数据库版本号',
          halign: 'center',
        },
        {
          field: 'datebasePort',
          title: '数据库对外服务端口',
          halign: 'center',
        },
        {
          field: 'databaseCapacity',
          title: '存储的容量（单位G）',
          halign: 'center',
        },
        {
          field: 'storageAddress',
          title: '数据库数据目录',
          halign: 'center',
        },
        {
          field: 'clusterMode',
          title: '是否是集群',
          halign: 'center',
        },
        {
          field: 'clusterMode',
          title: '数据库容量（G）',
          halign: 'center',
        },
        {
          field: 'systemId',
          title: '所属的子系统唯一标识',
          halign: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 140,
          formatter: function (value, row, index) {
            var actions = '<div class="operate" style="width: 140px;">' +
              '	<a title="查看">查看</a> ' +
              '	<a title="查看相关表" onclick="databaseManage.viewOthers(\'' + row.databaseId + '\',\'' + row.databaseName + '\')">&frasl; 相关表</a> ' +
              '	<a title="删除" onclick="databaseManage.deleteRow(\'' + row.databaseId + '\')"> &frasl; 删除</a>' +
              '</div>';
            return actions;
          }
        }
      ]
    }
    $.table.init(options);
  },
  // 跳转到表管理页面
  viewOthers: function (databaseId, databaseName) {
    var databaseParams = encodeURI(JSON.stringify({
      databaseId: databaseId,
      databaseName: databaseName
    }))
    var dataUrl = ctx + 'main/tableManage?databaseParams=' + databaseParams;
    var dataIndex = '6';
    var menuName = '数据表管理';
    createMenuItem(dataUrl, dataIndex, menuName);
  },
  // 删除数据
  deleteRow: function (databaseId) {
    $.modal.confirm('', '确定删除该条数据?', function () {
      $.modal.loading('删除中...');
      $.ajax({
        type: "POST",
        url: ctx + 'databaseInfo/delete',
        data: {
          databaseId: databaseId
        },
        success: function (res) {
          $.modal.closeLoading();
          if(res.code == 0) {
            $.modal.msgSuccess('删除成功');
            // 刷新表格
            var opt = {
              url: ctx + "databaseInfo/selectByPage",
              silent: true
            };
            $("#databaseTable").bootstrapTable('showLoading');
            $("#databaseTable").bootstrapTable('refresh', opt);
          } else {
            $.modal.msgError(res.msg); // 错误提示信息
          }
        },
        error: function () {
          $.modal.closeLoading();
          $.modal.msgError('请求失败，请稍后重试'); // 错误提示信息
        }
      })
    })
  },
  // 手工录入
  entering: function () {
    var dataUrl = ctx + 'main/entering';
    var dataIndex = '3';
    var menuName = '资产录入';
    createMenuItem(dataUrl, dataIndex, menuName);
  },
  // 批量导入
  batchImport: function () {
    var dataUrl = ctx + 'main/batchImport';
    var dataIndex = '4';
    var menuName = '批量导入';
    createMenuItem(dataUrl, dataIndex, menuName);
  },
  // 查询系统名称
  getSystemName: function () {
    var systemId = $('#systemId').val();
    $.modal.openWin({
      content: ctx + 'main/searchSystem?systemId=' + systemId,
      btn2: function (index, layero) { // 确定
        var iframeWin = layero.find('iframe')[0];
        var selections = iframeWin.contentWindow.searchSystem.submitHandler();
        if(selections.length == 0) {
          $.modal.alertWarning('请选择系统');
          return false;
        }
        $('#systemId').val(selections[0].systemId);
        $('#systemName').val(selections[0].systemName);
      }
    });
  },
}

$(function () {
  databaseManage.init();
})