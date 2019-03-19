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



</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydHuoDongService').shenheya('2')" class="btn green circle"><i
            class="fa fa-save"></i> 审核不通过
    </button>
    <button type="button" onclick="Duang.getService('ydHuoDongService').shenheya('1')" class="btn green circle"><i
            class="fa fa-save"></i> 审核通过
    </button>
</div>
