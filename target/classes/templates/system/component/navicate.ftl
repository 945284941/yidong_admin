<#assign ctx=request.contextPath>
<#-- 定义宏buildNode -->
<#macro buildNode root>
    <li class="nav-item start">
        <a href="<#if root.sub?? >javascript:void(0) <#else> ${ctx}${root.url}</#if>" class="<#if root.sub?? >nav-link nav-toggle <#else> ajaxify</#if>">
            <i class="${root.icon!'icon-home'}"></i>
            <span class="title">${root.name!}</span>
            <span class="selected"></span>
            <#if root.sub?? ><span class="arrow"></span></#if>
        </a>
        <#if root.sub?? && root.sub?size gt 0>
            <#assign child=root.sub>
            <ul class="sub-menu">
                <#list child as subMenu>
                    <@buildNode root=subMenu/>
                </#list>
            </ul>
        </#if>
    </li>
</#macro>


<div class="page-sidebar navbar-collapse collapse">
    <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true"
        data-slide-speed="200" style="padding-top: 20px">

        <li class="sidebar-toggler-wrapper hide">
            <div class="sidebar-toggler">
                <span></span>
            </div>
        </li>

        <#--<li class="sidebar-search-wrapper">-->
            <#--<form class="sidebar-search  " action="page_general_search_3.html" method="POST">-->
                <#--<a href="javascript:;" class="remove">-->
                    <#--<i class="icon-close"></i>-->
                <#--</a>-->
                <#--<div class="input-group">-->
                    <#--<input type="text" class="form-control" placeholder="Search...">-->
                        <#--<span class="input-group-btn">-->
                            <#--<a href="javascript:;" class="btn submit">-->
                                <#--<i class="icon-magnifier"></i>-->
                            <#--</a>-->
                        <#--</span>-->
                <#--</div>-->
            <#--</form>-->
        <#--</li>-->
        <li class="nav-item start active open">
            <a href="${ctx}/index;" class="ajaxify">
                <i class="icon-home"></i>
                <span class="title">首页</span>
                <span class="selected"></span>
            </a>
        </li>
        <#if tree?? && tree?size gt 0 >
            <#list tree as root>
                <@buildNode root></@buildNode>
            </#list>
        </#if>
    </ul>
    <!-- END SIDEBAR MENU -->
    <!-- END SIDEBAR MENU -->
</div>
<!-- END SIDEBAR -->