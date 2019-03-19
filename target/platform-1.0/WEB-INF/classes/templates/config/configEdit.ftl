<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改字典信息</h4>
</div>
<div class="modal-body">
    <form action="#" id="config_edit_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="id" name="id" value="${(sysConfig.id)!""}">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">键: </label>
                <div class="col-md-6">
                    <input type="text" name="key" value="${(sysConfig.key)!""}" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">值: </label>
                <div class="col-md-6">
                    <input  type="text" name="value" value="${(sysConfig.value)!""}" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">备注: </label>
                <div class="col-md-6">
                    <input type="text"  name="remark" value="${(sysConfig.remark)!""}" data-required="1" class="form-control input-large">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('configService').configUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>