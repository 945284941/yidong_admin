<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('sellerService').initImg();
    Duang.getService('sellerService').initUeditor();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加商家信息</h4>
</div>
<div class="modal-body">
    <form action="#" id="seller_add_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="imgLogo" name="imgLogo" >
        <input type="hidden" id="remark" name="remark">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">商家名称: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="name">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">商家LOGO: </label>
                <div class="col-md-6">
                    <input id="imgFile" name="imgFile" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型：</label>
                <div class="col-md-6">
                    <select class="form-control" id="typeList" name="typeList" >
                                <#list productTypes as list>
                                    <option value="${(list.typeId)!""},${(list.typeName)!""}">${(list.typeName)!""}</option>
                                </#list>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">楼层：</label>
                <div class="col-md-6">
                    <select class="form-control" id="floorList" name="floorList" >
                                <#list typeClasses as list>
                                     <option value="${(list.id)!""},${(list.name)!""}">${(list.name)!""}</option>
                                </#list>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">地址：</label>
                <div class="col-md-6">
                    <select class="form-control" id="address" name="address" >
                                <#list sysConfigs as list>
                                    <option value="${(list.value)!""}">${(list.value)!""}</option>
                                </#list>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">营业时间: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="startDate">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">手机号: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="phone">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">商家说明: </label>
                <div class="col-md-6">
                    <script id="editor" name="editor" type="text/plain">

                    </script>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('sellerService').sellerSave()"><i class="fa fa-save"></i> 保存 </button>
</div>