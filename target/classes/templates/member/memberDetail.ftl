<#assign ctx=request.contextPath>
<script>
    $(function () {
         <#if error??>
            alert('${error}');
         <#elseif pageInfo.pages gt 0>
            $('#pagenation_list').jqPaginator( {
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
                        Duang.getService('memberService').pointListByPoint(num);
                    }
            }
        });
        </#if >
    });
</script>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <h4 class="modal-title">查看消费信息</h4>
</div>
<div class="modal-body">
    <form action="#" id="member_point_list" class="form-horizontal" novalidate="novalidate">
        <table class="table table-bordered table-hover" >
            <thead>
            <tr>
                <th style="text-align: center;">姓名</th>
                <th style="text-align: center;">积分变化</th>
                <th style="text-align:center;">日期</th>
                <th style="text-align:center;">状态</th>
                <th style="text-align:center;;">备注</th>
            </tr>
            </thead>
            <tbody>
            <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
                <#list pageInfo.list as list>
                <tr style="text-align: center;">
                    <td align="center" style="width:200px;">${(list.userName)!""}</td>
                    <td align="center" style="width:200px;">${(list.change)!""}</td>
                    <td align="center" style="width:200px;">${(list.createDate)?datetime}</td>
                    <td align="center" style="width:100px;">
                        <#if list.state??&& list.state="0">
                            支出
                        <#elseif list.state?? && list.state="1">
                            收入
                        </#if>
                    </td>
                    <td align="center" style="width:300px;">${(list.remark)!""}</td>
                </tr>
                </#list>
            </#if>
            </tbody>
        </table>
    </form>
</div>
<div class="clearfix">
    <div class="pull-right">
        <div class="demo">
            <div class="btn-group" id="pagenation_list">

            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i class="icon-close"></i>取消</button>
</div>
<script>

</script>
