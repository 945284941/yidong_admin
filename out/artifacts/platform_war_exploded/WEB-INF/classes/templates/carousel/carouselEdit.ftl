<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('menuService').initImg();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">修改轮播图</h4>
</div>
<div class="modal-body">
    <form action="#" id="carousel_edit_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" id="id" name="id" value="${(carousel.id)!""}">
        <input type="hidden" id="imgUrl" name="imgUrl" value="${(carousel.imgUrl)!""}">
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
                        <option value="0" <#if carousel.type = "0">selected</#if>>大广告位轮播图</option>
                        <option value="1" <#if carousel.type = "1">selected</#if>>积分轮播图</option>
                        <option value="2" <#if carousel.type = "2">selected</#if>>活动轮播图</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">跳转链接: </label>
                <div class="col-md-6">
                    <input type="text" name="href" data-required="1" class="form-control input-large" value="${(carousel.href)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">说明: </label>
                <div class="col-md-6">
                    <input type="text" name="remark" data-required="1" class="form-control input-large" value="${(carousel.remark)!""}">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('carouselService').carouselUpdate()"><i class="fa fa-save"></i> 保存 </button>
</div>