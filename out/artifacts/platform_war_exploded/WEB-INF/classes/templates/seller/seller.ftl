<#assign ctx=request.contextPath>
<script type="text/javascript">
    $(function(){
        Duang.getService('sellerService').sellerList();
    })
</script>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="${ctx}">首页</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>
                商家列表
			</span>
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
                        <form id="seller_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="col-md-4">
                                        <div class="form-group">

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">手机号:</label>
                                                <div class="col-md-8">
                                                    <input type="text" name="Phone" class="form-control" id="Phone">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="col-md-4">
                        <div class="actions pull-right">
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('sellerService').sellerAdd();"><i class="glyphicon glyphicon-plus"></i>
                                添加</a>
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('sellerService').sellerList();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('sellerService').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="sellerList">

            </div>
        </div>
    </div>
</div>

<div id="seller_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true"
     style="display:none; padding-right: 17px;">
    <div class="modal-dialog" style="width: 800px;height: 800px;">
        <div class="modal-content">

        </div>
    </div>
</div>