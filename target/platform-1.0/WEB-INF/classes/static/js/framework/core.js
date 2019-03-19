(function() {
	/* project 基础信息对象 */
	project = {
		path : '/' ,
		version : '0.1',
		profile : '' ,
		cdn : '' ,
		handlerTag : 'handler'
	}

	/* 定义project的基类 */
	project.Base = new Class({
		Implements : [ Options, Events ],
		/* 公共的options属性 */
		options : {
			contentId : "center",
			mainAreaId : "center"
		},
		initialize : function(options) {
			this.setOptions(options);
		},
		getPath : function() {
			return project.path;
		},
		error : function(titles, texts) {
			//错误提示信息
		        toastr.options = {
		                closeButton: true,
		                progressBar: true,
		                showMethod: 'slideDown',
		                timeOut: 4000
		         };
		        toastr.error(titles, texts);

		},
		success : function(titles, texts) {
			//成功提示信息
			setTimeout(function() {
		        toastr.options = {
		                closeButton: true,
		                progressBar: true,
		                showMethod: 'slideDown',
		                timeOut: 4000
		         };
		        toastr.success(titles, texts);

		    }, 300);
		},
		info : function(titles, texts) {
			//正常提示信息
			setTimeout(function() {
		        toastr.options = {
		                closeButton: true,  //关闭按钮
		                progressBar: true,	//下面进度提示信息
		                showMethod: 'slideDown', //显示方式
		                timeOut: 4000  //时间
		         };
		        toastr.info(titles, texts);

		    }, 300);
		},
		getEvent : function() {
			if (document.all)
				return window.event;
			var func = this.getEvent.caller;
			while (func != null) {
				var arg0 = func.arguments[0];
				if (arg0) {
					if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
							|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
						return arg0;
					}
				}
				func = func.caller;
			}
			return null;
		}
	}),
	project.Dispatcher = new Class({
		Extends : project.Base,
		container : {},
		registerService : function(key, service) {
			this.container[key] = service;
		},
		getService : function(key) {
			if (this.container[key]) {
				return this.container[key];
			} else {
				var path = project.config.getConfig(key);
				if (!path) {
					alert("未在setting中找到["+key+"]服务配置");
					return;
				}
				//如果path以http开头，则不加project.path
				if(path.substring(0,4) == 'http:'){
					Duang.registerService(key, path, true);
				}else{
					Duang.registerService(key, project.path + path, true);
				}

				return this.container[key];
			}
		}

	});
	/* 定义dispatcher */
	var dispatcher = new project.Dispatcher();
	/*
	 * Service类
	 */
	project.Service = new Class({
		Extends : project.Base,
		options : {
			serviceName : ""
		},
		initialize : function() {
			this.registerService();
		},
		init : function() {
			// alert("调用基类init方法");
		},
		registerService : function() {
			dispatcher.registerService(this.options.serviceName, this);
		},
		echo : function(sth) {
			if (sth) {
				alert(this.options.serviceName + ' says :' + sth);
				return;
			}
			alert(this.options.serviceName + ' says : nothing');

		}
	})
	/**
	 * 主界面的封装
	 */
	project.Wrapper = new Class({
		Extends : project.Base,
		initialize : function(options) {
			this.setOptions(options);
		},
		getService : function(key) {
			return dispatcher.getService(key);
		},
		registerService : function(name, src, debug) {
			if (debug) {
				Duang.loadJS(src, debug);
			} else {
				var x = this.getService(name);
				if (!x){
					Duang.loadJS(src);
				}
			}
			//创建服务实例
			eval("new " + name + "()");
			var service = this.getService(name);
			if (service == undefined) {
				alert("注册服务失败");
				return;
			}
			service.init();
		}
	})
})();
