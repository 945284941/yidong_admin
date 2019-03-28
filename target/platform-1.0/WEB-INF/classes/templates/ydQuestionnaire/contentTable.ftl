<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover">
    <thead>
    <#--<th style="text-align: center;">调查问题标题</th>-->
    <th style="text-align: center;width: 70%;">回答</th>
    <th style="text-align: center;width: 30%;">回答人员</th>
    <#--<th style="text-align: center;">选择类型</th>-->
    <#--<th style="text-align: center;">发布状态</th>-->
    <#--<th style="text-align: center;">地区</th>-->
    <#--<th style="text-align: center;">发起人</th>-->
    <#--<th style="text-align: center;">发起时间</th>-->


    </thead>
    <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <td>${(recharge.content)!"暂无"}</td>
            <td>${(recharge.memberName)!"暂无"}</td>
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
        <#if recharge.pages gt 0>
            $("#pagenation").jqPaginator({
                totalPages:${recharge.pages},
                visiblePages: 10,
                currentPage: ${recharge.pageNum},
                first:'<button class="btn btn-white first" type="button">首页</button>',
                prev: '<button class="btn btn-white prev" type="button">上一页</button>',
                next: '<button class="btn btn-white next" type="button">下一页</button>',
                last: '<button class="btn btn-white last" type="button">末页</button>',
                page: '<button class="btn btn-white page">{{page}}</button>',
                onPageChange: function (num, type) {
                    if(type!='init'){
                        Duang.getService('ydQuestionnaireService').contentloadTablePageList(num);
                    }
                }
            })
        </#if>
    })
</script>