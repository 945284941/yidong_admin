<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加商品分类</h4>
</div>
<div class="modal-body">
    <form action="#" id="productType_add_form" class="form-horizontal" novalidate="novalidate">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">一级分类: </label>
                <div class="col-md-6">
                    <select class="form-control" id="typeClassId" name="typeClassId" >
                                <#list typeClassList as list>
                                    <option value="${(list.id)!""}">${(list.name)!""}</option>
                                </#list>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">分类名称: </label>
                <div class="col-md-6">
                    <input  type="text" name="typeName" data-required="1" class="form-control input-large">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('productTypeService').productTypeSave()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
