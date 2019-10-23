<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">轮播图设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <#--<div class="form-group">-->
        <#--<label class="control-label col-md-3">部门名称：-->
            <#--<span class="required" aria-required="true"> * </span>-->
        <#--</label>-->
        <#--<div class="col-md-7">-->
            <#--<input type="text" data-required="1" name="name" value="${(recharge.name)!""}"-->
                   <#--class="form-control">-->
        <#--</div>-->
    <#--</div>-->

        <div class="form-group">
            <label class="control-label col-md-3">轮播图：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">

                <input type="file"  id="myImg" name="file" onchange="Duang.getService('ydNewsService').changImg()"><br>

                <input type="hidden" name="pic" id="defaultPicSrc" value="${(recharge.pic)!''}">
                <img src ="${(recharge.pic)!''}" style="width:100px;height:100px;" id="deImg">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">部门：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.diquId??>
                 <select name="diquId"  class="form-control">
                     <option value="9999" <#if '9999'== recharge.diquId>selected="selected"</#if> >全部</option>
                     <#list  diqu as diqu>
                         <option value="${diqu.id!''}"  <#if diqu.id == recharge.diquId>selected="selected"</#if> >${diqu.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.diquId??>
                 <select name="diquId"  class="form-control">
                     <option value="9999" >全部</option>
                      <#list  diqu as diqu>

                          <option value="${diqu.id!''}">${diqu.name}</option>
                      </#list>
                 </select>
                 </#if>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">名称：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="name" value="${(recharge.name)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">跳转链接：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="href" value="${(recharge.href)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">类型：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                 <select name="type" class="form-control">
                     <#if  recharge.type ??>
                         <option value="0"  <#if recharge.type == '0'>selected="selected"</#if> >新闻资讯</option>
                         <option value="1"  <#if recharge.type == '1'>selected="selected"</#if>>会员服务</option>
                         <option value="2"  <#if recharge.type == '2'>selected="selected"</#if>>工会学堂</option>
                     </#if>
<#if  !recharge.type ??>
                         <option value="0"  >新闻资讯</option>
                         <option value="1" >会员服务</option>
                         <option value="2"  >工会学堂</option>
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
    <button type="button" onclick="Duang.getService('bannerService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
