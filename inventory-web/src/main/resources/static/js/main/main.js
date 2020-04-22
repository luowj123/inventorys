/*
 * @Descripttion: 首页
 * @Author: chenpei<chenpei@asiainfo.com>
 * @Date: 2020-04-20 17:52:48
 * @LastEditTime: 2020-04-21 15:51:00
 */

// 饼图默认样式
var pieStyles = {
  textStyle: {
    fontWeight: 'normal',
    fontSize: '16',
    color: '#AAAFC8',
    textAlign: 'center',
  },
  placeHolderStyle: {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      color: "rgba(0,0,0,0)",
      borderWidth: 0
    },
    emphasis: {
      color: "rgba(0,0,0,0)",
      borderWidth: 0
    }
  },
  dataStyle: {
    normal: {
      formatter: '{c}%',
      position: 'center',
      show: true,
      textStyle: {
        fontSize: '34',
        fontWeight: 'normal',
        color: '#34374E'
      }
    }
  },
};

// 色调板
var myColor = ['#1E9FFF', '#FF5722', '#FFB800', '#5FB878', '#01AAED', '#009688', '#c2c2c2'];

var main = {
  init: function () {
    this.initLayui();
    this.initAllAera();
    this.initITAera();
    this.initCNAera();
    this.initBPAera();
    this.initSafeAera();
    this.initPercentPass();
    this.initAudit();
  },
  // 初始化layui
  initLayui: function () {
    layui.use('element', function () {
      var element = layui.element;

      setTimeout(function () {
        element.progress('coverageRate', '70%');
        $('.layui-progress-text').html('覆盖率: ' + $('.layui-progress-text').html());
      }, 1000)
    });
  },
  // 饼图option配置
  pieOptions: function (title, value, color) {
    var options = {
      backgroundColor: '#fff',
      title: {
        text: title,
        left: '50%',
        top: '68%',
        textAlign: 'center',
        textStyle: pieStyles.textStyle,
      },
      series: [{
        type: 'pie',
        hoverAnimation: false, //鼠标经过的特效
        radius: ['70%', '80%'],
        center: ['50%', '50%'],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [{
          value: 100,
          itemStyle: {
            normal: {
              color: '#E1E8EE'
            }
          },
        }, {
          value: 35,
          itemStyle: pieStyles.placeHolderStyle,
        }]
      },
      //上层环形配置
      {
        type: 'pie',
        hoverAnimation: false, //鼠标经过的特效
        radius: ['70%', '80%'],
        center: ['50%', '50%'],
        startAngle: 225,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [{
          value: value,
          itemStyle: {
            normal: {
              color: color
            }
          },
          label: pieStyles.dataStyle,
        }, {
          value: 35,
          itemStyle: pieStyles.placeHolderStyle,
        }]
      }]
    };

    return options;
  },
  // 初始化系统分类 -- 全域
  initAllAera: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('allAera'));

    var options = this.pieOptions('全域\n888', '50', myColor[0]);
    myChart.setOption(options);
  },
  // 初始化系统分类 -- IT
  initITAera: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ITAera'));

    var options = this.pieOptions('IT\n222', '50', myColor[1]);
    myChart.setOption(options);
  },
  // 初始化系统分类 -- 云&网络
  initCNAera: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('CNAera'));

    var options = this.pieOptions('云&网络\n222', '50', myColor[2]);
    myChart.setOption(options);
  },
  // 初始化系统分类 -- 业务网或平台
  initBPAera: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('BPAera'));

    var options = this.pieOptions('业务网或平台\n222', '50', myColor[3]);
    myChart.setOption(options);
  },
  // 初始化系统分类 -- 安全
  initSafeAera: function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('safeAera'));

    var options = this.pieOptions('安全\n222', '50', myColor[4]);
    myChart.setOption(options);
  },
  // 初始化合格率--柱状图
  initPercentPass: function () {
    var options = {
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '16%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: { // 坐标轴刻度相关设置
          show: false
        },
        axisLabel: { // 坐标轴刻度标签的相关设置
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        axisLine: { // 坐标轴轴线相关设置
          lineStyle: {
            color: '#707070'
          }
        },
        data: ['系统', '数据库', '表', '字段', '文件', '接口', '外部数据'],
      }],
      yAxis: {
        type: 'value',
        name: '合格率%',
        nameTextStyle: {
          fontSize: 14,
          color: '#4D4D4D'
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#4D4D4D'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#707070'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        }
      },
      series: [{
        name: '合格率',
        type: 'bar',
        barWidth: '45%',
        data: [{
          name: '系统',
          value: '99',
          itemStyle: {
            color: myColor[0]
          }
        }, {
          name: '数据库',
          value: '70',
          itemStyle: {
            color: myColor[1]
          }
        },
        {
          name: '表',
          value: '50',
          itemStyle: {
            color: myColor[2]
          }
        },
        {
          name: '字段',
          value: '25',
          itemStyle: {
            color: myColor[3]
          }
        },
        {
          name: '文件',
          value: '15',
          itemStyle: {
            color: myColor[4]
          }
        },
        {
          name: '接口',
          value: '5',
          itemStyle: {
            color: myColor[5]
          }
        },
        {
          name: '外部数据',
          value: '2',
          itemStyle: {
            color: myColor[6]
          }
        }
        ]
      }]
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('percentPass'));
    myChart.setOption(options);
  },
  // 初始化稽核量和异常量
  initAudit: function () {
    var options = {
      backgroundColor: "#fff",
      color: myColor,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '4%',
        left: '2%',
        data: ['稽核总数', '异常数']
      },
      grid: {
        left: '3%',
        right: '2%',
        top: '15%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          rotate: 45
        },
        boundaryGap: false,
        data: ['2020-04-07', '2020-04-08', '2020-04-09', '2020-04-10', '2020-04-11', '2020-04-12', '2020-04-13', '2020-04-14', '2020-04-15', '2020-04-16', '2020-04-17', '2020-04-18', '2020-04-19', '2020-04-20', '2020-04-21']
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        }
      },
      series: [{
        name: '稽核总数',
        smooth: true,
        type: 'line',
        symbolSize: 8,
        symbol: 'circle',
        data: [80, 90, 50, 39, 50, 120, 82, 80, 90, 50, 39, 50, 120, 82, 80]
      }, {
        name: '异常数',
        smooth: true,
        type: 'line',
        symbolSize: 8,
        symbol: 'circle',
        data: [90, 70, 50, 50, 87, 90, 80, 70, 70, 50, 50, 87, 90, 80, 70]
      }]
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('auditAndError'));
    myChart.setOption(options);
  }
}

$(function () {
  main.init();
})