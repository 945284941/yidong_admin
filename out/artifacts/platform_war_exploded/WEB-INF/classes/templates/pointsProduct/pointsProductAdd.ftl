<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('pointsProductService').initImg();
    Duang.getService('pointsProductService').initUeditor();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加积分商品</h4>
</div>
<div class="modal-body">
    <form action="#" id="pointsProduct_add_form" class="form-horizontal" novalidate="novalidate">
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
                <label class="control-label col-md-4">图片: </label>
                <div class="col-md-6">
                    <input id="imgFile" name="imgFile" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">积分: </label>
                <div class="col-md-6">
                    <input type="text" name="points" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">数量: </label>
                <div class="col-md-6">
                    <input type="text" name="count" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">商家说明: </label>
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
    <button type="button" class="btn green circle" onclick="Duang.getService('pointsProductService').pointsProductSave()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
