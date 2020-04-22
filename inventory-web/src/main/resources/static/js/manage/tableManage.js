/*
 * @Descripttion: 表管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-16 19:24:43
 * @LastEditTime: 2020-04-21 21:07:00
 */

var tableManage = {
  init: function () {
    this.getUrlParams();
    this.initLayui();
    this.initTable();
  },
  // 获取url路径后面的参数
  getUrlParams: function () {
    var databaseParams = publicFnc.getQueryVariable("databaseParams"); // 点击菜单:false, 如果是从系统管理等表格操作栏点击进来 会有具体系统id值
    databaseParams = JSON.parse(decodeURI(databaseParams));
    if(databaseParams) {
      $('#databaseId').val(databaseParams.databaseId);
      $('#databaseName').val(databaseParams.databaseName);
    }
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听提交
      form.on('submit(tableManageSearch)', function (data) {
        console.log('最终的提交信息', JSON.stringify(data.field))

        return false;
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'tableManageTable',
      url: ctx + '/tableInfo/selectByPage', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#tableManageTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#tableManageTable').bootstrapTable('getOptions').pageNumber;
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
          title: '归属数据库用户名',
          halign: 'center',
        },
        {
          field: '',
          title: '表英文名',
          halign: 'center',
        },
        {
          field: '',
          title: '表中文名',
          halign: 'center',
        },
        {
          field: '',
          title: '表简介',
          halign: 'center',
        },
        {
          field: '',
          title: '表所属主题域分类',
          halign: 'center',
        },
        {
          field: '',
          title: '表大小(MB)',
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
              '	<a title="查看字段">&frasl; 查看字段</a> ' +
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
  tableManage.init();
})