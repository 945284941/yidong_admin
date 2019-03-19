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
                    Duang.getService('voucherService').pageList(num);
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
        <th style="text-align: center;">标题</th>
        <th style="text-align: center;">备注</th>
        <th style="text-align:center;">类型</th>
        <th style="text-align:center;">金额</th>
        <th style="text-align:center;">开始期限</th>
        <th style="text-align:center;">结束期限</th>
        <th style="text-align:center;width:500px;">操作</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
            <td align="center" style="width:300px;">${pageInfo.pageNum-1}${list_index+1}</td>
            <td align="center" style="width:300px;">${(list.title)!""}</td>
            <td align="center" style="width:300px;">${(list.remark)!""}</td>
            <td align="center" style="width:300px;">
                <#if list.type = "0">
                    <p> 团购卡</p>
                <#elseif list.type = "1">
                    <p>代金券</p>
                <#elseif list.type = "2">
                    <p>优惠券</p>
                <#elseif list.type = "3">
                    <p>会员卡</p>
                </#if>
            <td align="center" style="width:300px;">${(list.money)!""}</td>
            <td align="center" style="width:300px;">${(list.startDate)?datetime}</td>
            <td align="center" style="width:300px;">${(list.endDate)?datetime}</td>
            <td align="center" style="width:300px;">
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('voucherService').voucherDelete('${(list.voucherId)!""}')">删除</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('voucherService').voucherEdit('${(list.voucherId)!""}')">编辑</button>
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