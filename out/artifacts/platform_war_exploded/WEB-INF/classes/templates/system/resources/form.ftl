<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">资源维护【${(res.name)!"新建"}】</h4>
</div>
<#--<div class="alert alert-warning">-->
    <#--<strong>警告：</strong>变更角色上级需要重新授权！-->
<#--</div>-->
<div class="modal-body">
    <form action="#" id="system_resource_edit_form" class="form-horizontal" novalidate="novalidate">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">上级资源:
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <input type="text" id="system_resource_edit_parentName" readonly disabled="false"
                           value="${(res.parentResources.name)!"根目录"}" class="form-control tree_input input-large"
                           style="width: 25rem;">
                    <input type="hidden" id="system_resource_edit_parentId" value="${(res.parentResources.id)!'0'}" name="pid">
                <#if res??>
                    <input type="hidden" value="${(res.id)!""}" name="id">
                </#if>
                    <div class="treeList" id="system_resource_edit_treeList">
                        <ul id="system_resource_edit_ztree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">资源名称：
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="name"
                           value="${(res.name)!""}" required="required">
                </div>
            </div>
            <div id="type" class="form-group">
                <label class="control-label col-md-4">类型：
                     <span  aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                     <div class="input-icon right">
                        <select class="form-control" id="type" name="type" >
                            <option value="1">菜单</option>
                            <option value="2">按钮</option>
                        </select>
                     </div>
                </div>
            </div>
            <div class="form-group">
                 <label class="control-label col-md-4">CODE：
                     <span class="required" aria-required="true"> * </span>
                 </label>
                 <div class="col-md-6">
                     <input type="text" data-required="1" class="form-control input-large" name="code"
                                       value="${(res.code)!""}" required="required">
                 </div>
            </div>
            <div class="form-group">
                 <label class="control-label col-md-4">模块路径：
                     <span class="required" aria-required="true">  </span>
                 </label>
                 <div class="col-md-6">
                     <input type="text" id="url" data-required="1" class="form-control input-large" name="url"
                          value="${(res.url)!""}">
                 </div>
            </div>
            <div class="form-group">
                 <label class="control-label col-md-4">排序：
                      <span class="required" aria-required="true"> * </span>
                 </label>
                 <div class="col-md-6">
                      <input type="text" data-required="1" class="form-control input-large" name="sort"
                                      value="${(res.sort)!""}">
                 </div>
            </div>
            <div class="form-group" style="display:none;">
                             <label class="control-label col-md-4">深度：
                                  <span class="required" aria-required="true"> * </span>
                             </label>
                             <div class="col-md-6">
                                  <input type="text" data-required="1" class="form-control input-large" name="deep"
                                                  value="${(res.parentResources.deep)!"0"}">
                             </div>
            </div>

        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>
        取消
    </button>
    <button type="button" class="btn green circle" onclick="Duang.getService('resourceservice').saveOrUpdate()"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
<script>
    $(document).ready(function () {

        function hideMenu() {
            $("#system_resource_edit_treeList").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(event.target.id == "system_resource_edit_parentName" || event.target.id == "system_resource_edit_treeList" || $(event.target).parents("#system_resource_edit_treeList").length > 0)) {
                hideMenu();
            }
        }
        $('#system_resource_edit_parentName').focus(function () {
            $('#system_resource_edit_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });

        Duang.getService('resourceservice').initParentResourceSelect();

        var type = "${(res.type)!""}";
        var resModel = "${(res.name)!""}";
        if(type == '1'){
             $("#type").val("1");
             $("#type").find("option[value='1']").attr("selected",true);
        }else if(type == '2'){
            $("#parentModel").attr("disabled",true);
            //$("#url").attr("disabled",true);
             $("#type").find("option[value='2']").attr("selected",true);
        }

        /*$("#type").change(function(){
           var tt = $('#type option:selected').val();
           if(tt == '1'){
                $("#url").attr("disabled",false);

           }else if(tt == '2'){
                $("#url").attr("disabled",true);
                $("#url").val("");
           }
        });*/

    });
</script>
