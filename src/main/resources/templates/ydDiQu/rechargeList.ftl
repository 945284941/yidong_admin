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
                    Duang.getService('rechargeService').pageList(num);
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
        <th style="text-align: center;">支付金额</th>
        <th style="text-align: center;">应得金额</th>
        <th style="text-align:center;">状态</th>
        <th style="text-align:center;">创建时间</th>
        <th style="text-align:center;width:500px;">创建人</th>
        <th style="text-align:center;width:500px;">操作</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
            <td align="center" style="width:300px;">${pageInfo.pageNum-1}${list_index+1}</td>
            <td align="center" style="width:300px;">${(list.actualRecharge)!""}</td>
            <td align="center" style="width:300px;">${(list.shouldRecharge)!""}</td>
            <td align="center" style="width:300px;">
                <#if list.isDel = "0">
                    <p>删除</p>
                <#elseif list.isDel = "1">
                    <p>正常</p>
                </#if>
            </td>
            <td align="center" style="width:300px;">${(list.createTime)?datetime}</td>
            <td align="center" style="width:300px;">${(list.createUserid)!""}</td>
            <td align="center" style="width:300px;">
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('rechargeService').rechargeDelete('${(list.id)!""}')">删除</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('rechargeService').rechargeEdit('${(list.id)!""}')">编辑</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('rechargeService').rechargeIsDel('${(list.id)!""}','${(list.isDel!"")}')">状态</button>
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