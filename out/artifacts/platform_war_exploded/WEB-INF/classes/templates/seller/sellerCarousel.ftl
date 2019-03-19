<#assign ctx=request.contextPath>
<script type="text/javascript">
    Duang.getService('sellerService').initImg();
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">商家轮播图</h4>
</div>
<div class="modal-body">
    <form action="#" id="carousel_form" class="form-horizontal" novalidate="novalidate">
        <input type="hidden" name="sellerId" value="${(sellerId)!""}">
        <input type="hidden" id="imgLogo" name="imgUrl">
        <#assign index = 0 >
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">选择: </label>
                <div class="col-md-6">
                    <select class="form-control" id="selectId" name="id" >
                        <option value="">添加</option>
                        <#list carousels as list>
                           <#assign index = index+1>
                           <option value="${(list.id)!""}">修改或删除 ${index} </option>
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
                <label class="control-label col-md-4">链接: </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" id="href" name="href" value="">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">说明: </label>
                <div class="col-md-6">
                     <input type="text" data-required="1" class="form-control input-large" id="remark" name="remark" value="">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
    <button type="button" class="btn green circle" onclick="Duang.getService('sellerService').sellerCarouselSave()"><i class="fa fa-save"></i> 保存或更新 </button>
    <button type="button" class="btn green circle" onclick="Duang.getService('sellerService').sellerCarouselDelete()"><i class="fa fa-save"></i> 删除 </button>
</div>