<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>员工列表</span>
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
                    <div class="col-md-9">
                        <form id="system_expert_manager_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">员工姓名:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">
                                                        <input type="text" id="system_expert_manager_search_name" name="name" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">手机号:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">
                                                        <input type="text" id="system_expert_manager_search_name" name="dianhua" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">员工编码:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">
                                                        <input type="text" id="system_expert_manager_search_name" name="gonghao" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">职位名称:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">
                                                        <input type="text" id="system_expert_manager_search_name" name="zhiWeiName" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="col-lg-4 control-label">部门名称:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">
                                                        <input type="text" id="system_expert_manager_search_name" name="departmentName" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="col-md-3">
                        <div class="actions pull-right">
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('ydYuanGongService').loadTable();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('ydYuanGongService').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                            <a class="btn btn-circle green"
                               href="javascript:Duang.getService('ydYuanGongService').add()" role="button"><i
                                    class="icon-users"></i> 添加</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="system_expert_manager_table">

            </div>
            <div id="system_expert_manager_edit" class="modal fade" tabindex="-1" role="dialog"
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
            $("#system_expert_manager_search_treeList").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(event.target.id == "system_expert_manager_search_roleName" || event.target.id == "system_expert_manager_search_treeList" || $(event.target).parents("#system_expert_manager_search_treeList").length > 0)) {
                hideMenu();
            }
        }

        //回车提交
        document.onkeydown = function (event) {
            var e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                Duang.getService('ydYuanGongService').loadTable();
            }
        }

        $('#system_expert_manager_search_roleName').focus(function () {
            $('#system_expert_manager_search_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });
        Duang.getService('ydYuanGongService').loadTable();

    })
</script>
