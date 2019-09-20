<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">活动人员列表</h4>
</div>
<div class="modal-body">

    <table class="table table-bordered table-hover">
        <thead>
        <th style="text-align: center;">部门</th>
        <th style="text-align: center;">姓名</th>

        <th style="text-align: center;">手机号</th>



        </thead>
        <tbody>

    <#if recharge?? && recharge.list?? && recharge.list?size gt 0>
        <#list recharge.list as recharge>
        <tr style="text-align: center;">
            <td>${(recharge.bumenName)!"暂无"}</td>
            <td>${(recharge.name)!"暂无"}</td>

            <td>${(recharge.dianhua)!"暂无"}</td>





        </tr>
        </#list>
    </#if>
        </tbody>
    </table>
    <div class="clearfix">
        <div class="pull-right" style="margin-right: 130px;">
            <div class="demo">
                <div class="btn-group" id="pagenationBaby">

                </div>
            </div>
        </div>
    </div>
</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 确定
    </button>
</div>
<script type="text/javascript">

    $(function(){
        <#if recharge.pages gt 0>
            $("#pagenationBaby").jqPaginator({
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
                        Duang.getService('ydHuoDongService').lookPeople(num,'${id}');
                    }
                }
            })
        </#if>
    })
</script>