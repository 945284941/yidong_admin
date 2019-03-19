var resourceservice = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'resourceservice',
        modalName:'system_resources_manager_form',
        formId:'system_resource_edit_form'
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/resources/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/resources/insert"
        });
    },
    addButton: function (id){
         $("#" + this.options.modalName).modal({
               remote: project.path + "/resources/insert?id=" + id
         });
    },
    delete:function (id) {
        var r = window.confirm("确定删除该资源?");
        if(!r){
            return ;
        }
        var $this = this;
        $.post(project.path+'/resources/delete?id='+id,function (data) {
            if(data.success){
                Duang.success("提示",data.message);
                $this.loadTreeTable();
                return ;
            }
            Duang.error("提示",data.message);
        },'json')
    },
    loadTreeTable:function () {
        $("#system_resources_manager_treetable").load(project.path+'/resources/treetable');
    },
    initParentResourceSelect:function () {
        var $this = this;
        var system_resource_edit_setting_click = function () {
            var zTree = $.fn.zTree.getZTreeObj("system_resource_edit_ztree");
            var nodes = zTree.getSelectedNodes()
            var v = "";
            var parentId = "";
            nodes.sort(function compare(a, b) {
                return a.id - b.id;
            });
            for (var i = 0, l = nodes.length; i < l; i++) {
                v += nodes[i].name + ",";
                parentId = nodes[i].id + ",";
            }
            if (v.length > 0) v = v.substring(0, v.length - 1);
            if (parentId.length > 0) parentId = parentId.substring(0, parentId.length - 1);
            var pName = $("#system_resource_edit_parentName");
            var pid = $("#system_resource_edit_parentId");
            pName.attr("value", v);
            pid.attr('value', parentId);
        }
        var system_resource_edit_setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: system_resource_edit_setting_click
            }
        };
        //构建选择父类的权限树
        $.post(project.path + '/resources/ztree', function (data) {
            if (data.success) {
                $.fn.zTree.init($("#system_resource_edit_ztree"), system_resource_edit_setting, data.ztree);
            }
        }, 'json');
    },
    saveOrUpdate:function(){

        var $this = this;
        var param = $('#' + this.options.formId).formToJson();
        if(param.name == null || param.name == ""){
            Duang.error("提示","资源名称不能为空！")
        }else if(param.type == '1' && (param.url == '' || param.url == null)){
            Duang.error("提示","菜单路径不能为空！");
        }else if(param.code == null || param.code == ""){
            Duang.error("提示","请填写CODE!");
        }else if(param.sort == null || param.sort == "") {
            Duang.error("提示","请填写排序！");
        }else{
                $.post(project.path + '/resources/saveOrUpdate', param, function (data) {
                    if (data.success) {
                        $("#" + $this.options.modalName).modal('hide');
                        $this.loadTreeTable();
                        Duang.success("提示", "保存成功");
                    } else {
                        Duang.error("提示", data.message);
                    }
                }, 'json')

        }

    }
});