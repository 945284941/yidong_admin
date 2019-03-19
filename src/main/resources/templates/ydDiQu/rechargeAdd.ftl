<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加定额充值</h4>
</div>
<div class="modal-body">
    <form action="#" id="recharge_add_form" class="form-horizontal" novalidate="novalidate">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">支付金额: </label>
                <div class="col-md-6">
                    <input type="text" name="actualRecharge" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">应得金额: </label>
                <div class="col-md-6">
                    <input  type="text" name="shouldRecharge" data-required="1" class="form-control input-large">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('rechargeService').rechargeSave()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
