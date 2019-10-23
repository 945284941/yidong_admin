<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">调查问卷设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">调查问卷标题：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="title" value="${(recharge.title)!""}"
                   class="form-control">
        </div>
    </div>
        <div class="form-group">
        <label class="control-label col-md-3">选项描述：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="miaoshu" value="${(recharge.miaoshu)!""}"
                   class="form-control">
        </div>
    </div>

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">选项a：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="text" data-required="1" name="a" value="${(recharge.a)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">选项b：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="text" data-required="1" name="b" value="${(recharge.b)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">选项c：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="text" data-required="1" name="c" value="${(recharge.c)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">选择类型：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<#if recharge.chooseType??>-->
                 <#--<select name="chooseType"  class="form-control">-->
                     <#--<option value="0" <#if recharge.chooseType == '0'>selected="selected"</#if> >单选</option>-->
                     <#--<option value="1" <#if recharge.chooseType == '1'>selected="selected"</#if>>多选</option>-->
                 <#--</select>-->
                <#--</#if>-->
                 <#--<#if !recharge.chooseType??>-->
                 <#--<select name="chooseType"  class="form-control">-->
                     <#--<option value="0">单选</option>-->
                     <#--<option value="1">多选</option>-->
                 <#--</select>-->
                 <#--</#if>-->
            <#--</div>-->
        <#--</div>-->
<#if roleId != '1'>
 <input type="hidden" value="${communityId}" name="communityId">
</#if>
<#if roleId == '1'>
        <div class="form-group">
            <label class="control-label col-md-3">地区：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.communityId??>
                 <select name="communityId"  class="form-control" disabled="disabled">
                     <#list  diqu as diqu>
                         <option value="${diqu.id!''}"  <#if diqu.id == recharge.communityId>selected="selected"</#if> >${diqu.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.communityId??>
                 <select name="communityId"  class="form-control">
                      <#list  diqu as diqu>
                          <option value="${diqu.id!''}">${diqu.name}</option>
                      </#list>
                 </select>
                 </#if>
            </div>
        </div>
</#if>
        <div class="form-group">
            <label class="control-label col-md-3">发布状态：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.releaseState??>
                 <select name="releaseState"  class="form-control">
                     <option value="0" <#if recharge.releaseState == '0'>selected="selected"</#if> >草稿</option>
                     <option value="1" <#if recharge.releaseState == '1'>selected="selected"</#if>>正式发布</option>
                 </select>
                </#if>
                 <#if !recharge.releaseState??>
                 <select name="releaseState"  class="form-control">
                     <option value="0">草稿</option>
                     <option value="1">正式发布</option>
                 </select>
                 </#if>
            </div>
        </div>
        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">排序：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="number" data-required="1" name="sortNum" value="${(recharge.sortNum)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">排序：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="number" data-required="1" name="paixu" value="${(recharge.paixu)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->
</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydQuestionnaireService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
