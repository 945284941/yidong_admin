<#assign ctx=request.contextPath>
<style>

</style>
<table class="table table-bordered table-hover" style="width:100%">
    <thead>
    <th style="text-align: center;">俱乐部名称</th>
    <th style="text-align: center;" height="20" width="50" >俱乐部简介</th>
    <th style="text-align: center;">俱乐部分类</th>
    <th style="text-align: center;">地区</th>
    <th style="text-align: center;">阅读量</th>
    <th style="text-align: center;">俱乐部图片</th>
    <#--<th style="text-align: center;">日常活动开始时间</th>-->
    <#--<th style="text-align: center;">日常活动结束时间</th>-->
    <th style="text-align: center;">创建时间</th>
    <th style="text-align: center;">创建者</th>

    <th style="text-align: center;">操作</th>
    </thead>
    <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <td >${(recharge.title)!"暂无"}</td>
            <td  >
                <div style="width:200px;height: 40px;overflow: hidden;">
                ${(recharge.content)!"暂无"}
                </div>
            </td>
            <td>${(recharge.catName)!"暂无"}</td>
            <td>${(recharge.diQuName)!"暂无"}</td>
            <td>${(recharge.readNum)!"0"}</td>
            <td> <img src="${recharge.imgUrl!''}" style="width: 100px;height: 100px;"></td>
            <#--<td> <#if recharge.startTime??>  ${(recharge.startTime)?datetime} </#if></td>-->
            <#--<td> <#if recharge.endTime??> ${(recharge.endTime)?datetime} </#if></td>-->
            <td>${(recharge.createTime)?datetime}</td>
            <td>${(recharge.createName)!"暂无"}</td>



            <td class="text-center">
                <a onclick="Duang.getService('ydHuoDongService').delete('${recharge.id}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 删除</a>


                <a href="javascript:Duang.getService('ydHuoDongService').lookPeople('1','${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 查看报名人员</a>
                <a href="javascript:Duang.getService('ydHuoDongService').baominglv('${recharge.id}')"
                   class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 活动参与情况</a>

               <#--<#if recharge.checkStatus == '0'>-->
                    <#--<a href="javascript:Duang.getService('ydHuoDongService').shenhe('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 审核 </a>-->
                              <#--<a href="javascript:Duang.getService('ydHuoDongService').edit('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 编辑</a>-->

               <#--</#if>-->
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
                        Duang.getService('ydHuoDongService').pageList(num);
                    }
                }
            })
        </#if>
    })
</script>