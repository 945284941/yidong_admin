<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">员工设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">员工姓名：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="name" value="${(recharge.name)!""}"
                   class="form-control">
        </div>
    </div>

        <div class="form-group">
            <label class="control-label col-md-3">工号：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="gonghao" value="${(recharge.gonghao)!""}"
                       class="form-control">
            </div>
        </div>


        <div class="form-group">
            <label class="control-label col-md-3">手机号：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="dianhua" value="${(recharge.dianhua)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">部门：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.departmentId??>
                 <select name="departmentId"  class="form-control">
                     <#list  diqu as diqu>
                         <option value="${diqu.id!''}"  <#if diqu.id == recharge.departmentId>selected="selected"</#if> >${diqu.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.departmentId??>
                 <select name="departmentId"  class="form-control">
                      <#list  diqu as diqu>
                          <option value="${diqu.id!''}">${diqu.name}</option>
                      </#list>
                 </select>
                 </#if>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">职位：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.zhiweiId??>
                 <select name="zhiweiId"  class="form-control">
                     <#list  zhiwei as zhiwei>
                         <option value="${zhiwei.id!''}"  <#if zhiwei.id == recharge.zhiweiId>selected="selected"</#if> >${zhiwei.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.zhiweiId??>
                 <select name="zhiweiId"  class="form-control">
                      <#list  zhiwei as zhiwei>
                          <option value="${zhiwei.id!''}">${zhiwei.name}</option>
                      </#list>
                 </select>
                 </#if>
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
    <button type="button" onclick="Duang.getService('ydYuanGongService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
