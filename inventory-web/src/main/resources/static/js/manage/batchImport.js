/*
 * @Descripttion: 批量导入
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-16 15:49:50
 * @LastEditTime: 2020-04-20 21:07:01
 */

var batchImport = {
  init: function () {
    this.initLayui();
    this.initTable();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form', 'upload'], function () {
      var form = layui.form,
        upload = layui.upload;
      var search = {}; // 获取form表单值
      var model=document.getElementById("model").selectedIndex;
      //选完文件后不自动上传
      upload.render({
        elem: '#chosseFile',
        url: ctx + '/Import/exImport', //上传接口
        auto: false, // 不自动上传
        accept: 'file', // 指定允许上传时校验的文件类型 images（图片）、file（所有文件）、video（视频）、audio（音频）
        drag: false, // 是否接受拖拽上传
        bindAction: '#uploadFile',
//        data: {"model":model} ,
        choose: function (obj) { // 选择文件的回调
          // var files = obj.pushFile();
          obj.preview(function (index, file, result) {
            //index:文件索引 file:文件对象 result:文件base64编码
            $('.checkFile').val(file.name);
          })
        },
        before: function (obj) { // 上传前的回调 拼接参数
          var search = {}; // 获取form表单值
          $.each($('.importForm').serializeArray(), function (i, field) {
            search[field.name] = field.value;
          });
          obj.preview(function (index, file, result) {
            //index:文件索引 file:文件对象 result:文件base64编码
            console.log(file); //得到文件对象
            file.model = search.model; // 将form表单值追加到file里面
            console.log(file)
          })
        },
        done: function (res) {
          console.log('上传成功', res)
        }
      });
    })
  },
  // 初始化表格
  initTable: function () {
    var options = {
      id: 'importTable',
      url: '', // 请求路径
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#importTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#importTable').bootstrapTable('getOptions').pageNumber;
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
          title: '大系统名称',
          halign: 'center',
        },
        {
          field: '',
          title: '子系统名称',
          halign: 'center',
        },
        {
          field: '',
          title: '系统唯一标识',
          halign: 'center',
        },
        {
          field: '',
          title: '资产状态',
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
              '	<a title="删除">删除</a>' +
              '</div>';
            return actions;
          }
        }
      ]
    }
    $.table.init(options);
  },
  // 模板下载
  downloadTmp: function () {
    console.log('下载模板')
  }
}

$(function () {
  batchImport.init();
})