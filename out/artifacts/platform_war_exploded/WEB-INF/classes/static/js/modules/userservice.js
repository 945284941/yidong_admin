var userservice = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'userservice',
        modalName: 'system_user_manager_edit',
        formId: 'system_user_form_table'
    },
    init: function () {
    },
    loadTable: function () {
        var param = $('#system_user_manager_searchFrom').formToJson();
        $.get(project.path + '/user/table',param,function(data){
            $('#system_user_manager_table').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#system_user_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/user/table',param,function(data){
            $('#system_user_manager_table').html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        document.getElementById('system_user_manager_searchFrom').reset();
        $('#system_user_manager_search_roleId').val('');
        $("#system_user_manager_search_roleName").attr("value","");

        $.get(project.path + '/user/table',function(data){
            $('#system_user_manager_table').html(data);
        })
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/user/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/user/insert"
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/user/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.loadTable();
                    Duang.success("提示", data.message);
                } else {
                    Duang.error("提示", data.message);
                }
            })
        }
    },
    saveOrUpdate: function () {
        var $this = this;
        var param = $('#' + this.options.formId).formToJson();
        if(param.roleIds == null || param.roleIds == ""){
            Duang.error("提示","请选择用户角色");
        }else if(param.username == null || param.username == "") {
            Duang.error("提示","登录账号不能为空!");
        }else if(param.truename == null || param.truename == ""){
            Duang.error("提示","姓名不能为空!");
        }else{
                $.post(project.path + '/user/saveOrUpdate', param, function (data) {
                    if (data.success) {
                        $("#" + $this.options.modalName).modal('hide');
                        $this.loadTable();
                        Duang.success("提示", "保存成功");
                    } else {
                        Duang.error("提示", data.message);
                    }
                }, 'json')
        }

    },
    initRoleSelect: function (id,selfId) {
        //不能修改登陆用户的角色
        if(id==selfId){
            $('#system_user_edit_treeList').remove();
            return ;
        }else{
            //$('#system_user_edit_treeList').show();
        }
        var system_user_edit_setting_onclick = function () {
            var zTree = $.fn.zTree.getZTreeObj("system_user_edit_ztree");
            var nodes = zTree.getSelectedNodes();
            var ids = [];
            var names = [];
            $.each(nodes, function (i, n) {
                ids.push(n.id);
                names.push(n.name);
            });
            var roleName = $("#system_user_form_roleName");
            var roleId = $("#system_user_form_roleIds");
            roleId.attr('value', ids);
            roleName.attr('value', names);
            $("#system_user_edit_treeList").fadeOut("fast");//选中 隐藏下拉框
        };
        var zTree;
        var system_user_edit_setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: system_user_edit_setting_onclick
            }
        }
        //构建选择父类的权限树
        $.post(project.path + '/user/ztree?userId=' + id, function (data) {
            if (data.success) {
                //alert(data.ztree);
                $.fn.zTree.init($("#system_user_edit_ztree"), system_user_edit_setting, data.ztree);
            }
        }, 'json');
    },
    initSearchTable: function () {
        var system_user_manager_search_ztree_onclick = function () {
            var zTree = $.fn.zTree.getZTreeObj("system_user_manager_search_ztree");
            var nodes = zTree.getSelectedNodes();
            var v = "";
            var roleId = "";
            nodes.sort(function compare(a, b) {
                return a.id - b.id;
            });
            for (var i = 0, l = nodes.length; i < l; i++) {
                v += nodes[i].name + ",";
                roleId = nodes[i].id + ",";
            }
            if (v.length > 0) v = v.substring(0, v.length - 1);
            if (roleId.length > 0) roleId = roleId.substring(0, roleId.length - 1);
            var _roleName = $("#system_user_manager_search_roleName");
            var _roleId = $("#system_user_manager_search_roleId");
            _roleName.attr("value", v);
            _roleId.attr('value', roleId);
            $("#system_user_manager_search_treeList").fadeOut("fast");
        }
        var system_user_manager_search_ztree_setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: system_user_manager_search_ztree_onclick
            }
        };
        //构建选择父类的权限树
        $.post(project.path + '/role/ztree', function (data) {
            if (data.success) {
                $.fn.zTree.init($("#system_user_manager_search_ztree"), system_user_manager_search_ztree_setting, data.ztree);
            }
        }, 'json');
    }
});