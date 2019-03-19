<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('productService').initImg();
    Duang.getService('productService').initUeditor();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改商品</h4>
</div>
<div class="modal-body">
    <form action="#" id="product_edit_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="productId" name="productId" value="${(product.productId)!""}">
        <input type="hidden" id="imgSrc" name="imgSrc" value="${(product.imgSrc)!""}">
        <input type="hidden" id="memo" name="memo" value="${(product.memo)!""}">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">名称: </label>
                <div class="col-md-6">
                    <input type="text" name="name" data-required="1" class="form-control input-large" value="${(product.name)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型: </label>
                <div class="col-md-6">
                    <select class="form-control" id="typeList" name="typeList" >
                                <#list productTypes as list>
                                    <#if list.typeId == product.typeId>
                                        <option value="${(list.typeId)!""},${(list.typeName)!""}" selected>${(list.typeName)!""}</option>
                                    <#else>
                                        <option value="${(list.typeId)!""},${(list.typeName)!""}">${(list.typeName)!""}</option>
                                    </#if>
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
                    <input type="text" name="number" data-required="1" class="form-control input-large" value="${(product.number)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">价格: </label>
                <div class="col-md-6">
                    <input type="text" name="price" data-required="1" class="form-control input-large" value="${(product.price)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">状态: </label>
                <div class="col-md-6">
                    <select id="state" name="state" class="form-control">
                        <option value=""  <#if product.state = "">selected</#if> >无</option>
                        <option value="0" <#if product.state = "0">selected</#if>>最新首发</option>
                        <option value="1" <#if product.state = "1">selected</#if>>闪购</option>
                        <option value="2" <#if product.state = "2">selected</#if>>上新</option>
                        <option value="3" <#if product.state = "3">selected</#if>>品牌头条</option>
                        <option value="4" <#if product.state = "4">selected</#if>>首页</option>
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
    <button type="button" class="btn green circle" onclick="Duang.getService('productService').productUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>