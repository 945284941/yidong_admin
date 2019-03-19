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
                    Duang.getService('memberService').pageList(num);
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
        <th style="text-align: center;">姓名</th>
        <th style="text-align: center;">手机号</th>
        <th style="text-align:center;">地址</th>
        <th style="text-align:center;;">余额</th>
        <th style="text-align:center;">消费余额</th>
        <th style="text-align:center;">信用积分</th>
        <th style="text-align:center;">会员卡号</th>
        <th style="text-align:center;">创建时间</th>
        <th style="text-align:center;">状态</th>
        <th style="text-align:center;width:1200px;">操作</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
            <td align="center" style="width:300px;">${pageInfo.pageNum-1}${list_index+1}</td>
            <td align="center" style="width:200px;">${(list.userName)!""}</td>
            <td align="center" style="width:200px;">${(list.phone)!""}</td>
            <td align="center" style="width:300px;">${(list.address)!""}</td>
            <td align="center" style="width:100px;">${(list.balance)!""}</td>
            <td align="center" style="width:100px;">${(list.account)!""}</td>
            <td align="center" style="width:100px;">${(list.point)!""}</td>
            <td align="center" style="width:300px;">${(list.memberNumber)!""}</td>
            <td align="center" style="width:300px;">${(list.createTime)?datetime}</td>
            <td align="center" style="width:100px;">
                <#if list.state??&& list.state="0">
                    正常
                <#elseif list.state?? && list.state="1">
                    冻结
                </#if>
            </td>
            <td align="center" style="width:1200px;">
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('memberService').memberDelete('${(list.id)!""}')">删除</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('memberService').memberEdit('${(list.id)!""}')">编辑</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('memberService').pointList('${(list.id)!""}')">详情</button>
                <button type="button" class="btn btn-default  btn-sm" onclick="Duang.getService('memberService').changeStatus('${(list.id)!""}','${(list.state!"")}')">状态</button>
            </td>
        </tr>
    </#list>
    </#if>
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