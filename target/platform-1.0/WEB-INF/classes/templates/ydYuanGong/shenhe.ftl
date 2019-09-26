<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">审核       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">审核：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <#--<input type="text" data-required="1" name="name" value="${(recharge.name)!""}"-->
                   <#--class="form-control">-->
            <select name="state" class="form-control">
                <#if recharge.state??>
                    <option value="0"  <#if recharge.state == '0'>selected="selected"</#if> > 审核中 </option>
                                    <option value="1" <#if recharge.state == '1'>selected="selected"</#if>> 审核成功 </option>

                                    <option value="2" <#if recharge.state == '2'>selected="selected"</#if>> 审核失败 </option>

                </#if>
                   <#if !recharge.state??>
                           <option value="0"> 审核中 </option>
                                    <option value="1"> 审核成功 </option>

                                    <option value="2"> 审核失败 </option>
                   </#if>
            </select>
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
<script type="text/javascript">
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',//显示格式
        todayHighlight: 1,//今天高亮
        minView: "month",//设置只显示到月份
        startView:2,
        forceParse: 0,
        showMeridian: 1,
        autoclose: 1//选择后自动关闭

    });
</script>
