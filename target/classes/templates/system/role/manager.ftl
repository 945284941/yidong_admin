<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>角色列表</span>
        </li>
    </ul>
</div>
<div class="page-title">
    <i class=" icon-pointer"></i> 角色管理列表
    <div class="pull-right">
        <@shiro.hasPermission name="role_manager_add">
        <a class="btn btn-circle  green " href="javascript:Duang.getService('roleservice').add()" role="button"><i
                class="icon-user-follow"></i> 添加角色</a>
        </@shiro.hasPermission>
    </div>
</div>
<div class="gap"></div>
<div id="system_role_manager_treetable">

</div>
<div id="system_role_manager_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display:none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">

        </div>
    </div>
</div>
<script src="${ctx}/js/extends/treeTable/jquery.treeTable.min.js"></script>
<script>
    Duang.getService('roleservice').loadTreeTable();
</script>