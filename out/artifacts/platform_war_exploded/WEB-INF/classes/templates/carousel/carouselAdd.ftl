<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('menuService').initImg();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">添加轮播图</h4>
</div>
<div class="modal-body">
    <form action="#" id="carousel_add_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="imgUrl" name="imgUrl">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">图片: </label>
                <div class="col-md-6">
                    <input id="imgFile" name="imgFile" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">类型: </label>
                <div class="col-md-6">
                    <select id="type" name="type" class="form-control">
                        <option value="0">大广告位轮播图</option>
                        <option value="1">积分轮播图</option>
                        <option value="2">活动轮播图</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">跳转链接: </label>
                <div class="col-md-6">
                    <input type="text" name="href" data-required="1" class="form-control input-large">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">说明: </label>
                <div class="col-md-6">
                    <input type="text" name="remark" data-required="1" class="form-control input-large">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('carouselService').carouselSave()"><i class="fa fa-save"></i> 保存 </button>
</div>
<script>

</script>
