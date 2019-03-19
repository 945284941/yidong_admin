<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('menuService').initImg();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加一级分类</h4>
</div>
<div class="modal-body">
    <form action="#" id="menu_add_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="imgUrl" name="imgUrl">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">名称: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="name">
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
                    <input type="text" data-required="1" class="form-control input-large" name="level">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型：</label>
                <div class="col-md-6">
                    <select class="form-control" name="state" >
                        <option value="0" selected>分类</option>
                        <option value="1">楼层</option>
                    </select>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('menuService').menuSave()"><i class="fa fa-save"></i> 保存 </button>
</div>