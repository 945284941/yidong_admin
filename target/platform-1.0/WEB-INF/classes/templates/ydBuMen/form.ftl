<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">部门设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">部门名称：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="name" value="${(recharge.name)!""}"
                   class="form-control">
        </div>
    </div>

<#if roleId == '1'>
        <div class="form-group">
            <label class="control-label col-md-3">地区：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.diquId??>
                 <select name="diquId"  class="form-control">
                     <#list  diqu as diqu>
                         <option value="${diqu.id!''}"  <#if diqu.id == recharge.diquId>selected="selected"</#if> >${diqu.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.diquId??>
                 <select name="diquId"  class="form-control">
                      <#list  diqu as diqu>
                          <option value="${diqu.id!''}">${diqu.name}</option>
                      </#list>
                 </select>
                 </#if>
            </div>
        </div>
</#if>
        <div class="form-group">
            <label class="control-label col-md-3">描述：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="remark" value="${(recharge.remark)!""}"
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
    <button type="button" onclick="Duang.getService('ydBuMenService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
