<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">俱乐部设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
            <label class="control-label col-md-3">俱乐部名称：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="title" value="${(recharge.title)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">俱乐部类型：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
               <select name="catId" class="form-control">
                    <#if recharge.catId??>
                        <#list  huodongCat as huodongCat>
                            <option  <#if recharge.catId == huodongCat.id>selected="selected"</#if>
                                    value="${huodongCat.id!''}">${huodongCat.name!''}</option>

                        </#list>
                    </#if>
                     <#if !recharge.catId??>
                         <#list  huodongCat as huodongCat>
                            <option value="${huodongCat.id!''}">${huodongCat.name!''}</option>
                        </#list>

                     </#if>
               </select>
            </div>
        </div>
        <input type="hidden" name="baby" value="${baby!''}">

           <#if roleId != '1'>
               <input type="hidden" name="diquId" value="${diquId}">
           </#if>
        <#if roleId == '1'>
        <div class="form-group">
            <label class="control-label col-md-3">地区：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <#if recharge.diquId??>
                 <select name="diquId"  class="form-control" disabled="disabled">
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
        </#if>

        <div class="form-group">
            <label class="control-label col-md-3">俱乐部图片：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">

                <input type="file"  id="myImg" name="file" onchange="changImg()"><br>

                <input type="hidden" name="imgUrl" id="defaultPicSrc" value="${(recharge.imgUrl)!''}">
                <img src ="${(recharge.imgUrl)!''}" style="width:100px;height:100px;" id="deImg">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">俱乐部简介：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <textarea   name="content"
                            class="form-control infomation">${(recharge.content)!""}</textarea>
            </div>
        </div>
       <input type="hidden" name="type" value="${type!''}">
        <div class="form-group">
            <label class="control-label col-md-3">开始时间：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <div class="input-group " style="width:200px;">
                    <div class="input-group date form_datetime col-md-12"  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                        <input class="form-control" size="16" type="text" style="width:200px;" name="startTime"  value="<#if recharge.startTime??> ${recharge.startTime?datetime}</#if>" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">报名结束时间：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <div class="input-group " style="width:200px;">
                    <div class="input-group date form_datetime col-md-12"  data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                        <input class="form-control" size="16" type="text" style="width:200px;" name="endTime"  value="<#if recharge.endTime??> ${recharge.endTime?datetime}</#if>" readonly>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                    </div>
                </div>
            </div>
        </div>

</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydHuoDongService').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
<script type="text/javascript">

    window.setTimeout(function() {

        editor = KindEditor.create('.infomation', {
            width : '100px',
            height : '300px',
            items : [ 'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image','multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink' ],
            uploadJson :'${ctx}/ydNews/imgF',

            afterCreate : function() {
                this.sync();
            },
            afterBlur:function(){
                this.sync();
            },


        });
        editor.readonly(false);

    }, 1);
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',//显示格式
        todayHighlight: 1,//今天高亮
        minView: "month",//设置只显示到月份
        startView:2,
        forceParse: 0,
        showMeridian: 1,
        autoclose: 1//选择后自动关闭

    });


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