<#assign ctx=request.contextPath>
<!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js">
<![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js">
<![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
    <head>
        <meta charset="utf-8"/>
        <title>一卡通管理平台登陆</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta content="#1 selling multi-purpose bootstrap admin theme sold in themeforest marketplace packed with angularjs, material design, rtl support with over thausands of templates and ui elements and plugins to power any type of web applications including saas and admin dashboards. Preview page of Theme #1 for "
              name="description"/>
        <meta content="" name="author"/>
        <link href="${ctx}/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="${ctx}/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="${ctx}/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="${ctx}/css/login-2.min.css" rel="stylesheet" type="text/css"/>
        <link href="${ctx}/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="${ctx}/css/plugins.min.css" rel="stylesheet" type="text/css" />
        <script src="${ctx}/plugins/jquery.min.js" type="text/javascript"></script>
        <link rel="shortcut icon"href="favicon.ico"/>
        <script>
            if(top != self){
                top.location.href = location.href;
            }
        </script>
    </head>
    <body class=" login">
        <div class="logo">
            <a href="${ctx}/login" >
                <img src="${ctx}/images/logo.png" alt=""/> </a>
        </div>
        <div class="content">
            <form class="login-form" action="${ctx}/login" method="post">
                <input type="hidden" id="login_session_error_msg" value="${Session["loginErrorMessage"]!""}">
                <div class="form-title">
                    <span class="form-title">Welcome.</span>
                    <span class="form-subtitle">Please login.</span>
                </div>
                <div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span> 用户名和密码不能为空! </span>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Username</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" value="${Session.loginUsername_!""}"/>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Password</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" />
                </div>
                <#if Session.validCodeShow??>
                <div class="form-group col-md-6" style="padding-left: 0;padding-right: 0">
                    <input class="form-control form-control-solid placeholder-no-fix" placeholder="验证码" name="validMsg">
                </div>
                <div class="form-group col-md-6" style="padding-left: 0;padding-right: 0">
                    <img class="form-control form-control-solid placeholder-no-fix" id="kaptcha" src="${ctx}/images/kaptcha.jpg" title="点击更换" onclick="javascript:refreshCaptcha();"/>
                </div>
                </#if>
                <div class="form-actions">
                    <button type="submit" class="btn red btn-block uppercase">Login</button>
                </div>
                <#--<div class="form-actions">-->
                    <#--<div class="pull-left">-->
                        <#--<label class="rememberme mt-checkbox mt-checkbox-outline">-->
                            <#--<input type="checkbox" name="remember" value="1" /> Remember me-->
                            <#--<span></span>-->
                        <#--</label>-->
                    <#--</div>-->
                    <#--<div class="pull-right forget-password-block">-->
                        <#--<a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>-->
                    <#--</div>-->
                <#--</div>-->
            </form>
        </div>
        <div class="copyright"> 2017 © 一卡通管理平台</div>

        <script src="${ctx}/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="${ctx}/plugins/jquery-validation/jquery.validate.min.js" type="text/javascript"></script>
        <script src="${ctx}/plugins/jquery-validation/additional-methods.min.js" type="text/javascript"></script>

        <script src="${ctx}/plugins/login.js" type="text/javascript"></script>
        <script src="${ctx}/plugins/app.js" type="text/javascript"></script>

        <script>
            function refreshCaptcha() {
                $("#kaptcha").attr("src","/images/kaptcha.jpg?t=" + Math.random());
            }
        </script>
    </body>

</html>