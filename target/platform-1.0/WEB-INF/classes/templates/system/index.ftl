<#assign ctx=request.contextPath>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
    <meta charset="utf-8"/>
    <title>后台管理</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="#1"
          name="description"/>
    <meta content="" name="author"/>

    <link href="${ctx}/plugins/font-awesome/css/font-awesome.min.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <link href="${ctx}/plugins/simple-line-icons/simple-line-icons.min.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="${ctx}/plugins/select2/css/select2.min.css?v=3.0.1" />
    <link href="${ctx}/plugins/bootstrap/css/bootstrap.min.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <link href="${ctx}/js/extends/zTree/css/zTreeStyle/zTreeStyle.css?v=3.0.1" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${ctx}/plugins/treetable/css/jquery.treetable.css?v=3.0.1"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/plugins/treetable/css/jquery.treetable.theme.default.css?v=3.0.1"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/plugins/treetable/css/screen.css?v=3.0.1"/>
    <link href="${ctx}/plugins/bootstrap-table/css/bootstrap-table.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <!--自己的css-->
    <link href="${ctx}/css/components.min.css?v=3.0.1" rel="stylesheet" id="style_components" type="text/css" />
    <link href="${ctx}/css/plugins.min.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <link href="${ctx}/css/layout/css/layout.min.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <link href="${ctx}/css/layout/css/themes/darkblue.min.css?v=3.0.1" rel="stylesheet" type="text/css" id="style_color" />
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></script>
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
    <#--<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=8RB6ge1FXsIkD6tzbwaQ8VwSLQt74QNQ"></script>  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>-->
  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/simplex.js"></script>
<!-- weiweiwei-->


    <script charset="utf-8" src="${ctx}/weixin/ueditor/ueditor.config.js" type="text/javascript"></script>
    <script charset="utf-8" src="${ctx}/weixin/ueditor/ueditor.all.min.js" type="text/javascript"> </script>
    <script charset="utf-8" src="${ctx}/weixin/ueditor/lang/zh-cn/zh-cn.js" type="text/javascript"></script>


    <link href="${ctx}/js/extends/toastr/toastr.min.css?v=3.0.1" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/js/extends/dialog/ui-dialog.css?v=3.0.1" rel="stylesheet">
    <link rel="shortcut icon" href="${ctx}/favicon.ico"/>
    <link href="${ctx}/css/custom.css?v=3.0.1" rel="stylesheet" type="text/css" />
    <script src="${ctx}/plugins/jquery.min.js?v=3.0.1" type="text/javascript"></script>
    <script src="${ctx}/js/extends/jquery/jquery.extends.js?v=3.0.1" type="text/javascript"></script>

    <script type="text/javascript" src="${ctx }/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx }/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" />
    <#--<script src="${ctx }/plugins/js/bootstrap.min.js " charset="utf-8 "></script>-->
<#--年月日时分插件-->
    <script src="${ctx}/plugins/calendar/jquery-calendar.js" type="text/javascript"></script>
    <link href="${ctx}/plugins/calendar/jquery-calendar.css" rel="stylesheet" type="text/css" />

<#--高德地图-->
    <script type="text/javascript" src='http://webapi.amap.com/maps?v=1.4.0&key=92ee7c0f5b7a8ae967170129b3bb13f3'></script>
    <!-- UI组件库 1.0 -->
    <script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>

    <script src="${ctx}/laydate/laydate.js" type="text/javascript"></script>
    <script src="${ctx}/plugins/kindeditor-4.1.7/kindeditor.js" type="text/javascript"></script>

<!--多文件上传-->
    <#--<script src="${ctx}/plugins/muchUploadImg/upload.js" type="text/javascript"></script>-->
    <#--<script src="${ctx}/plugins/muchUploadimg/upload.min.js" type="text/javascript"></script>-->
    <link href="${ctx}/plugins/muchUploadImg/upload.css" rel="stylesheet" type="text/css"/>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts-stat/dist/ecStat.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/dataTool.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/map/js/china.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/map/js/world.js"></script>
    <!--<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=xfhhaTThl11qYVrqLZii6w8qE5ggnhrY&__ec_v__=20190126"></script>-->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js"></script>
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>-->
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></script>-->
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>-->
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>-->
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>-->
    <#--<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>-->
    <#--<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script>-->
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/simplex.js"></script>
    <!--放大-->

<!-- 规格 -->
    <script src="${ctx}/plugins/guigebiao/liandong.js" type="text/javascript"></script>
    <#--<script src="${ctx}/plugins/guigebiao/liandong_edit.js" type="text/javascript"></script>-->
    <link href="${ctx}/plugins/guigebiao/liandong.css" rel="stylesheet" type="text/css"/>


    <script src="${ctx}/plugins/kindeditor-4.1.7/kindeditor.js" type="text/javascript"></script>
<#--    <script src="${ctx}/plugins/kindeditor-4.1.7/kindeditor-all.js" type="text/javascript"></script>-->


    <#-- 微信富文本-->


<#--<link href="${ctx}/weixin/css/default.css" rel="stylesheet" type="text/css" />-->


    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->



    <script src="${ctx}/weixin/js/colorpicker-min.js" type="text/javascript"></script>

    <script src="${ctx}/weixin/ueditor/third-party/zeroclipboard/ZeroClipboard.min.js" type="text/javascript"></script>

    <script src="${ctx}/weixin/js/breakingnews.js"></script>



</head>

<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<div class="page-wrapper">
    <div class="page-header navbar navbar-fixed-top">
    <#include "component/header.ftl">
    </div>
    <div class="clearfix"></div>
    <div class="page-container">
        <div class="page-sidebar-wrapper" id="index_navicate">
        <#include "component/navicate.ftl">
        </div>
        <div class="page-content-wrapper">
            <div class="page-content">
                <div class="page-content-body">

                </div>
            </div>
        </div>
    </div>
</div>
<!-- BEGIN CORE PLUGINS -->
<script src="${ctx}/plugins/select2/js/select2.full.min.js?v=3.0.1" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/plugins/bootstrap/js/bootstrap.min.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/jquery-slimscroll/jquery.slimscroll.min.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/js.cookie.min.js?v=3.0.1" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/plugins/jquery.blockui.min.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/counterup/jquery.waypoints.min.js?v=3.0.1" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/plugins/counterup/jquery.counterup.min.js?v=3.0.1" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/plugins/app.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js?v=3.0.1" type="text/javascript" ></script>
<script src="${ctx}/plugins/bootstrap-datepicker/bootstrap-datepicker.zh-CN.js?v=3.0.1" type="text/javascript" ></script>
<script src="${ctx}/plugins/jstree/jstree.min.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/jstree/jstree.checkbox.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/plugins/jqPaginator.min.js?v=3.0.1" type="text/javascript" charset="utf-8"></script>

<script src="${ctx}/js/extends/zTree/jquery.ztree.all-3.5.js?v=3.0.1"></script>
<script src="${ctx}/plugins/treetable/js/jquery.treetable.js?v=3.0.1" type="text/javascript"></script>

<script src="${ctx}/plugins/ajaxfileupload.js?v=3.0.1" type="text/javascript" ></script>
<!-- js框架start  wanghuifeng-->
<script src="${ctx}/js/framework/layout.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/js/framework/base.min.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/js/framework/core.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/js/framework/config.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/js/framework/duang.js?v=3.0.1" type="text/javascript"></script>
<script src="${ctx}/js/extends/toastr/toastr.min.js?v=3.0.1"></script>
<script src="${ctx}/js/extends/dialog/dialog-min.js?v=3.0.1"></script>
<script type="text/javascript" src="${ctx}/plugins/jqPaginator.min.js?v=3.0.1"></script>
<script type="text/javascript" src="${ctx}/js/extends/Highcharts-3.0.1/js/highcharts.js?v=3.0.1"></script>
<script type="text/javascript" src="${ctx}/js/extends/Highcharts-3.0.1/js/modules/exporting.js?v=3.0.1"></script>
<script type="text/javascript" src="${ctx}/js/extends/Highcharts-3.0.1/js/modules/data.js?v=3.0.1"></script>
<script type="text/javascript" src="${ctx}/js/extends/effect/TweenMax.min.js?v=3.0.1"></script>
<!-- 导入bootstrap-table zhangya -->
<script src="${ctx}/plugins/bootstrap-table/js/bootstrap-table.min.js?v=3.0.1" type="text/javascript" ></script>
<script src="${ctx}/plugins/bootstrap-table/js/bootstrap-table-zh-CN.min.js?v=3.0.1" type="text/javascript" ></script>
<!-- js框架end  wanghuifeng-->
<script>
    jQuery(document).ready(function() {
        Layout.init(); // init metronic core componets
        project.path='${ctx}';
        Layout.loadAjaxContent(project.path+"/index");
    });
</script>
<script type="text/javascript">

    //    function isIE() { //ie?
    //        if (!!window.ActiveXObject || "ActiveXObject" in window)
    //            return true;
    //        else
    //            return false;
    //    }
    //
    //    //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
    //    function forbidBackSpace(e) {
    //        var ev = e || window.event; //获取event对象
    //        var obj = ev.target || ev.srcElement; //获取事件源
    //        var t = obj.type || obj.getAttribute('type'); //获取事件源类型
    //        //获取作为判断条件的事件类型
    //        var vReadOnly = obj.readOnly;
    //        var vDisabled = obj.disabled;
    //        //处理undefined值情况
    //        vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    //        vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //        //并且readOnly属性为true或disabled属性为true的，则退格键失效
    //        var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    //        var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
    //        //判断
    //        if (flag2 || flag1) {
    //           return false;//这里如果写 return false 无法实现效果
    //        }
    //        if(isIE()){
    //            alert("IE");
    //            //判断
    //            if (flag2 || flag1) {
    //                ev.returnValue = false;
    //            }
    //        }else{
    //            //判断
    //            if (flag2 || flag1) {
    //                ev.returnValue = false;
    //            }
    //        }
    //    }
    //    //禁止后退键 作用于Firefox、Opera
    //    document.onkeypress = forbidBackSpace;
    //    //禁止后退键  作用于IE、Chrome
    //    document.onkeydown = forbidBackSpace;
</script>
</body>

</html>