/*
 * @Descripttion: 字段管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-17 10:41:54
 * @LastEditTime: 2020-04-17 14:30:51
 */

var tableFiledManage = {
  init: function () {
    this.initLayui();
    this.initTable();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(tablefiledSearch)', function (data) {
        console.log('最终的提交信息', JSON.stringify(data.field))

        return false;
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'tablefiledTable',
      url: ctx + '/tableFiledInfo/selectByPage', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#tablefiledTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#tablefiledTable').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: 'areaType',
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
          title: '归属数据库名称',
          halign: 'center',
        },
        {
          field: '',
          title: '归属数据库IP',
          halign: 'center',
        },
        {
          field: '',
          title: '归属表',
          halign: 'center',
        },
        {
          field: '',
          title: '字段英文名',
          halign: 'center',
        },
        {
          field: '',
          title: '字段中文名',
          halign: 'center',
        },
        {
          field: '',
          title: '字段类型',
          halign: 'center',
        },
        {
          field: '',
          title: '字段分类',
          halign: 'center',
        },
        {
          field: '',
          title: '是否主键',
          align: 'center',
        },
        {
          field: '',
          title: '是否可空',
          halign: 'center',
        },
        {
          field: '',
          title: '是否外键',
          align: 'center',
        },
        {
          field: '',
          title: '外键表英文名',
          align: 'center',
        },
        {
          field: '',
          title: '安全等级',
          align: 'center',
        },
        {
          field: '',
          title: '字段备注',
          align: 'center',
        },
        {
          field: '',
          title: '业务描述',
          align: 'center',
        },
        {
          field: '',
          title: '错误信息',
          halign: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 140,
          formatter: function (value, row, index) {
            var actions = '<div class="operate" style="width: 140px;">' +
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
  tableFiledManage.init();
})