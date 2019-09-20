<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">新闻审核</h4>
</div>
<div class="modal-body">
    <form id="system_member_form_table" class="form-horizontal"
          novalidate="novalidate">
        <div class="form-body">

        </div>
    </form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydNewsService').updateStatuss('${(news.id)!""}','1')" class="btn green circle"><i
            class="fa fa-save"></i> 通过
    </button>
    <button type="button" onclick="Duang.getService('ydNewsService').updateStatuss('${(news.id)!""}','2')" class="btn green circle"><i
            class="fa fa-save"></i> 不通过
    </button>
</div>
<script>

</script>