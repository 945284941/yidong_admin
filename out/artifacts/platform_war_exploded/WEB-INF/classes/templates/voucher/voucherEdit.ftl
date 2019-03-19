<#assign ctx=request.contextPath>
<script type="text/javascript">
    $(function(){
        //Bootstrap时间初始化
        Duang.getService("voucherService").initSignEvery();
    })
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改卡券</h4>
</div>
<div class="modal-body">
    <form action="#" id="voucher_edit_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" name="voucherId" value="${(voucher.voucherId)!""}">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">标题: </label>
                <div class="col-md-6">
                    <input type="text" name="title" data-required="1" class="form-control input-large" value="${(voucher.title)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">备注: </label>
                <div class="col-md-6">
                    <input  type="text" name="remark" data-required="1" class="form-control input-large" value="${(voucher.remark)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型: </label>
                <div class="col-md-6">
                    <select name="type" class="form-control">
                        <option value="0" <#if voucher.type="0">selected</#if> >团购卡</option>
                        <option value="1" <#if voucher.type="1">selected</#if>>代金券 </option>
                        <option value="2" <#if voucher.type="2">selected</#if>>优惠券</option>
                        <option value="3" <#if voucher.type="3">selected</#if>>会员卡</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">金额: </label>
                <div class="col-md-6">
                    <input type="text"  name="money" data-required="1" class="form-control input-large"  value="${(voucher.money)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">日期: </label>
                <div class="col-md-6">
                    <div class="input-group input-large date-picker input-daterange" data-date="2018/01/01" data-date-format="yyyy/mm/dd">
                        <input  id="startTime"  type="text" class="form-control" readonly name="startDate"  value="${(voucher.startDate)?datetime}">
                        <span class="input-group-addon">至</span>
                        <input  id="endTime" type="text" class="form-control" readonly name="endDate"  value="${(voucher.endDate)?datetime}">
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('voucherService').voucherUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>