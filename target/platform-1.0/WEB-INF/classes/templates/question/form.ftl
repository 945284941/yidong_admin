<#assign ctx=request.contextPath>
<script>
    window.setTimeout(function() {

        editor = KindEditor.create('.infomation', {
            width : '100px',
            height : '300px',
            items : [ 'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image','multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink' ],
            uploadJson :'${ctx}/ydQuestionnaireMessage/imgF',

            afterCreate : function() {
                this.sync();
            },
            afterBlur:function(){
                this.sync();
            },


        });
        editor.readonly(false);

    }, 1);
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">法律援助       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>
        <div class="form-group">
        <label class="control-label col-md-3">问题：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <textarea class="form-control" name="question">
              ${recharge.question!''}
            </textarea>
        </div>
    </div>


        <div class="form-group">
            <label class="control-label col-md-3">回答：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <textarea type="text" name="answer"
                          class="form-control infomation">  ${recharge.answer!''}</textarea>

            </div>
        </div>


</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('questionService').saveOrUpdate()" class="btn green circle"><i
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