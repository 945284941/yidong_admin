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

        <div class="form-group">
        <label class="control-label col-md-3">调查问卷描述：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="question" value="${(recharge.question)!""}"
                   class="form-control">
        </div>
    </div>

        <div class="form-group">
            <label class="control-label col-md-3">选项a：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="a" value="${(recharge.a)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">选项b：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="b" value="${(recharge.b)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">选项c：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="c" value="${(recharge.c)!""}"
                       class="form-control">
            </div>
        </div>

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


        <input type="hidden" name="questionnaireId" value="${id}">


        <div class="form-group">
            <label class="control-label col-md-3">排序：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="number" data-required="1" name="sortNum" value="${(recharge.sortNum)!""}"
                       class="form-control">
            </div>
        </div>

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
    <button type="button" onclick="Duang.getService('ydQuestionnaireService').messagesaveOrUpdate('${id}')" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
