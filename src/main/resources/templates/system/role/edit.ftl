<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">角色维护【${(role.name)!"新建"}】</h4>
</div>
<div class="alert alert-warning">
    <strong>警告：</strong>变更角色上级需要重新授权,删除授权,子节点同样被删除
</div>
<div class="modal-body">
    <form action="#" id="system_role_edit_form" class="form-horizontal" novalidate="novalidate">
        <div class="form-body">
            <div class="form-group">
                <label class="control-label col-md-4">上级角色:
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <input type="text" id="system_role_edit_parentName" readonly
                           value="${(role.parentRole.name)!""}" class="form-control tree_input input-large"
                           style="width: 25rem;">
                    <input type="hidden" id="system_role_edit_parentId" value="${(role.parentRole.id)!'0'}" name="pid">
                <#if role??>
                    <input type="hidden" value="${(role.id)!""}" name="id">
                </#if>
                    <div class="treeList" id="system_role_edit_treeList">
                        <ul id="system_role_eidt_ztree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">角色名称：
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <input type="text" data-required="1" class="form-control input-large" name="name"
                           value="${(role.name)!""}">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">描述：
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <div class="input-icon right">
				                    <textarea type="text" name="remark" class="form-control input-large"
                                              data-required="1" placeholder="">${(role.remark)!""}</textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-4">地区：
                    <span class="required" aria-required="true"> * </span>
                </label>
                <div class="col-md-6">
                    <div class="input-icon right">
                        <select name="departmentId" class="form-control">
                            <#if role.departmentId??>
                                <#list departmentId as departmentId>
                                    <option value="${departmentId.id}" <#if role.departmentId == departmentId.id > selected="selected"</#if> >
                                        ${departmentId.name!''}
                                    </option>
                                </#list>



                            </#if>
<#if !role.departmentId??>
                                   <#list departmentId as departmentId>
                                    <option value="${departmentId.id}"  >
                                        ${departmentId.name!''}
                                    </option>
                                   </#list>
</#if>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div id="system_role_accredit_div">

    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>
        取消
    </button>
    <button type="button" class="btn green circle" onclick="Duang.getService('roleservice').saveOrUpdate()"><i
            class="fa fa-save"></i> 保存
    </button>
</div>
<script>
    $(document).ready(function () {

        function hideMenu() {
            $("#system_role_edit_treeList").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(event.target.id == "system_role_edit_parentName" || event.target.id == "system_role_edit_treeList" || $(event.target).parents("#system_role_edit_treeList").length > 0)) {
                hideMenu();
            }
        }
        $('#system_role_edit_parentName').focus(function () {
            $('#system_role_edit_treeList').show();
            $("body").bind("mousedown", onBodyDown);
        });
        Duang.getService('roleservice').initRoleSelect();
        <#if (role.id)??>
            Duang.getService("roleservice").initPermissionTree('${role.id}',"true");
        </#if>
    });
</script>
