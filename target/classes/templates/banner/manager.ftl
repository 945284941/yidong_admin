<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>部门列表</span>
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
                                                <label class="col-lg-4 control-label">类型:</label>
                                                <div class="col-lg-1">
                                                    <div class="input-group " style="width:200px;">

                                                        <select name="type" class="form-control">

                                                            <option value=""></option>
                                                            <option value="0">新闻资讯 </option>
                                                            <option value="1">会员服务</option>
                                                            <option value="2">工会学堂</option>
                                                        </select>
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
                               onclick="Duang.getService('bannerService').loadTable();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('bannerService').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                            <a class="btn btn-circle green"
                               href="javascript:Duang.getService('bannerService').add()" role="button"><i
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
                Duang.getService('bannerService').loadTable();
            }
        }

        $('#system_expert_manager_search_roleName').focus(function () {
            $('#system_expert_manager_search_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });
        Duang.getService('bannerService').loadTable();

    })
</script>
