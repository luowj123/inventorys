;
(function($, window, document, undefined) {
	// 封装ztree插件按照自己要求
	$.fn.defZtree = function(options) {
		var $this = $(this); // 当然响应事件对象
		var id = $this.attr("id");
		var subWidth = $this.attr("data-subWid");
		subWidth = subWidth ? subWidth : 220 + "px";

		var defZtreeMethod = {
			init : function() {
				var domHtml = ' <span id="' + id + 'ClearBtn" class="fa fa-times-circle" style="color:#c2c2c2;font-size: 12px;cursor: pointer;position: absolute"></span> '+
											'<div id="'+ id + 'Content" class="menuContent" style="display:none; position: absolute; z-index: 1000;background-color: #fff;border: 1px #ddd solid;width:' + subWidth + ';height: 300px;overflow: auto;">'+ 
											'	<div style="display: flex; justify-content: space-between; padding: 5px 6px 0;">'+ 
											'		<input id="' + id + 'searchText" style="width:75%;height: 30px;" type="text" class="form-control">'+
											'		<button type="button" id="'+ id+ 'SearchBtn" style="margin-left: 1px;" class="layui-btn layui-btn-normal layui-btn-sm">'+
											'			<span class="fa fa-search"></span> 搜索'+ 
											'		</button>'+
											'	</div>'+ 
											'	<ul id="'+id+ 'AreaTree" class="ztree"></ul>'+ 
											'</div>';
				$this.after(domHtml);
				defZtreeMethod.setClearBtn();
				// 懒加载数据
				var setting = {
					view : {
						selectedMulti : false
					},
					async : {
						enable : true,
						url : options.url,
						autoParam : [ "id" ],// 异步加载时需要自动提交父节点属性的参数
						otherParam : options.params,
						dataFilter : defZtreeMethod.filter
					},
					data : {
						simpleData : {
							idKey : "id",
							pIdKey : "pId",
							enable : true
						}
					},
					callback : {
						onClick : defZtreeMethod.onClick,
						onAsyncSuccess : defZtreeMethod.loadDataSuccess
					}
				}
				$.fn.zTree.init($("#" + id + "AreaTree"), setting);
			},
			loadDataSuccess : function(event, treeId, treeNode) {
				try {
					if (typeof (eval(options.loadDataSuccess)) == "function") {
						options.loadDataSuccess(event, treeId, treeNode);
					}
				} catch (e) {
					// alert("not function");
				}

			},
			onClick : function(event, treeId, treeNode) {
				$this.val(treeNode.name);
				$this.data('code', treeNode.id);
//				console.log(treeNode, treeId);
				// add by liutao 20191015
				if ($('#deptId').length > 0) {
					$('#deptId').val(treeNode.id);
				}
				if ($('#parentId').length > 0) {
					$('#parentId').val(treeNode.pId);
				}
				try {
					if (typeof (eval(options.click)) == "function") {
						options.click(event, treeId, treeNode);
					}
				} catch (e) {
					// alert("not function");
				}
				// 关闭弹窗
				defZtreeMethod.closeTree();

			},
			filter : function(treeId, parentNode, responseData) {
				if (!responseData)
					return null;
				var childNodes = responseData.trees;
				return childNodes;
			},
			closeTree : function() {
				$("#" + id + "Content").fadeOut("fast");
				$("body").unbind("mousedown");
			},
			setClearBtn : function() {
				var areaObj = $this;
				var areaOffset = $this.offset();
				$("#" + id + "ClearBtn").css({
					left : (areaObj.position().left + areaObj.outerWidth() - 20) + "px",
					top : (areaObj.position().top + areaObj.outerHeight() / 2 - 5) + "px"
				});
			},
			clear : function() {
				// 清楚内容
				var treeObj = $.fn.zTree.getZTreeObj(id + "AreaTree");
				treeObj.setting.async.otherParam.name = null;
				treeObj.reAsyncChildNodes(null, "refresh");
				$this.val('');
				$("#" + id + "searchText").val('');
				$this.data('code', '');
			},
			showTree : function() {
				var areaObj = $this;
				var areaOffset = $this.offset();
				/*
				 * $("#"+id+"Content").css({ left: areaOffset.left + "px", top:
				 * areaOffset.top + areaObj.outerHeight() + "px" }).slideDown("fast");
				 */
				$("#" + id + "Content").css({
					left : areaObj.position().left + "px",
				}).slideDown("fast");
				$("body").bind("mousedown", function(event) {
					if (!(event.target.id == id + "Content" || $(event.target).parents("#" + id + "Content").length > 0)) {
						defZtreeMethod.closeTree();
					}
				});
			}
		};
		if (typeof options == "string") {
			if (typeof defZtreeMethod[options] == 'function') {
				defZtreeMethod[options]();
			}
		} else {
			var defaults = {
				params : {},
				url : "/dmc/front/sh/tree!execute?uid=m015"
			};
			var options = $.extend(defaults, options); // 将传入参数和默认参数合并

			// 初始化插件
			defZtreeMethod.init();
			// 绑定事件
			$this.click(function() {
				defZtreeMethod.showTree();
			});
			$("#" + id + "SearchBtn").bind("click", function() {
				var filterStr = $("#" + id + "searchText").val();
				var treeObj = $.fn.zTree.getZTreeObj(id + "AreaTree");
				treeObj.setting.async.otherParam.name = $.trim(filterStr);
				treeObj.reAsyncChildNodes(null, "refresh");
			});

			$("#" + id + "ClearBtn").bind("click", defZtreeMethod.clear);
		}
	}
})(jQuery, window, document);