<#assign ctx=request.contextPath>
<table class="table table-bordered table-hover">
    <thead>
    <th style="text-align: center;">律师姓名</th>
    <th style="text-align: center;">律师手机号</th>
    <th style="text-align: center;">律师微信</th>
    <th style="text-align: center;">部门</th>
    <th style="text-align: center;">微信二维码</th>
    <th style="text-align: center;">操作</th>
    </thead>
    <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <td>${(recharge.name)!"暂无"}</td>
            <td>${(recharge.phone)!"暂无"}</td>
            <td>${(recharge.wxCode)!"暂无"}</td>
            <td>${(recharge.diquName)!"暂无"}</td>
            <td>
                <#if recharge.wxImage??>
                    <img src="${recharge.wxImage}" style="height: 100px;width: 100px;i">
                </#if>

            </td>
            <td class="text-center">
                <a href="javascript:Duang.getService('lawyerService').edit('${recharge.id}')" class="btn btn-link" role="button" ><i class="fa fa-pencil-square"></i> 编辑</a>
                <a onclick="Duang.getService('lawyerService').delete('${recharge.id}')" class="btn btn-link" ><i class="fa fa-trash-o"></i> 删除</a>
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
                        Duang.getService('lawyerService').pageList(num);
                    }
                }
            })
        </#if>
    })
</script>