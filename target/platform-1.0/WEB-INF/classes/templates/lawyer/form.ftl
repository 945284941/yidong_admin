<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">律师设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">律师姓名：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="name" value="${(recharge.name)!""}"
                   class="form-control">
        </div>
    </div>
        <div class="form-group">
            <label class="control-label col-md-3">地区：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.diquId??>
                 <select name="diquId"  class="form-control">
                     <#list  diqu as diqu>
                         <option value="${diqu.id!''}"  <#if diqu.id == recharge.diquId>selected="selected"</#if> >${diqu.name}</option>
                     </#list>
                 </select>
                </#if>
                 <#if !recharge.diquId??>
                 <select name="diquId"  class="form-control">
                      <#list  diqu as diqu>
                          <option value="${diqu.id!''}">${diqu.name}</option>
                      </#list>
                 </select>
                 </#if>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">律师手机号：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="phone" value="${(recharge.phone)!""}"
                       class="form-control">
            </div>
        </div>


        <div class="form-group">
            <label class="control-label col-md-3">律师微信：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="wxCode" value="${(recharge.wxCode)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">微信二维码：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">

                <input type="file"  id="myImg" name="file" onchange="changImg()"><br>

                <input type="hidden" name="wxImage" id="defaultPicSrc" value="${(recharge.wxImage)!''}">
                <img src ="${(recharge.wxImage)!''}" style="width:100px;height:100px;" id="deImg">
            </div>
        </div>

</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('lawyerService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>

<script type="text/javascript">
    function changImg() {

        $.ajaxFileUpload({
            url: project.path + '/ydNews/imgSave',
            type: 'post',
            secureuri: false,                       //是否启用安全提交,默认为false
            fileElementId: 'myImg',
            dataType: 'JSON',
            success: function (data, status) {
                data = data.replace(/<.*?>/ig, "");
                var img = JSON.parse(data);
                if (img.success) {
                    $("#deImg").attr("src", img.message);
                    $("#defaultPicSrc").val(img.message);
                    Duang.success("提示", "上传成功");
                } else {
                    Duang.error("提示", "上传失败");
                }
            },
            error: function (data, status, e) {//服务器响应失败时的处理函数
                Duang.error("提示", "上传失败");
            }
        });
    }

</script>