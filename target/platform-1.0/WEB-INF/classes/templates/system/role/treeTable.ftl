<#assign ctx=request.contextPath>
<#assign firstRoot=0>
<#macro buildNode root pid>
<tr data-tt-id="${root.id}"  data-tt-parent-id="${pid}"  <#if firstRoot==1>style="display: none;" </#if>class="branch collapsed">
    <td><span style="padding-left: 0px;"></span>${(root.name)!"角色名称丢失"}</td>
    <td>${(root.remark)!""}</td>
    <td class="text-center">
        <#if firstRoot==1>
            <@shiro.hasPermission name="role_manager_edit">
                <a href="javascript:Duang.getService('roleservice').edit('${root.id}')" class="btn btn-link" role="button"><i class="fa fa-pencil-square"></i>编辑&授权</a>
            </@shiro.hasPermission>

            <@shiro.hasPermission name="role_manager_delete">
            <a href="javascript:Duang.getService('roleservice').delete('${root.id}')" class="btn btn-link"><i class="fa fa-trash-o"></i> 删除</a>
            </@shiro.hasPermission>
        </#if>
    </td>
</tr>
    <#if root.sub?? && root.sub?size gt 0>
        <#assign firstRoot=1>
        <#list root.sub as sub>
            <@buildNode root=sub pid="${root.id}"/>
        </#list>
    </#if>
</#macro>


<table id="system_role_manager_table" class="treetable table table-bordered">

    <thead>
    <tr>
        <th width="600">角色名称</th>
        <th>角色描述 </th>
        <th width="300" class="text-center">操作</th>
    </tr>
    </thead>

    <tbody>
    <#if (roleList?? && roleList?size gt 0)>
                  <#list roleList as role>
        <@buildNode role "${role.pid}"/>
    </#list>
         </#if>
    </tbody>
</table>
<script>
    $('#system_role_manager_table').treetable({
        expandable: true ,
        initialState: "expanded"
    });
</script>