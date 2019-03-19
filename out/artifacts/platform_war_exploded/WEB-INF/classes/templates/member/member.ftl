<#assign ctx=request.contextPath>
<script type="text/javascript">
    $(function(){
        Duang.getService('memberService').memberList();
        //Bootstrap时间初始化
        Duang.getService("memberService").initSignEvery();
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
                用户列表
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
                        <form id="member_searchFrom" role="form" class="form-horizontal form-bordered">
                            <div class="form-body">
                                <div class="form-group">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">时间选择:</label>
                                            <div class="col-md-9">
                                                <div class="input-group input-large date-picker input-daterange" data-date="2018/01/01" data-date-format="yyyy/mm/dd">
                                                    <input  id="startTime"  type="text" class="form-control" readonly name="startTime">
                                                    <span class="input-group-addon">至</span>
                                                    <input  id="endTime" type="text" class="form-control" readonly name="endTime">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
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
                            <a class="btn btn-circle btn-outline green active"
                               onclick="Duang.getService('memberService').memberList();"><i class="icon-magnifier"></i>
                                查询</a>
                            <a class="btn btn-circle btn-outline blue empty"
                               onclick="Duang.getService('memberService').reset();"><i class="glyphicon glyphicon-refresh"></i>
                                重置</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body" id="memberList">

            </div>
        </div>
    </div>
</div>
<input type="hidden" id="memberId">
<div id="member_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true"
     style="display:none; padding-right: 17px;">
    <div class="modal-dialog">
        <div class="modal-content">

        </div>
    </div>
</div>