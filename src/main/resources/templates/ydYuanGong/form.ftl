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


        <div class="form-group">
            <label class="control-label col-md-3">申请时间：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <div class="input-group date form_datetime col-md-12"  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                    <input class="form-control" size="16" type="text" style="width:200px;" name="shenqingTime"  value="<#if recharge.shenqingTime??> ${recharge.shenqingTime?datetime}</#if>" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>

            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">性别：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#--<input type="text" data-required="1" name="dianhua" value="${(recharge.dianhua)!""}"-->
                       <#--class="form-control">-->

                 <select name="sex" class="form-control">
                     <#if recharge.sex??>
                         <option value="0"  <#if '0' == recharge.sex>selected="selected"</#if> >男</option>
                         <option value="1"  <#if '1' == recharge.sex>selected="selected"</#if> >女</option>
                     </#if>
                     <#if !recharge.sex??>
                         <option value="0" >男</option>
                         <option value="1" >女</option>
                     </#if>

                 </select>
            </div>
        </div>


        <div class="form-group">
            <label class="control-label col-md-3">民族：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="minzu"     value="${(recharge.minzu)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">学历：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="study"     value="${(recharge.study)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">政治面貌：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="mianmao"     value="${(recharge.mianmao)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">出生日期：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <div class="input-group date form_datetime col-md-12"  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                    <input class="form-control" size="16" type="text" style="width:200px;" name="birthday"  value="<#if recharge.birthday??> ${recharge.birthday?date}</#if>" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">身份证：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="personCard"     value="${(recharge.personCard)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">地址：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="address"    value="${(recharge.address)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">爱好：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="aihao"    value="${(recharge.aihao)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">入会时间：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <div class="input-group date form_datetime col-md-12"  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                    <input class="form-control" size="16" type="text" style="width:200px;" name="createTime"  value="<#if recharge.createTime??> ${recharge.createTime?datetime}</#if>" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
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
