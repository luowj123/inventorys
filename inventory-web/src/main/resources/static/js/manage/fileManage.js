/*
 * @Descripttion: 文件管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-17 14:33:51
 * @LastEditTime: 2020-04-17 14:40:49
 */

var fileManage = {
  init: function () {
    this.initLayui();
    this.initTable();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(fileSearch)', function (data) {
        console.log('最终的提交信息', JSON.stringify(data.field))

        return false;
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'fileTable',
      url: ctx + '/fileInfo/selectByPage', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#fileTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#fileTable').bootstrapTable('getOptions').pageNumber;
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
          title: 'IP地址',
          halign: 'center',
        },
        {
          field: '',
          title: '目录',
          halign: 'center',
        },
        {
          field: '',
          title: '文件英文名',
          halign: 'center',
        },
        {
          field: '',
          title: '文件中文名',
          halign: 'center',
        },
        {
          field: '',
          title: '文件简介',
          halign: 'center',
        },
        {
          field: '',
          title: '文件类型',
          halign: 'center',
        },
        {
          field: '',
          title: '文件所属主题域分类',
          halign: 'center',
        },
        {
          field: '',
          title: '存储周期',
          halign: 'center',
        },
        {
          field: '',
          title: '目录存储（单位M）',
          align: 'center',
        },
        {
          field: '',
          title: '归属系统唯一标识',
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
  fileManage.init();
})