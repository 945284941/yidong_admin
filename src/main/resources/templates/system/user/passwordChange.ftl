<#assign ctx=request.contextPath>
<!-- BEGIN PAGE BAR -->
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <a href="${ctx}/">首页</a>
            <i class="fa fa-circle"></i>
        </li>
        <li>
            <span>用户密码维护</span>
        </li>
    </ul>
</div>
<div class="gap"></div>
<!-- END PAGE BAR -->
<div class="row">
    <div class="col-sm-12">
        <div class="portlet light bordered">
            <form action="#" id="passwordForm" class="form-horizontal" novalidate="novalidate">
                <div class="form-body">
                    <div class="form-group">
                        <label class="control-label col-md-3">登录账号：
                            <span class="required" aria-required="true"> * </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" name="username" data-required="1" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3">原密码：
                            <span class="required" aria-required="true"> * </span>
                        </label>
                        <div class="col-md-4">
                            <div class="input-icon right" id="yuaneyePass">
                                <i class="fa fa-eye" id="yuaneye" state="on" ></i>
                                <input type="text" name="password" data-required="1" class="form-control">

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3">新密码：
                            <span class="required" aria-required="true"> * </span>
                        </label>
                        <div class="col-md-4">
                            <div class="input-icon right" id="eyePass">
                                <i class="fa fa-eye" id="eye" state="on" ></i>
                                <input type="text" id="newPassword" name="newPassword" class="form-control" data-required="1" placeholder="">
                            </div>
                        </div>


                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3">重新输入新密码：
                            <span class="required" aria-required="true"> * </span>
                        </label>
                        <div class="col-md-4" >
                            <div class="input-icon right" id="chongeyePass">
                                <i class="fa fa-eye" id="chongeye" state="on" ></i>
                                <input type="text" name="newPwdagin" data-required="1" class="form-control">

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-7">
                            <div class="pull-right">
                                <@shiro.hasPermission name="user_repassword_clean">
                                <a type="button" class="btn blue circle" href="javascript:Duang.getService('passservice').clean()">
                                    <i class="icon-trash"></i>清空
                                </a>
                                </@shiro.hasPermission>
                                <@shiro.hasPermission name="user_repassword_save">
                                <a type="button" class="btn green circle" href="javascript:Duang.getService('passservice').save()">
                                    <i class="fa fa-save"></i> 保存
                                </a>
                                </@shiro.hasPermission>
                            </div>

                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        Duang.getService("passservice").yuanshow();
        Duang.getService("passservice").show();
        Duang.getService("passservice").chongshow();
    });

</script>