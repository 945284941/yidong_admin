<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改用户信息</h4>
</div>
<div class="modal-body">
    <form action="#" id="member_edit_form" class="form-horizontal" novalidate="novalidate">
       <input type="hidden" name="id" value="${(member.id)!""}">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">姓名: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="userName" readonly="readonly" value="${(member.userName)!""}">
                </div>
            </div>
           <div class="form-group">
                <label class="control-label col-md-4">手机号：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" readonly="readonly" name="phone" value="${(member.phone)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">地址：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" readonly="readonly" name="address" value="${(member.address)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">余额：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large"  name="balance" value="${(member.balance)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">消费余额：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="account" value="${(member.account)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">信用积分：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="point" value="${(member.point)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">会员卡号：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" readonly="readonly" name="memberNumber" value="${(member.memberNumber)!""}">
                </div>
            </div>
    <#--        <div class="form-group">
                <label class="control-label col-md-4">创建时间：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="createTime" value="${(member.createTime)!""}">
                </div>
            </div>-->
        </div>
    </form>

</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('memberService').memberUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
