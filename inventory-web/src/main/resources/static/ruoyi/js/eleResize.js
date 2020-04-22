/**
 * 监听dom元素size变化
 * 
 * Created by chenpei on 2019/8/7
 * 
 */
var EleResize = {
	_handleResize : function(e) {
		var ele = e.target || e.srcElement;
		var trigger = ele.__resizeTrigger__; // 当前dom元素
		if (trigger) {
			var handlers = trigger.__z_resizeListeners;
			if (handlers) {
				var size = handlers.length;
				for (var i = 0; i < size; i++) {
					var h = handlers[i];
					var handler = h.handler;
					var context = h.context;
					handler.apply(context, [ e ]);
				}
			}
		}
	},
	_removeHandler : function(ele, handler, context) {
		var handlers = ele.__z_resizeListeners;
		if (handlers) {
			var size = handlers.length;
			for (var i = 0; i < size; i++) {
				var h = handlers[i];
				if (h.handler === handler && h.context === context) {
					handlers.splice(i, 1);
					return;
				}
			}
		}
	},
	/***
	 * 追加一个内容相同的object元素
	 * 
	 * @param ele 指定监听的dom元素
	 */
	_createResizeTrigger : function(ele) {
		var obj = document.createElement('object');
		// pointer-events 指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件
		obj.setAttribute('style','display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; z-index: -1;');
		obj.onload = EleResize._handleObjectLoad; // 在页面或图像加载完成后立即添加
		obj.type = 'text/html';
		ele.appendChild(obj);
		obj.data = 'about:blank';
		return obj;
	},
	_handleObjectLoad : function(evt) {
		// this为当前dom元素;  contentDocument.defaultView 返回当前对象所关联的 window 对象，如果没有，会返回 null
		this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__; // 给当前 window 对象上添加 __resizeTrigger__ 属性 
		this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize);
	}
};
if (document.attachEvent) {// ie9-10
	EleResize.on = function(ele, handler, context) {
		var handlers = ele.__z_resizeListeners;
		if (!handlers) {
			handlers = [];
			ele.__z_resizeListeners = handlers;
			ele.__resizeTrigger__ = ele;
			ele.attachEvent('onresize', EleResize._handleResize);
		}
		handlers.push({
			handler : handler,
			context : context
		});
	};
	EleResize.off = function(ele, handler, context) {
		var handlers = ele.__z_resizeListeners;
		if (handlers) {
			EleResize._removeHandler(ele, handler, context);
			if (handlers.length === 0) {
				ele.detachEvent('onresize', EleResize._handleResize);
				delete ele.__z_resizeListeners;
			}
		}
	}
} else {
	EleResize.on = function(ele, handler, context) {
		var handlers = ele.__z_resizeListeners;
		if (!handlers) {
			handlers = [];
			ele.__z_resizeListeners = handlers;

			if (getComputedStyle(ele, null).position === 'static') { // getComputedStyle()属于window对象下的一个方法  用于获取元素的样式属性
				ele.style.position = 'relative';
			}
			var obj = EleResize._createResizeTrigger(ele);
			ele.__resizeTrigger__ = obj;
			obj.__resizeElement__ = ele;
		}
		handlers.push({
			handler : handler,
			context : context
		});
	};
	EleResize.off = function(ele, handler, context) {
		var handlers = ele.__z_resizeListeners;
		if (handlers) {
			EleResize._removeHandler(ele, handler, context);
			if (handlers.length === 0) {
				var trigger = ele.__resizeTrigger__;
				if (trigger) {
					trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize);
					ele.removeChild(trigger);
					delete ele.__resizeTrigger__;
				}
				delete ele.__z_resizeListeners;
			}
		}
	}
}
