<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('menuService').initImg();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改一级分类</h4>
</div>
<div class="modal-body">
    <form action="#" id="menu_edit_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="id" name="id" value="${(typeClass.id)!""}">
        <input type="hidden" id="imgUrl" name="imgUrl"  value="${(typeClass.imgUrl)!""}">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">名称: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="name" value="${(typeClass.name)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">图片: </label>
                <div class="col-md-6">
                    <input id="imgFile" name="imgFile" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">排序：</label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="level" value="${(typeClass.level)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型：</label>
                <div class="col-md-6">
                    <select class="form-control" name="state" >
                        <option value="0" <#if typeClass.state="0">selected</#if>>分类</option>
                        <option value="1" <#if typeClass.state="1">selected</#if>>楼层</option>
                    </select>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('menuService').menuUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>