<#assign ctx=request.contextPath>
<script type="text/javascript">
    $(function () {
    <#if  pageInfo.pages gt 0>
        $('#pagenation').jqPaginator( {
            totalPages: ${pageInfo.pages},
            visiblePages: 10,
            currentPage: ${pageInfo.pageNum},
            first:'<button class="btn btn-white first" type="button">首页</button>',
            prev: '<button class="btn btn-white prev" type="button">上一页</button>',
            next: '<button class="btn btn-white next" type="button">下一页</button>',
            last: '<button class="btn btn-white last" type="button">末页</button>',
            page: '<button class="btn btn-white page">{{page}}</button>',
            onPageChange: function (num, type) {
                if(type!='init'){
                    Duang.getService('menuService').pageList(num);
                }
            }
        });
    </#if >
    });
</script>
<table class="table table-bordered table-hover" >
    <thead>
    <tr>
        <th style="text-align: center;">序号</th>
        <th style="text-align: center;">名称</th>
        <th style="text-align: center;">图片</th>
        <th style="text-align:center;">排序</th>
        <th style="text-align:center;">类型</th>
        <th style="text-align:center;width:500px;">操作</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
            <td align="center" style="width:300px;">${pageInfo.pageNum-1}${list_index+1}</td>
            <td align="center" style="width:300px;">${(list.name)!""}</td>
            <td align="center" style="width:300px;">
                 <#if list.imgUrl??>
                     <img src="${list.imgUrl}" style="width: 50px;height: 50px;">
                 <#else>
                      <p>暂无图片</p>
                 </#if>
            </td>
            <td align="center" style="width:300px;">${(list.level)!""}</td>
            <td align="center" style="width:300px;">
                  <#if list.state??&& list.state="0">
                    分类
                  <#elseif list.state?? && list.state="1">
                    楼层
                  </#if>
            </td>
            <td align="center" style="width:300px;">
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('menuService').menuDelete('${(list.id)!""}')">删除</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('menuService').menuEdit('${(list.id)!""}')">编辑</button>
            </td>
        </tr>
    </#list></#if>
    </tbody>
</table>
<table class="table table-bordered table-hover" id="table">

</table>
<div class="clearfix">
    <div class="pull-right">
        <div class="demo">
            <div class="btn-group" id="pagenation">

            </div>
        </div>
    </div>
</div>