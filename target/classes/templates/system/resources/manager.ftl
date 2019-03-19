<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>资源列表</span>
        </li>
    </ul>
</div>
<div class="page-title">
    <i class=" icon-pointer"></i> 资源管理列表
    <div class="pull-right">
        <a class="btn btn-circle  green " href="javascript:Duang.getService('resourceservice').add()" role="button"><i class="glyphicon glyphicon-plus"></i>
            添加资源</a>
    </div>
</div>
<div class="gap"></div>
<div id="system_resources_manager_treetable">

</div>
<div id="system_resources_manager_form" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display:none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">

        </div>
    </div>
</div>
<script src="${ctx}/js/extends/treeTable/jquery.treeTable.min.js"></script>
<script>
    Duang.getService('resourceservice').loadTreeTable();
</script>