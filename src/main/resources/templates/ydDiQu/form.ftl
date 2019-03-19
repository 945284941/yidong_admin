<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">地区设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
            <label class="control-label col-md-3">名称：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="name" value="${(recharge.name)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">排序：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="number" data-required="1" name="paixu" value="${(recharge.paixu)!""}"
                       class="form-control">
            </div>
        </div>
</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydDiQuService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
