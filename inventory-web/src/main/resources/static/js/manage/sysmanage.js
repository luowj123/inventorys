/*
 * @Descripttion: 系统管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-15 16:55:31
 * @LastEditTime: 2020-04-21 20:58:13
 */

var sysManage = {
  init: function () {
    this.initLayui();
    this.getTableHeight();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;
      //监听提交
      form.on('submit(sysSearch)', function (data) {
        var params = data.field;
        var opt = {
          url: ctx + "systemInfo/selectByPage",
          silent: true,
          query: params
        };

        //带参数 刷新
        $("#sysTable").bootstrapTable('showLoading');
        $("#sysTable").bootstrapTable('refresh', opt);

        return false;
      });
    })
  },
  // 获取表格高度
  getTableHeight: function () {
    var rowHeight = $('.select-table').parent().height();
    var formHeight = $('.search-collapse').height();
    sysManage.height = rowHeight - formHeight - 48;
    sysManage.initTable();
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'sysTable',
      url: ctx + 'systemInfo/selectByPage', // 请求路径
      height: sysManage.height,
      queryParams: function (params) { // 传递参数查询参数
        var search = {};
        $.each($(".systemInfoForm").serializeArray(), function (i, field) {
          search[field.name] = field.value;
        });
        search.pageSize = params.limit;
        search.pageNum = params.offset / params.limit + 1;
        return search;
      },
      onLoadSuccess: function (data) {
        $("#sysTable").bootstrapTable('hideLoading');
      },
      columns: [{
        title: '序号',
        align: 'center',
        formatter: function (value, row, index) {
          // 获取每页显示的数量
          var pageSize = $('#sysTable').bootstrapTable(
            'getOptions').pageSize;
          // 获取当前是第几页
          var pageNumber = $('#sysTable').bootstrapTable(
            'getOptions').pageNumber;
          // 返回序号，注意index是从0开始的，所以要加上1
          return pageSize * (pageNumber - 1) + index + 1;
        }
      },
      {
        field: 'systemId',
        title: '系统编号（PK）',
        halign: 'center',
      },
      {
        field: 'provinceName',
        title: '省份（集团部门、专业公司）',
        halign: 'center',
      },
      {
        field: 'deptPiLev',
        title: '系统盘点责任部门组织层次',
        halign: 'center',
      },
      {
        field: 'praSystemName',
        title: '系统名称',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemName',
        title: '子系统名称',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemPk',
        title: '系统唯一标识',
        halign: 'center',
      },
      {
        field: 'systemAbbreviation',
        title: '系统简称',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemContext',
        title: '系统简介',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemType',
        title: '系统分类',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 120px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemDeptBuild',
        title: '系统承建部门',
        halign: 'center',
      },
      {
        field: 'systemDeptManag',
        title: '系统管理部门',
        halign: 'center',
      },
      {
        field: 'systemManager',
        title: '系统管理负责人',
        halign: 'center',
      },
      {
        field: 'systemManagerPhone',
        title: '系统管理负责人联系电话',
        halign: 'center',
      },
      {
        field: 'systemDeptOper',
        title: '系统运营部门',
        halign: 'center',
      },
      {
        field: 'systemOperator',
        title: '系统运营负责人',
        halign: 'center',
      },
      {
        field: 'systemOperatorPhone',
        title: '系统运营负责人联系电话',
        halign: 'center',
      },
      {
        field: 'systemFirmBuild',
        title: '承建厂商',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemDeptUse',
        title: '系统使用部门',
        halign: 'center',
      },
      {
        field: 'systemDeptStock',
        title: '系统盘点责任部门',
        halign: 'center',
      },
      {
        field: 'systemStockist',
        title: '系统盘点负责人',
        halign: 'center',
      },
      {
        field: 'systemStockistPhone',
        title: '系统盘点负责人联系电话',
        halign: 'center',
      },
      {
        field: 'systemIpAddress',
        title: '系统IP地址',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemFuncType',
        title: '系统功能类型',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemStorage',
        title: '存储方式',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },

      {
        field: 'dataApplication',
        title: '系统数据应用情况',
        halign: 'center',
      },
      {
        field: 'systemUptime',
        title: '系统上线时间',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'reply',
        title: '系统工程批复信息',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'systemReDwTime',
        title: '系统预计下线时间',
        halign: 'center',
      },
      {
        field: 'systemData',
        title: '本系统生成的数据',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'collectionData',
        title: '从其他系统采集的数据',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'dataToOtherSys',
        title: '向其他系统提供的数据',
        halign: 'center',
        formatter: function (value, row, index) {
          var text = '<span title="' + value + '" class="colFont" style=" width: 150px; ">' + value + '</span>';
          return text;
        }
      },
      {
        field: 'importData',
        title: '系统重要数据资产',
        halign: 'center',
      },
      {
        field: 'inProvinceData',
        title: '入省大数据平台的数据',
        halign: 'center',
      },
      {
        field: 'inBlocData',
        title: '入集团大数据平台的数据',
        halign: 'center',
      },
      {
        field: 'includeSensitiveField',
        title: '是否含敏感字段',
        halign: 'center',
      },
      {
        field: 'sensitiveField',
        title: '主要敏感字段',
        halign: 'center',
      },
      {
        field: 'externalData',
        title: '是否购置外部数据',
        halign: 'center',
      },
      {
        field: 'externalDataType',
        title: '外部数据种类',
        halign: 'center',
      },
      {
        title: '操作',
        align: 'center',
        formatter: function (value, row, index) {
          var actions = '<div class="operate" style="width: 200px;">'
            + '	<a title="查看">查看</a> '
            + '	<a title="查看数据库" onclick="sysManage.viewOthers(\'dataBase\',\'' + row.systemId + '\',\'' + row.systemName + '\')">&frasl; 数据库</a> '
            + '	<a title="查看文件" onclick="sysManage.viewOthers(\'file\',\'' + row.systemId + '\',\'' + row.systemName + '\')">&frasl; 文件</a> '
            + '	<a title="查看外部数据" onclick="sysManage.viewOthers(\'extraData\',\'' + row.systemId + '\',\'' + row.systemName + '\')">&frasl; 外部数据</a> '
            + '	<a title="删除" onclick="sysManage.deletSystem(\'' + row.systemId + '\')"> &frasl; 删除</a>'
            + '</div>';
          return actions;
        }
      }]
    }
    $.table.init(options);
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
  // 查看相关管理页面
  viewOthers: function (type, systemId, systemName) {
    var dataUrl = '', dataIndex = '', menuName = '';
    var systemParams = encodeURI(JSON.stringify({
      systemId: systemId,
      systemName: systemName
    }))
    if(type == 'dataBase') {
      dataUrl = ctx + 'main/databaseManage?systemParams=' + systemParams;
      dataIndex = '2';
      menuName = '数据库管理';
    } else if(type == 'file') {
      dataUrl = ctx + 'main/fileManage?systemParams=' + systemParams;
      dataIndex = '7';
      menuName = '文件管理';
    } else if(type == 'extraData') {
      dataUrl = ctx + 'main/extraDataManage?systemParams=' + systemParams;
      dataIndex = '8';
      menuName = '外部数据管理';
    }
    createMenuItem(dataUrl, dataIndex, menuName);
  },
  // 删除
  deletSystem: function (systemId) {
    $.modal.confirm('', '确定删除该条数据?', function () {
      $.modal.loading('删除中...');
      $.ajax({
        type: "POST",
        url: ctx + 'systemInfo/delete',
        data: {
          systemId: systemId
        },
        success: function (res) {
          $.modal.closeLoading();
          if(res.code == 0) {
            $.modal.msgSuccess('删除成功');
            // 刷新表格
            var opt = {
              url: ctx + "systemInfo/selectByPage",
              silent: true
            };
            $("#sysTable").bootstrapTable('showLoading');
            $("#sysTable").bootstrapTable('refresh', opt);
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
  }
}

$(function () {
  sysManage.init();
})