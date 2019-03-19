<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover" >
    <thead>
    <tr>

        <th style="text-align: center;">行为名称</th>
        <th style="text-align: center;">操作人</th>
        <th style="text-align:center;">操作时间</th>
    </tr>
    </thead>
    <tbody>
    <#if pageInfo?? && pageInfo.list?? && pageInfo.list?size gt 0>
    <#list pageInfo.list as list>
        <tr style="text-align: center;">
             <td style="width:300px;">${(list.actionName)!""}</td>
             <td align="center" style="width:300px;">${(list.truename)!""}</td>
             <td align="center" style="width:300px;">${(list.createTime)?datetime}</td>
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
                    Duang.getService('visitingRecordservice').pageList(num);
                }
            }
        });
    </#if >
        /*$('#table').bootstrapTable({
            columns: [{
                field: 'id',
                title: '111'
            }, {
                field: 'name',
                title: '222'
            }, {
                field: 'price',
                title: '333'
            }],
            data: [

            ]
        });*/
    });
</script>
