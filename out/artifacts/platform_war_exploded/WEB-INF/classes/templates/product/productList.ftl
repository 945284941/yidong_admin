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
                    Duang.getService('productService').pageList(num);
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
        <th style="text-align:center;">类型</th>
        <th style="text-align:center;">图片</th>
        <th style="text-align:center;">数量</th>
        <th style="text-align:center;">价格</th>
        <th style="text-align:center;">说明</th>
        <th style="text-align:center;">状态</th>
        <th style="text-align:center;">月销量</th>
        <th style="text-align:center;">创建时间</th>
        <th style="text-align:center;width:500px;">操作</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
            <td align="center" style="width:100px;">${pageInfo.pageNum-1}${list_index+1}</td>
            <td align="center" style="width:200px;">${(list.name)!""}</td>
            <td align="center" style="width:200px;">${(list.type)!""}</td>
            <td align="center" style="width:200px;">
                <#if list.imgSrc??>
                    <img src="${list.imgSrc}" style="width: 50px;height: 50px;">
                <#else>
                      <p>暂无图片</p>
                </#if>
            </td>
            <td align="center" style="width:100px;">${(list.number)!""}</td>
            <td align="center" style="width:100px;">${(list.price)!""}</td>
            <td align="center" style="width:300px;">${(list.memo)!""}</td>
            <td align="center" style="width:200px;">
                <#if list.state = "0">
                    <p>最新首发</p>
                <#elseif list.state = "1">
                    <p>闪购</p>
                <#elseif list.state = "2">
                    <p>上新</p>
                <#elseif list.state = "3">
                    <p>品牌头条</p>
                <#elseif list.state = "4">
                    <p>首页</p>
                <#else>
                    无
                </#if>
            </td>
            <td align="center" style="width:150px;">
                <#if list.count??>
                    ${(list.count)!""}
                <#else>
                    无
                </#if>
            </td>
            <td align="center" style="width:300px;">${(list.createTime)?datetime}</td>
            <td align="center" style="width:300px;">
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('productService').productDelete('${(list.productId)!""}')">删除</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('productService').productEdit('${(list.productId)!""}')">编辑</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('productService').productCarousel('${(list.productId)!""}')">轮播图</button>
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