<#assign ctx=request.contextPath>
<script type="text/javascript">
    $(function(){
        Duang.getService('pointsProductService').pointsProductList();
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
                积分商品
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
                        <form id="pointsProduct_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="col-md-4">
                                        <div class="form-group">

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">名称:</label>
                                                <div class="col-md-8">
                                                    <input type="text" name="name" class="form-control" id="name">
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
                               onclick="Duang.getService('pointsProductService').pointsProductAdd();"><i class="glyphicon glyphicon-plus"></i>
                                添加</a>
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('pointsProductService').pointsProductList();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('pointsProductService').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="pointsProductList">

            </div>
        </div>
    </div>
</div>

<div id="pointsProduct_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true"
     style="display:none; padding-right: 17px;">
    <div class="modal-dialog"  style="width: 800px;height: 800px;">
        <div class="modal-content">

        </div>
    </div>
</div>