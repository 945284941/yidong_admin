<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('productService').initImg();
    Duang.getService('productService').initUeditor();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加商品</h4>
</div>
<div class="modal-body">
    <form action="#" id="product_add_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="sellerId" name="sellerId" value="${(id)!""}">
        <input type="hidden" id="imgSrc" name="imgSrc">
        <input type="hidden" id="memo" name="memo">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">名称: </label>
                <div class="col-md-6">
                    <input type="text" name="name" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型: </label>
                <div class="col-md-6">
                    <select class="form-control" id="typeList" name="typeList" >
                                <#list productTypes as list>
                                    <option value="${(list.typeId)!""},${(list.typeName)!""}">${(list.typeName)!""}</option>
                                </#list>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">图片: </label>
                <div class="col-md-6">
                    <input id="imgFile" name="imgFile" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">数量: </label>
                <div class="col-md-6">
                    <input type="text" name="number" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">价格: </label>
                <div class="col-md-6">
                    <input type="text" name="price" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">状态: </label>
                <div class="col-md-6">
                    <select id="state" name="state" class="form-control">
                        <option value="">无</option>
                        <option value="0">最新首发</option>
                        <option value="1">闪购</option>
                        <option value="2">上新</option>
                        <option value="3">品牌头条</option>
                        <option value="4">首页</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">说明: </label>
                <div class="col-md-6">
                    <script id="editor" type="text/plain">

                    </script>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('productService').productSave()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
