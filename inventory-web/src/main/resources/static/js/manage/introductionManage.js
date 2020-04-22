/*
 * @Descripttion: 接口管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-17 14:43:21
 * @LastEditTime: 2020-04-17 14:48:24
 */

var introductionManage = {
  init: function () {
    this.initLayui();
    this.initTable();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(introductionSearch)', function (data) {
        console.log('最终的提交信息', JSON.stringify(data.field))

        return false;
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'introductionTable',
      url: ctx + '/introductionInfo/selectByPage', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#introductionTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#introductionTable').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: '',
          title: '省份',
          halign: 'center',
        },
        {
          field: '',
          title: '系统盘点责任部门组织层次',
          halign: 'center',
        },
        {
          field: '',
          title: '归属系统',
          halign: 'center',
        },
        {
          field: '',
          title: '对接系统',
          halign: 'center',
        },
        {
          field: '',
          title: '接口名称',
          halign: 'center',
        },
        {
          field: '',
          title: '接口类型',
          halign: 'center',
        },
        {
          field: '',
          title: '本端接口地址',
          halign: 'center',
        },
        {
          field: '',
          title: '对端接口地址',
          halign: 'center',
        },
        {
          field: '',
          title: '接口发布域',
          halign: 'center',
        },
        {
          field: '',
          title: '传输方向',
          halign: 'center',
        },
        {
          field: '',
          title: '接口协议类型',
          align: 'center',
        },
        {
          field: '',
          title: '接口传送频率',
          halign: 'center',
        },
        {
          field: '',
          title: '涉及本端系统的表或文件名',
          align: 'center',
        },
        {
          field: '',
          title: '接口交互描述',
          halign: 'center',
        },
        {
          field: '',
          title: '错误信息',
          halign: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          formatter: function (value, row, index) {
            var actions = '<div class="operate" style="width: 80px;">' +
              '	<a title="查看">查看</a> ' +
              '	<a title="删除"> &frasl; 删除</a>' +
              '</div>';
            return actions;
          }
        }
      ]
    }
    $.table.init(options);
  },
}

$(function () {
  introductionManage.init();
})
