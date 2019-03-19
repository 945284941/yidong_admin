<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="${ctx}">首页</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>
				操作日志
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
                        <form id="visitingRecord_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="col-md-3 control-label">时间选择:</label>
                                                <div class="col-md-9">
                                                    <div class="input-group input-large date-picker input-daterange" data-date="2018/01/01" data-date-format="yyyy/mm/dd">
                                                        <input  type="text" class="form-control" readonly name="startTime">
                                                        <span class="input-group-addon">至</span>
                                                        <input  type="text" class="form-control" readonly name="endTime">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">操作人:</label>
                                                <div class="col-md-8">
                                                    <input type="text" name="trueName" class="form-control" id="visitingRecord_userName">
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
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('visitingRecordservice').recordList();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('visitingRecordservice').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="recordList">

            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
	$(function(){
	    Duang.getService("visitingRecordservice").recordList();
        //Bootstrap时间初始化
	    Duang.getService("visitingRecordservice").initSignEvery();
	})
</script>