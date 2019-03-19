<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">用户管理</h4>
</div>
<div class="modal-body">
    <form id="system_user_form_table" class="form-horizontal"
          novalidate="novalidate">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-3">用户角色：
                  <span class="required"aria-required="true"> * </span>
                </label>

                <div class="col-md-6">
                    <input name="id" type="hidden" value="${(user.id)!""}">
                    <#if (roleList?? && roleList?size gt 0)>
                        <#list roleList as role>
                            <input type="text" id="system_user_form_roleName"  readonly class="form-control tree_input input-large" value="${(role.name)!""}" >
                            <input type="hidden" id="system_user_form_roleIds" name="roleIds" value="${(role.id)!""}">
                        </#list>
                    <#else >
                        <input type="text" id="system_user_form_roleName"  readonly class="form-control tree_input input-large"  >
                        <input type="hidden" id="system_user_form_roleIds" name="roleIds" >
                    </#if>
                    <div class="treeList"  id="system_user_edit_treeList">
                        <ul id="system_user_edit_ztree" class="ztree"></ul>
                    </div>
                </div>

            </div>
            <div class="form-group">
                <label class="control-label col-md-3">登录账号：
                                                                    <span class="required"
                                                                          aria-required="true"> * </span>
                </label>
                <div class="col-md-7">
                    <input type="text" name="username" data-required="1"
                           class="form-control" value="${(user.username)!""}">
                </div>
            </div>
            <#if user.id??>
                <#else >
                    <div class="form-group according">
                        <label class="control-label col-md-3">登录密码：
                                                                    <span class="required"
                                                                          aria-required="true"> * </span>
                        </label>
                        <div class="col-md-7">
                            <div class="input-icon right">
                                <input type="password" name="password"
                                       class="form-control" data-required="1"
                                       placeholder="" value="${(user.password)!""}">
                            </div>
                        </div>
                    </div>
            </#if>
            <div class="form-group">
                <label class="control-label col-md-3">姓名：
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-7">
                    <input type="text" data-required="1" name="truename" value="${(user.truename)!""}"
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
    <button type="button" onclick="Duang.getService('userservice').saveOrUpdate()" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
<script>
    function hideMenu() {
        $("#system_user_edit_treeList").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
        if (!(event.target.id == "system_user_form_roleName" || event.target.id == "system_user_edit_treeList" || $(event.target).parents("#system_user_edit_treeList").length > 0)) {
            hideMenu();
        }
    }
    $(document).ready(function () {
        $('#system_user_form_roleName').focus(function () {
            $('#system_user_edit_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });
        Duang.getService('userservice').initRoleSelect('${(user.id)!"---------"}','${platform_session_info.id}');
    });
</script>