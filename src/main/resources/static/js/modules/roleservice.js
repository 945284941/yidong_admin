var roleservice = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'roleservice',
        modalName: 'system_role_manager_edit',
        formName: 'system_role_edit_form'
    },
    loadTreeTable: function () {

        $('#system_role_manager_treetable').load(project.path + '/role/treetable');
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/role/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/role/insert"
        });
    },
    saveOrUpdate: function () {
        var $this = this;
        var param = $('#' + this.options.formName).formToJson();
        var resTree = $.fn.zTree.getZTreeObj("system_role_accredit_ztree");
        if(resTree == null || resTree == ""){

            Duang.error("提示","请选择上级角色!");
        }else if(param.name == null || param.name == ""){
            Duang.error("提示","角色名称不能为空!");
        }else if(param.remark == null || param.remark == ""){
            Duang.error("提示","描述不能为空!");
        }else{

            var nodes = resTree.getCheckedNodes(true);
            var ids = [];
            $.each(nodes, function (i, n) {
                ids.push(n.id);
            });
            param.resIds = ids.join(',');
            $.post(project.path + '/role/saveOrUpdate', param, function (data) {
                if (data.success) {
                    $("#" + $this.options.modalName).modal('hide');
                    $this.loadTreeTable();
                    Duang.success("提示", "保存成功");
                } else {
                    Duang.error("提示", data.message);
                }
            }, 'json')
        }

    },
    delete: function (id) {
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r) {
            $.post(project.path + '/role/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.loadTreeTable();
                    Duang.success("提示", data.message);
                } else {
                    Duang.error("提示", data.message);
                }
            }, 'json')
        }
    },
    initPermissionTree: function (roleId, first) {
        if (first) {
            $('#system_role_accredit_div').load(project.path + '/role/accredit?roleId=' + roleId + "&first=" + first);
        } else {
            $('#system_role_accredit_div').load(project.path + '/role/accredit?roleId=' + roleId);
        }
    },
    initRoleSelect: function () {
        var $this = this;
        var system_role_edit_setting_click = function () {
            var zTree = $.fn.zTree.getZTreeObj("system_role_eidt_ztree");
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
            var pName = $("#system_role_edit_parentName");
            var pid = $("#system_role_edit_parentId");
            pName.attr("value", v);
            pid.attr('value', parentId);
            $this.initPermissionTree(parentId, "false");
            $("#system_role_edit_treeList").fadeOut("fast");//隐藏下拉框
        }
        var system_role_edit_setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: system_role_edit_setting_click
            }
        };
        //构建选择父类的权限树
        $.post(project.path + '/role/ztree', function (data) {
            if (data.success) {
                $.fn.zTree.init($("#system_role_eidt_ztree"), system_role_edit_setting, data.ztree);
            }
        }, 'json');
    }
});