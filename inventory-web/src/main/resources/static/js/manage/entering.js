/*
 * @Descripttion: 手工录入
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-16 09:28:55
 * @LastEditTime: 2020-04-20 17:17:15
 */

var entering = {
  init: function () {
    this.initLayui();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['element', 'form'], function () {
      var element = layui.element, //Tab的切换功能，切换事件监听等，需要依赖element模块
        form = layui.form; // form表单
      //监听系统录入提交
      form.on('submit(system)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "systemInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      //监听数据库录入提交
      form.on('submit(databaseInfo)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "databaseInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      //监听表录入提交
      form.on('submit(tableInfo)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "tableInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      //监听数据库录入提交
      form.on('submit(tableFiledInfo)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "tableFiledInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      //监听数据库录入提交
      form.on('submit(extraDataInfo)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "extraDataInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      //监听数据库录入提交
      form.on('submit(introductionInfo)', function (data) {
        console.log('最终的提交信息1', JSON.stringify(data.field))

        toolMethod.sendPostRequest(ctx + "introductionInfo/insert", true, data.field, function (result) {
          if(result.code == '000') {
            console.error("保存成功!");//清空数据
          } else {
            console.error("保存失败!");//提示
          }
        });

        return false;
      });

      // 监听tab页切换
      element.on('tab(enteringTab)', function (data) {
        // console.log(data.elem);

        if(Array.from($('.layui-show').find('.langLable')).length == 0) { // 调整三列一行的input框宽度
          var width = $('.layui-show .layui-inline').width();
          $('.layui-show .layui-inline .form-textarea').width(width * 2 + 246);
        }
      });
    })
    this.updateDomWidth();
  },
  // 动态更新输入框宽度
  updateDomWidth: function () {
    var width = $('.layui-inline').width();
    $('.form-textarea').width(width + 218);
  },
  // 批量导入
  batchImport: function () {
    var dataUrl = ctx + '/main/batchImport';
    var dataIndex = '4';
    var menuName = '批量导入';
    createMenuItem(dataUrl, dataIndex, menuName);
  },
  // 查询系统名称
  getSystemName: function (type) {
    $.modal.openWin({
      type: 1,
      content: $('#systemBox'),
      success: function (layero, index) {// 弹出后回调
        $('#systemBox').removeClass('hide');
        entering.initSystemTable(); // 初始化维度表
      },
      end: function () {// 弹框销毁后回调
        $('#systemBox').addClass('hide');
        $.form.reset('systemForm'); // 重置维度查询信息
        $.table.destroy('systemList'); // 销毁维度表
      },
      btn2: function (index, layero) { // 确定
        var selections = $('#systemList').bootstrapTable('getSelections');
        console.log('选中的系统:', selections);
        if(selections.length == 0) {
          $.modal.alertWarning('请选择系统');
          return false;
        }
        entering.setSystem(type, selections);
      }
    });
  },
  // 给归属系统添加值
  setSystem: function (type, selections) {
    if(type == 'database') {
      $('#databaseSystemId').val(selections[0].systemId);
      $('#databaseSystemName').val(selections[0].systemName);
    } else if(type == 'tableInfo') {
      $('#tableInfoSystemId').val(selections[0].systemId);
      $('#tableInfoSystemName').val(selections[0].systemName);
    } else if(type == 'tableFiledInfo') {
      $('#tableFiledInfoSystemId').val(selections[0].systemId);
      $('#tableFiledInfoSystemName').val(selections[0].systemName);
    } else if(type == 'fileInfo') {
      $('#fileInfoSystemId').val(selections[0].systemId);
      $('#fileInfoSystemName').val(selections[0].systemName);
    } else if(type == 'introductionInfo') {
      $('#introductionInfoSystemId').val(selections[0].systemId);
      $('#introductionInfoSystemName').val(selections[0].systemName);
    } else if(type == 'extraDataInfo') {
      $('#extraDataInfoSystemId').val(selections[0].systemId);
      $('#extraDataInfoSystemName').val(selections[0].systemName);
    }
  },
  // 初始化系统表
  initSystemTable: function () {
    var options = {
      id: 'systemList',
      url: ctx + '/systemInfo/selectByPage', // 请求路径
      showSearch: false,
      showRefresh: false,
      showColumns: false,
      toolbar: '',
      columns: [
        {
          radio: true,
          halign: 'center',
          /* formatter: function (value, row, index) {

          } */
        },
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#systemList').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#systemList').bootstrapTable('getOptions').pageNumber;
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
          field: 'systemName',
          title: '系统名',
          halign: 'center',
        },
        {
          field: 'systemAbbreviation',
          title: '系统简称',
          halign: 'center',
        },
        {
          field: 'systemContext',
          title: '系统简介',
          halign: 'center',
        }
      ]
    }
    $.table.init(options);
  }
}

$(function () {
  entering.init();
})
window.onresize = function () {
  location.reload();
}
