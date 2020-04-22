/*
 * @Descripttion: 外部数据管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-17 14:50:35
 * @LastEditTime: 2020-04-17 14:54:41
 */

var extraDataManage = {
  init: function () {
    this.initLayui();
    this.initTable();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(extraDataSearch)', function (data) {
        console.log('最终的提交信息', JSON.stringify(data.field))

        return false;
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'extraDataTable',
      url: ctx + '/extraDataInfo/selectByPage', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#extraDataTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#extraDataTable').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: 'systemId',
          title: '系统唯一标识',
          halign: 'center',
        },
        {
          field: 'extraType',
          title: '外部数据种类',
          halign: 'center',
        },
        {
          field: 'extraProvide',
          title: '外部数据提供机构',
          halign: 'center',
        },
        {
          field: 'extraCollect',
          title: '采购周期（单位：天）',
          halign: 'center',
        },
        {
          field: 'extraUpdata',
          title: '外部数据提供机构',
          halign: 'center',
        },
        {
          field: 'expirTime',
          title: '外部数据采购周期（天）',
          halign: 'center',
        },
        {
          field: 'expirTime',
          title: '到期时间',
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
  extraDataManage.init();
})
