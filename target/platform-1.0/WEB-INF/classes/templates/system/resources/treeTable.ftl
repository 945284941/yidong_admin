<#assign ctx=request.contextPath>
<#assign firstRoot=0>
<#macro buildNode root pid>
<tr data-tt-id="${root.id}"  data-tt-parent-id="${pid}"  <#if firstRoot==1>style="display: none;" </#if>class="branch collapsed">
    <td><span style="padding-left: 0px;"></span>${(root.name)!"角色名称丢失"}</td>
    <td>${(root.url)!"按钮"}</td>
    <td><#if (root.type == "1")>菜单
        <#elseif (root.type == "2")>按钮
        <#else>
        </#if>
    </td>
    <td>${(root.deep)!""}</td>
    <td>${(root.code)!""}</td>
    <td class="text-center">
        <#--<@shiro.hasPermission name="resources_manager_edit">-->
            <a href="javascript:Duang.getService('resourceservice').edit('${root.id}')" class="btn btn-link" role="button"><i class="fa fa-pencil-square"></i> 编辑</a>
        <#--</@shiro.hasPermission>-->
        <#--<@shiro.hasPermission name="resources_manager_delete">-->
            <a href="javascript:Duang.getService('resourceservice').delete('${root.id}')" class="btn btn-link"><i class="fa fa-trash-o"></i> 删除</a>
        <#--</@shiro.hasPermission>-->
        <#if (root.type == "1")>
            <#--<@shiro.hasPermission name="resources_manager_addButton">-->
                <a href="javascript:Duang.getService('resourceservice').addButton('${root.id}')" class="btn btn-link"><i class="glyphicon glyphicon-plus"></i> 添加下级</a>
            <#--</@shiro.hasPermission>-->
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


<table id="system_resource_manager_table" class="treetable table table-bordered">

    <thead>
    <tr>
        <th width="600">资源名称</th>
        <th width="300">模块路径</th>
        <th width="100">类型</th>
        <th width="100">深度</th>
        <th width="300">CODE </th>
        <th width="600" class="text-center">操作</th>
    </tr>
    </thead>

    <tbody>
        <#if (resList?? && resList?size gt 0)>
            <#list resList as res>
                <@buildNode res "${res.pid}"/>
            </#list>
        </#if>
    </tbody>
</table>
<script>
    $('#system_resource_manager_table').treetable({
        expandable: true ,
        initialState: "collapsed"
    });
</script>