/*
 * @Descripttion: 维度管理
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-20 10:17:10
 * @LastEditTime: 2020-04-21 17:42:37
 */

var dimTable = {
  init: function () {
    this.initLayui();
    this.getTableHeight();
  },
  // 初始化layui
  initLayui: function () {
    layui.use(['form'], function () {
      var form = layui.form;

      //监听查询
      form.on('submit(dimSearch)', function (data) {
        //console.log('最终的提交信息', JSON.stringify(data.field))
        dimTable.initTable('search'); // 查询当前维度下的值

        return false;
      });

      //监听维度弹框查询
      form.on('submit(dimSelect)', function (data) {
        //console.log('最终的提交信息', JSON.stringify(data.field))
        var params = data.field;
        var opt = {
          url: ctx + '/dimTable/selectByPage',
          silent: true,
          query: params
        };

        //带参数 刷新
        $("#dimList").bootstrapTable('showLoading');
        $("#dimList").bootstrapTable('refresh', opt);

        return false;
      });
    })
  },
  // 获取表格高度
  getTableHeight: function () {
    var rowHeight = $('.select-table').parent().height();
    var formHeight = $('.search-collapse').height();
    dimTable.height = rowHeight - formHeight - 48;
    dimTable.initTable('init');
  },
  // 初始化维度值表格
  initTable: function (type) {
    $.table.destroy('dimListTable'); // 先卸载表格
    var options = {
      id: 'dimListTable',
      url: type == 'init' ? '' : ctx + '/dimTable/selectByPage', // 请求路径ctx + 
      height: dimTable.height,
      queryParams: function (params) { // 传递参数查询参数
        var search = {};
        search.id = $('#dimId').val();
        search.pageSize = params.limit;
        search.pageNum = params.offset / params.limit + 1;
        return search;
      },
      responseHandler: function (res) { // 请求获取数据后处理回调函数
        if(res.code == 0) {
          var rows = res.rows.filter(function (item, index) { // 返回pid为1的值
            return item.pid == 1;
          })
          return {
            rows: rows,
            total: res.total
          }
        } else {
          $.modal.alertWarning(res.msg);
          return {
            rows: [],
            total: 0
          };
        }
      },
      columns: [
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#dimListTable').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#dimListTable').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: 'name',
          title: '维度名',
          halign: 'center',
        },
        {
          field: 'val',
          title: '维度值',
          halign: 'center',
        },
        {
          field: 'createTime',
          title: '创建时间',
          halign: 'center',
        },
        {
          field: 'remark',
          title: '备注',
          halign: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          formatter: function (value, row, index) {
            var actions = '<div class="operate" style="width: 80px;">' +
              '	<a title="编辑" onclick="dimTable.updateDim(\'' + 'dimList' + '\',\'' + row + '\')">编辑</a> ' +
              '	<a title="删除" onclick="dimTable.deletDim(\'' + 'deletDimList' + '\',\'' + row.id + '\')"> &frasl; 删除</a>' +
              '</div>';
            return actions;
          }
        }
      ]
    }
    $.table.init(options);
  },
  // 编辑维度 或 维度值
  updateDim: function (type, row) {
    console.log(type, row) // type: dimList:编辑pid为1的 dim:pid为-1
    $.modal.openWin({
      type: 1,
      content: $('#addDim'),
      area: ['450px', '240px'],
      success: function (layero, index) { // 弹出后回调
        $('#addDim').removeClass('hide');
        if(type == 'dimList') {
          $('.dimLabel').html('维度值:');
        } else {
          $('.dimLabel').html('维度名:');
        }
      },
      end: function () { // 弹框销毁后回调
        $('#addDim').addClass('hide');
        $.form.reset('addDimForm'); // 清空表单内容
      },
      btn2: function (index, layero) { // 确定
        var params = row;
        $.each($('#addDimForm').serializeArray(), function (i, field) {
          params[field.name] = field.value;
        });
        if(params.name == '') {
          $.modal.alertWarning('请输入维度值');
          return false;
        }
        console.log('更新:', params);
        // ajax请求
        dimTable.ajaxUpdateDim(type, params);
      }
    })
  },
  // ajax更新维度 或 维度值
  ajaxUpdateDim: function (type, params) {
    $.modal.loading('更新中...');
    $.ajax({
      type: "POST",
      url: '', // TODO 添加更新接口
      data: params,
      success: function (res) {
        $.modal.closeLoading();
        if(res.code == 0) {
          $.modal.msgSuccess('更新成功');
          // 刷新表格
          if(type == 'dim') { // 刷新维度主表 -- pid=-1
            var opt = {
              url: ctx + '/dimTable/selectByPage',
              silent: true
            };
            $("#dimList").bootstrapTable('showLoading');
            $("#dimList").bootstrapTable('refresh', opt);
          } else { // 刷新维度 值 表
            dimTable.initTable('search');
          }
        } else {
          $.modal.msgError(res.msg); // 错误提示信息
        }
      },
      error: function () {
        $.modal.closeLoading();
        $.modal.msgError('请求失败，请稍后重试'); // 错误提示信息
      }
    })
  },
  // 删除维度 或 维度值
  deletDim: function (type, id) {
    console.log(type, id) // type: deletDimList-删除pid为1的 deletDim:pid为-1
    $.modal.confirm('', '确定删除该维度?', function () {
      // 确定删除 ajax请求
      $.modal.loading('删除中...');
      $.ajax({
        type: "POST",
        url: '', // TODO 添加删除接口
        data: {
          id: id
        },
        success: function (res) {
          console.log(res);
          $.modal.closeLoading();
          if(res.code == 0) {
            $.modal.msgSuccess('删除成功');
            // 刷新表格
            if(type == 'dim') { // 刷新维度主表 -- pid=-1
              var opt = {
                url: ctx + '/dimTable/selectByPage',
                silent: true
              };
              $("#dimList").bootstrapTable('showLoading');
              $("#dimList").bootstrapTable('refresh', opt);
            } else { // 刷新维度 值 表
              dimTable.initTable('search');
            }
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
  // 维度选择-pid=-1
  chooseDim: function () {
    $.modal.openWin({
      type: 1,
      content: $('#dimSelect'),
      success: function (layero, index) {// 弹出后回调
        $('#dimSelect').removeClass('hide');
        dimTable.initDimList(); // 初始化维度表
      },
      end: function () {// 弹框销毁后回调
        $('#dimSelect').addClass('hide');
        $.form.reset('dimSelectForm'); // 重置维度查询信息
        $.table.destroy('dimList'); // 销毁维度表
      },
      btn2: function (index, layero) { // 确定
        var selections = $('#dimList').bootstrapTable('getSelections');
        //console.log('维度选中:', selections);
        if(selections.length == 0) {
          $.modal.alertWarning('请选择维度');
          return false;
        }
        $('#dimId').val(selections[0].id);
        $('#dimName').val(selections[0].name);
      }
    });
  },
  // 初始化维度弹框表格
  initDimList: function () {
    var options = {
      id: 'dimList',
      url: ctx + '/dimTable/selectByPage', // 请求路径ctx + 
      showSearch: false,
      showRefresh: false,
      showColumns: false,
      toolbar: '', // 将功能区置空 避免与主页上的table混淆
      queryParams: function (params) { // 传递参数查询参数
        var search = {};
        $.each($("#dimSelectForm").serializeArray(), function (i, field) {
          search[field.name] = field.value;
        });
        search.pageSize = params.limit;
        search.pageNum = params.offset / params.limit + 1;
        return search;
      },
      responseHandler: function (res) { // 请求获取数据后处理回调函数
        if(res.code == 0) {
          var rows = res.rows.filter(function (item, index) { // 只返回pid为-1的值
            return item.pid == -1;
          })
          return {
            rows: rows,
            total: res.total
          }
        } else {
          $.modal.alertWarning(res.msg);
          return {
            rows: [],
            total: 0
          };
        }
      },
      onLoadSuccess: function (data) {
        $("#dimList").bootstrapTable('hideLoading');
      },
      columns: [
        {
          radio: true,
          halign: 'center',
          formatter: function (value, row, index) {
            var dimId = $('#dimId').val();
            if(dimId == row.id) {
              return true;
            }
          }
        },
        {
          title: '序号',
          align: 'center',
          formatter: function (value, row, index) {
            // 获取每页显示的数量
            var pageSize = $('#dimList').bootstrapTable('getOptions').pageSize;
            // 获取当前是第几页
            var pageNumber = $('#dimList').bootstrapTable('getOptions').pageNumber;
            // 返回序号，注意index是从0开始的，所以要加上1
            return pageSize * (pageNumber - 1) + index + 1;
          }
        },
        {
          field: 'name',
          title: '维度名',
          halign: 'center',
        },
        {
          field: 'createTime',
          title: '创建时间',
          halign: 'center',
        },
        {
          field: 'remark',
          title: '备注',
          halign: 'center',
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          formatter: function (value, row, index) {
            var actions = '<div class="operate" style="width: 80px;">' +
              '	<a title="编辑" onclick="dimTable.updateDim(\'' + 'dim' + '\',\'' + row.id + '\')">编辑</a> ' +
              '	<a title="删除" onclick="dimTable.deletDim(\'' + 'deletDim' + '\',\'' + row.id + '\')"> &frasl; 删除</a>' +
              '</div>';
            return actions;
          }
        }
      ]
    }
    $.table.init(options);
  },
  // 添加维度
  addDim: function () {
    $.modal.openWin({
      type: 1,
      content: $('#addDim'),
      area: ['450px', '240px'],
      success: function (layero, index) { // 弹出后回调
        $('#addDim').removeClass('hide');
        dimTable.initDimList();
      },
      end: function () { // 弹框销毁后回调
        $('#addDim').addClass('hide');
        $.form.reset('addDimForm'); // 清空表单内容
      },
      btn2: function (index, layero) { // 确定
        var params = {};
        $.each($('#addDimForm').serializeArray(), function (i, field) {
          params[field.name] = field.value;
        });
        if(params.name == '') {
          $.modal.alertWarning('请输入维度名');
          return false;
        }
        params.pid = -1; // 固定值 添加父级
        console.log('添加维度名:', params);
        dimTable.ajaxAddDim('dim', params);
      }
    })
  },
  // 添加维度值
  addDimValue: function () {
    // 先判断是否选中相应维度
    var dimId = $('#dimId').val();
    if(dimId == '') {
      $.modal.alertWarning('请先选择维度');
      return;
    }
    $.modal.openWin({
      type: 1,
      content: $('#addDim'),
      area: ['450px', '240px'],
      success: function (layero, index) { // 弹出后回调
        $('#addDim').removeClass('hide');
        $('.dimLabel').html('维度值:');
      },
      end: function () { // 弹框销毁后回调
        $('.dimLabel').html('维度名:');
        $('#addDim').addClass('hide');
        $.form.reset('addDimForm'); // 清空表单内容
      },
      btn2: function (index, layero) { // 确定
        var params = {};
        $.each($('#addDimForm').serializeArray(), function (i, field) {
          params[field.name] = field.value;
        });
        if(params.dimName == '') {
          $.modal.alertWarning('请输入维度值');
          return false;
        }
        params.pid = dimId; // 取当前维度id
        // console.log('添加维度值:', params);
        dimTable.ajaxAddDim('dimList', params);
      }
    })
  },
  // ajax添加维度 或 维度值
  ajaxAddDim: function (type, params) {
    $.modal.loading('添加中...');
    $.ajax({
      type: "POST",
      url: ctx + '/dimTable/insert',
      data: params,
      success: function (res) {
        $.modal.closeLoading();
        if(res.code == 0) {
          $.modal.msgSuccess('添加成功');
          // 刷新表格
          if(type == 'dim') { // 刷新维度主表 -- pid=-1
            var opt = {
              url: ctx + '/dimTable/selectByPage',
              silent: true
            };
            $("#dimList").bootstrapTable('showLoading');
            $("#dimList").bootstrapTable('refresh', opt);
          } else { // 刷新维度 值 表
            dimTable.initTable('search');
          }
        } else {
          $.modal.msgError(res.msg); // 错误提示信息
        }
      },
      error: function () {
        $.modal.closeLoading();
        $.modal.msgError('请求失败，请稍后重试'); // 错误提示信息
      }
    })
  }
}
$(function () {
  dimTable.init();
})
