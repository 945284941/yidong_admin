<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover">
    <thead>
    <#--<th style="text-align: center;">调查问题标题</th>-->
    <th style="text-align: center;">选项描述</th>
    <#--<th style="text-align: center;">a</th>-->
    <#--<th style="text-align: center;">b</th>-->
    <#--<th style="text-align: center;">c</th>-->
    <th style="text-align: center;">类型</th>
    <#--<th style="text-align: center;">选择类型</th>-->
    <#--<th style="text-align: center;">发布状态</th>-->
    <#--<th style="text-align: center;">地区</th>-->
    <#--<th style="text-align: center;">发起人</th>-->
    <#--<th style="text-align: center;">发起时间</th>-->
    <th style="text-align: center;">修改时间</th>
    <th style="text-align: center;">排序</th>
    <th style="text-align: center;">操作</th>
    </thead>
    <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <#--<td>${(recharge.title)!"暂无"}</td>-->
            <td>${(recharge.question)!"暂无"}</td>

                <#--<td>${(recharge.a)!"暂无"}</td>-->
                <#--<td>${(recharge.b)!"暂无"}</td>-->
                <#--<td>${(recharge.c)!"暂无"}</td>-->
                <td>
                    <#if recharge.chooseType?? >
                         <#if recharge.chooseType == '0'>
                         分数
                    </#if>
                            <#if recharge.chooseType == '1'>
                            问答
                            </#if>
                </#if>
                </td>
            <#--<td>-->
            <#--<#if recharge.releaseState??>-->
                <#--<#if recharge.releaseState == '0'>-->
                <#--草稿-->
                <#--</#if>-->
                <#--<#if recharge.releaseState == '1'>-->
                <#--正式发布-->
                <#--</#if>-->
            <#--</#if>-->
            <#--</td>-->
            <#--<td>${(recharge.diQuName)!"暂无"}</td>-->

            <#--<td>${(recharge.createName)!"暂无"}</td>-->

            <td> <#if recharge.createTime??>  ${(recharge.createTime)?datetime}</#if> </td>

            <#--<td> <#if recharge.updateTime??> ${(recharge.updateTime)!"暂无"}</#if> </td>-->

            <td>${(recharge.sortNum)!"暂无"}</td>
            <td class="text-center">


               <a href="javascript:Duang.getService('ydQuestionnaireService').messageedit('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 编辑</a>
                <#--<a href="javascript:Duang.getService('ydQuestionnaireService').edit('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 正式发布</a>-->


                <a onclick="Duang.getService('ydQuestionnaireService').messagedelete('${recharge.id}','${recharge.questionnaireId!''}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 删除</a>


                    <#if recharge.chooseType?? >
                        <#if recharge.chooseType == '0'>
                           <#--<a onclick="Duang.getService('ydQuestionnaireService').tongji('${recharge.id}','${recharge.questionnaireId!''}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 查看分数</a>-->
                                                   <a onclick="Duang.getService('ydQuestionnaireService').contentManager('${recharge.id!''}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 查看分数</a>

                        </#if>
                        <#if recharge.chooseType == '1'>
                           <a onclick="Duang.getService('ydQuestionnaireService').contentManager('${recharge.id!''}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 查看回答</a>
                        </#if>
                    </#if>
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
                        Duang.getService('ydQuestionnaireService').messagepageList(num,'${id}');
                    }
                }
            })
        </#if>
    })
</script>