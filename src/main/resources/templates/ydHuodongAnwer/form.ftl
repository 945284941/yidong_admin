<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">活动属性设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>

        <input type="hidden" name="type" value="0">
        <input type="hidden" name="huodongId" value="${(recharge.huodongId)!""}">
        <div class="form-group">
            <label class="control-label col-md-3">属性1：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="one" value="${(recharge.one)!""}"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">属性2：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="two" value="${(recharge.two)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性3：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="three" value="${(recharge.three)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性4：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="four" value="${(recharge.four)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性5：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="five" value="${(recharge.five)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性6：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="six" value="${(recharge.six)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性7：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="seven" value="${(recharge.seven)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">属性8：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="egiht" value="${(recharge.egiht)!""}"
                       class="form-control">
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
    <button type="button" onclick="Duang.getService('ydHuoDongService').baodansave()" class="btn green circle"><i
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