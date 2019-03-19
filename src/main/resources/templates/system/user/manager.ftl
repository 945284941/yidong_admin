<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>用户管理</span>
        </li>
    </ul>
</div>
<div class="gap"></div>
<!-- END PAGE BAR -->
<div class="row">
    <div class="col-sm-12">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="row">
                    <div class="col-md-8">
                        <form id="system_user_manager_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="row">
                                    <@shiro.hasPermission name="user_manager_rolename">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">角色:</label>
                                                <div class="col-md-8">
                                                    <div class="input-group input-large">
                                                        <input type="hidden" id="system_user_manager_search_roleId"
                                                               name="roleId">
                                                        <input type="text" id="system_user_manager_search_roleName"
                                                               readonly
                                                               class="form-control tree_input input-large"
                                                               style="width: 25rem;">

                                                        <div class="treeList" id="system_user_manager_search_treeList"
                                                             style="top:34px">
                                                            <ul id="system_user_manager_search_ztree"
                                                                class="ztree"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </@shiro.hasPermission>
                                    <@shiro.hasPermission name="user_manager_username">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">登录名:</label>
                                                <div class="col-md-8">
                                                    <div class="input-group input-large">
                                                        <input type="text" name="username" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </@shiro.hasPermission>
                                    <@shiro.hasPermission name="user_manager_truename">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">姓名:</label>
                                                <div class="col-md-8">
                                                    <div class="input-group input-large">
                                                        <input type="text" name="truename" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </@shiro.hasPermission>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="col-md-4">
                        <div class="actions pull-right">
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('userservice').loadTable();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('userservice').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                        <@shiro.hasPermission name="user_manager_add">
                            <a class="btn btn-circle green"
                               href="javascript:Duang.getService('userservice').add()" role="button"><i
                                class="icon-users"></i> 添加用户</a>
                        </@shiro.hasPermission>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="system_user_manager_table">

            </div>
            <div id="system_user_manager_edit" class="modal fade" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true"
                 style="display:none; padding-right: 17px;">
                <div class="modal-dialog">
                    <div class="modal-content">

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        function hideMenu() {
            $("#system_user_manager_search_treeList").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(event.target.id == "system_user_manager_search_roleName" || event.target.id == "system_user_manager_search_treeList" || $(event.target).parents("#system_user_manager_search_treeList").length > 0)) {
                hideMenu();
            }
        }

        //回车提交
        document.onkeydown = function (event) {
            var e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                Duang.getService('userservice').loadTable();
            }
        }

        $('#system_user_manager_search_roleName').focus(function () {
            $('#system_user_manager_search_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });
        Duang.getService('userservice').loadTable();
        Duang.getService('userservice').initSearchTable();
    })
</script>
