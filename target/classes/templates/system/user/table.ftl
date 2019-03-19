<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover">
    <thead>
    <th style="text-align: center;">登陆账号</th>
    <th style="text-align: center;">员工姓名</th>
    <th style="text-align: center;">拥有角色</th>
    <th style="text-align: center;">创建时间</th>
    <th style="text-align: center;">操作</th>
    </thead>
    <tbody>

    <#if users?? && users.list?? && users.list?size gt 0>
        <#list users.list as user>
        <tr style="text-align: center;">
            <td>${(user.username)!"暂无"}</td>
            <td>${(user.truename)!"无名氏"}</td>
            <td>
                <#if user.roleList?? && user.roleList?size gt 0 >
                    <#list user.roleList as role>
                        ${role.name}&nbsp;&nbsp;
                    </#list>
                </#if>
            </td>
            <td>${(user.createTime)?datetime}</td>
            <td class="text-center">
                <@shiro.hasPermission name="user_manager_edit">
                <a href="javascript:Duang.getService('userservice').edit('${user.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 编辑</a>
                </@shiro.hasPermission>

                <@shiro.hasPermission name="user_manager_delete">
                <a onclick="Duang.getService('userservice').delete('${user.id}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 删除</a>
                </@shiro.hasPermission>
            </td>
        </tr>
        </#list>
    </#if>
    </tbody>
</table>
<div class="clearfix">
    <div class="pull-right">
        <div class="demo">
            <div class="btn-group" id="pagenation">

            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        <#if users.pages gt 0>
            $("#pagenation").jqPaginator({
                totalPages:${users.pages},
                visiblePages: 10,
                currentPage: ${users.pageNum},
                first:'<button class="btn btn-white first" type="button">首页</button>',
                prev: '<button class="btn btn-white prev" type="button">上一页</button>',
                next: '<button class="btn btn-white next" type="button">下一页</button>',
                last: '<button class="btn btn-white last" type="button">末页</button>',
                page: '<button class="btn btn-white page">{{page}}</button>',
                onPageChange: function (num, type) {
                    if(type!='init'){
                        Duang.getService('userservice').pageList(num);
                    }
                }
            })
        </#if>
    })
</script>