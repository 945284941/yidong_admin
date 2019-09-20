<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover">
    <thead>
    <th style="text-align: center;">新闻标题</th>
    <#--<th style="text-align: center;">地区名称</th>-->
    <th style="text-align: center;">新闻分类</th>
    <th style="text-align: center;">内容分类</th>
    <th style="text-align: center;">审核状态</th>
    <th style="text-align: center;">图片</th>
    <th style="text-align: center;">创建者</th>


    <th style="text-align: center;">操作</th>
    </thead>
    <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <td>${(recharge.name)!"暂无"}</td>
            <#--<td>${(recharge.diquName)!"暂无"}</td>-->
            <td>${(recharge.newCatName)!"暂无"}</td>
            <td>
                <#if recharge.type??>
                      <#if recharge.type == '0'>
                      新闻
                      </#if>
                        <#if recharge.type == '1'>
                        链接
                        </#if>
                </#if>
            </td>
            <td>
                <#if recharge.state ??>
                    <#if recharge.state == '0'>
                    审核中
                    </#if>
                     <#if recharge.state == '1'>
                     审核通过
                     </#if>
                     <#if recharge.state == '2'>
                     审核未通过
                     </#if>
                </#if>
            </td>
            <td> <img src="${(recharge.imgUrl)!""}" style="width: 100px;height: 100px;"> </td>
            <td>${(recharge.createName)!"暂无"}</td>
            <td>${(recharge.createTime)!?datetime}</td>
            <td class="text-center">
                <a href="javascript:Duang.getService('ydNewsService').edit('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 编辑</a>
                <a onclick="Duang.getService('ydNewsService').delete('${recharge.id}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 删除</a>

               <#if recharge.state == '0'>
                  <a onclick="Duang.getService('ydNewsService').shenhe('${recharge.id}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 审核</a>
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
                        Duang.getService('ydNewsService').pageList(num);
                    }
                }
            })
        </#if>
    })
</script>