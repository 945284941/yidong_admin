<#assign ctx=request.contextPath>

<ul id="system_role_accredit_ztree" class="ztree"></ul>

<script>
    var system_role_accredit_setting = {
        check: {
            enable: true,
            chkDisabledInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    $(document).ready(function(){
        <#if first=='true'>
            $.post('${ctx}/role/accredit/ztree?roleId=${role.id}',function (data) {
                if(data.success){
                    $.fn.zTree.init($("#system_role_accredit_ztree"), system_role_accredit_setting, data.ztree);
                    var zTree = $.fn.zTree.getZTreeObj("system_role_accredit_ztree");
                    zTree.expandAll(false);
                }
            },'json')
        <#else>
            $.post('${ctx}/role/accredit/ztree/flush?roleId=${role.id}',function (data) {
                if(data.success){
                    $.fn.zTree.init($("#system_role_accredit_ztree"), system_role_accredit_setting, data.ztree);
                    var zTree = $.fn.zTree.getZTreeObj("system_role_accredit_ztree");
                    zTree.expandAll(false);
                }
            },'json')
        </#if>

    });
</script>