<#assign ctx=request.contextPath>
<link rel="stylesheet" href="${ctx}/css/yong.css">
		<style>
            /*body{background: #f8f8f8;}*/
            .hc-container .panel,.hc-container .panel-default>.panel-heading{border: none;position: relative;}
            .hc-container .panel-default>.panel-heading{padding-left: 30px;line-height: 30px;font-size: 18px;background: none;}
            .hc-container .panel-default>.panel-heading:before{
                content:'';position: absolute;left:15px;display: block;height:50%;top:25%;width: 6px;background: red;
            }

            .hc-container .panel-default.headdefault>.panel-heading:before{background: #37BAC8;}
            .hc-container .panel-default.headdefault .panel-body{color:#37BAC8 ;}
            .hc-container .panel-default.headblue>.panel-heading{
                background: -moz-linear-gradient(left, #E7F1FC 0%, #FFF 100%);
                background: -webkit-gradient(linear, left, right, color-stop(0%,#E7F1FC), color-stop(100%,#FFF));
                background: -webkit-linear-gradient(left, #E7F1FC,#FFF 100%);
                background: -o-linear-gradient(left, #E7F1FC,#FFF 100%);
                background: -ms-linear-gradient(left,#E7F1FC,#FFF 100%);
                background: linear-gradient(to right, #E7F1FC,#FFF);
            }
            .hc-container .panel-default.headblue>.panel-heading:before{background: #649DFF;}
            .hc-container .panel-default.headblue .panel-body{color:#649DFF ;}
            .hc-container .panel-default.headred>.panel-heading{
                background: -moz-linear-gradient(left, #FCEBEB 0%, #FFF 100%);
                background: -webkit-gradient(linear, left, right, color-stop(0%,#FCEBEB), color-stop(100%,#FFF));
                background: -webkit-linear-gradient(left, #FCEBEB,#FFF 100%);
                background: -o-linear-gradient(left, #FCEBEB,#FFF 100%);
                background: -ms-linear-gradient(left,#FCEBEB,#FFF 100%);
                background: linear-gradient(to right, #FCEBEB,#FFF);
            }
            .hc-container .panel-default.headred>.panel-heading:before{background: #F87979;}
            .hc-container .panel-default.headred .panel-body{color:#F87979 ;}
            .hc-container .panel-default.headyellow>.panel-heading{
                background: -moz-linear-gradient(left, #FAF3E6 0%, #FFF 100%);
                background: -webkit-gradient(linear, left, right, color-stop(0%,#FAF3E6), color-stop(100%,#FFF));
                background: -webkit-linear-gradient(left, #FAF3E6,#FFF 100%);
                background: -o-linear-gradient(left, #FAF3E6,#FFF 100%);
                background: -ms-linear-gradient(left,#FAF3E6,#FFF 100%);
                background: linear-gradient(to right, #FAF3E6,#FFF);
            }
            .hc-container .panel-default.headyellow>.panel-heading:before{background: #EFA837;}
            .hc-container .panel-default.headyellow .panel-body{color:#EFA837 ;}
            .hc-container .panel-default.headygreen>.panel-heading{
                background: -moz-linear-gradient(left, #DCF4ED 0%, #FFF 100%);
                background: -webkit-gradient(linear, left, right, color-stop(0%,#DCF4ED), color-stop(100%,#FFF));
                background: -webkit-linear-gradient(left, #DCF4ED,#FFF 100%);
                background: -o-linear-gradient(left, #DCF4ED,#FFF 100%);
                background: -ms-linear-gradient(left,#DCF4ED,#FFF 100%);
                background: linear-gradient(to right, #DCF4ED,#FFF);
            }
            .hc-container .panel-default.headygreen>.panel-heading:before{background: #28B789;}
            .hc-container .panel-default.headygreen .panel-body{color:#28B789 ;}

            .hc-container .panel-body{font-size: 50px;line-height: 150px;text-align: center;letter-spacing: 2px;}
            .hc-container .headdefault .panel-body{padding-top:0;line-height: 90px;letter-spacing: 2px;}
        </style>
	<div class="container-fluid hc-container">
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default headdefault">
                    <div class="panel-heading">历史活动数量</div>
                    <div class="panel-body">
                    <#if activity??>
                    ${activity}
                    </#if>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default headblue">
                    <div class="panel-heading">新闻发布数量</div>
                    <div class="panel-body">
                    <#if news??>
                    ${news}
                    </#if>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default headred">
                    <div class="panel-heading">当日访问数量</div>
                    <div class="panel-body">
                    <#if jin??>
                    ${jin}
                    </#if>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default headyellow">
                    <div class="panel-heading">累计访问数量</div>
                    <div class="panel-body">
                    <#if zong??>
                    ${zong}
                    </#if>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default headygreen">
                    <div class="panel-heading">会员数量</div>
                    <div class="panel-body">
                    <#if yugong??>
                    ${yugong}
                    </#if>
                    </div>
                </div>
            </div>
        </div>
    </div>
<#--<div class="container-fluid">-->
    <#--<div class="row clearfix">-->
        <#--<div class="col-lg-12 col-md-12 col-xs-12 yong-right-pad">-->
            <#--<div class="hu-yong">-->
                <#--<ul class="row clearfix">-->
                    <#--<li class="col-md-3 yong-pad">-->
                        <#--<div class="yong-zong bg-color1" style="min-height: 152px;position: relative">-->
                            <#--<div class="yong-hu-num clearfix">-->
                                <#--<div class="yong-biao ">-->
                                    <#--<img src="${ctx}/images/index/yong-hu1.png"/>-->
                                    <#--&lt;#&ndash;<input type="button" value="发送短信" onclick="sendEmail()">&ndash;&gt;-->
                                    <#--<h1>新闻发布数量</h1>-->
                                <#--</div>-->
                            <#--</div>-->
                            <#--<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>-->
                            <#--<#if news??>-->
                                <#--${news}-->
                            <#--</#if>-->

                            <#--</i>条-->
                            <#--</div>-->

                        <#--</div>-->
                    <#--</li>-->
                    <#--<li class="col-md-3 yong-pad">-->
                        <#--<div class="yong-zong bg-color2" style="min-height: 152px;position: relative">-->
                            <#--<div class="yong-hu-num clearfix ">-->
                                <#--<div class="yong-biao ">-->
                                    <#--<img src="${ctx}/images/index/yong-hu2.png"/>-->
                                    <#--<h1>历史活动数量</h1>-->
                                <#--</div>-->

                            <#--</div>-->
                            <#--<div class="yong-shu shu-mar" style="position: absolute;bottom: 5px; left:0px;width: 100%;">-->
                                <#--<i>-->
                            <#--<#if activity??>-->
                                <#--${activity}-->
                            <#--</#if>-->
                                <#--</i>条-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</li>-->
                    <#--&lt;#&ndash;<li class="col-md-3  yong-pad">&ndash;&gt;-->
                        <#--&lt;#&ndash;<div class="yong-zong bg-color3" style="min-height: 152px;position: relative">&ndash;&gt;-->
                            <#--&lt;#&ndash;<div class="yong-hu-num clearfix">&ndash;&gt;-->
                                <#--&lt;#&ndash;<div class="yong-biao ">&ndash;&gt;-->
                                    <#--&lt;#&ndash;<img src="${ctx}/images/index/yong-hu3.png"/>&ndash;&gt;-->
                                    <#--&lt;#&ndash;<h1>调查问卷</h1>&ndash;&gt;-->
                                <#--&lt;#&ndash;</div>&ndash;&gt;-->

                            <#--&lt;#&ndash;</div>&ndash;&gt;-->
                            <#--&lt;#&ndash;<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>&ndash;&gt;-->

                            <#--&lt;#&ndash;<#if questionNum??>&ndash;&gt;-->
                                <#--&lt;#&ndash;${questionNum}&ndash;&gt;-->
                            <#--&lt;#&ndash;</#if>&ndash;&gt;-->
                            <#--&lt;#&ndash;</i>条&ndash;&gt;-->
                            <#--&lt;#&ndash;</div>&ndash;&gt;-->
                        <#--&lt;#&ndash;</div>&ndash;&gt;-->
                    <#--&lt;#&ndash;</li>&ndash;&gt;-->
                    <#--<li class="col-md-3  yong-pad">-->
                        <#--<div class="yong-zong bg-color3" style="min-height: 152px;position: relative">-->
                            <#--<div class="yong-hu-num clearfix">-->
                                <#--<div class="yong-biao ">-->
                                    <#--<img src="${ctx}/images/index/yong-hu3.png"/>-->
                                    <#--<h1>当日访问数量</h1>-->
                                <#--</div>-->

                            <#--</div>-->
                            <#--<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>-->

                            <#--<#if jin??>-->
                                <#--${jin}-->
                            <#--</#if>-->
                            <#--</i>条-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</li>-->
                    <#--<li class="col-md-3  yong-pad">-->
                        <#--<div class="yong-zong bg-color3" style="min-height: 152px;position: relative">-->
                            <#--<div class="yong-hu-num clearfix">-->
                                <#--<div class="yong-biao ">-->
                                    <#--<img src="${ctx}/images/index/yong-hu3.png"/>-->
                                    <#--<h1>累积访问数量</h1>-->
                                <#--</div>-->

                            <#--</div>-->
                            <#--<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>-->

                            <#--<#if zong??>-->
                                <#--${zong}-->
                            <#--</#if>-->
                            <#--</i>条-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</li>-->
                    <#--&lt;#&ndash;<li class="col-md-3  yong-pad">&ndash;&gt;-->
                        <#--&lt;#&ndash;<div class="yong-zong bg-color3" style="min-height: 152px;position: relative">&ndash;&gt;-->
                            <#--&lt;#&ndash;<div class="yong-hu-num clearfix">&ndash;&gt;-->
                                <#--&lt;#&ndash;<div class="yong-biao ">&ndash;&gt;-->
                                    <#--&lt;#&ndash;<img src="${ctx}/images/index/yong-hu3.png"/>&ndash;&gt;-->
                                    <#--&lt;#&ndash;<h1>调查问卷</h1>&ndash;&gt;-->
                                <#--&lt;#&ndash;</div>&ndash;&gt;-->

                            <#--&lt;#&ndash;</div>&ndash;&gt;-->
                            <#--&lt;#&ndash;<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>&ndash;&gt;-->

                            <#--&lt;#&ndash;<#if questionNum??>&ndash;&gt;-->
                                <#--&lt;#&ndash;${questionNum}&ndash;&gt;-->
                            <#--&lt;#&ndash;</#if>&ndash;&gt;-->
                            <#--&lt;#&ndash;</i>条&ndash;&gt;-->
                            <#--&lt;#&ndash;</div>&ndash;&gt;-->
                        <#--&lt;#&ndash;</div>&ndash;&gt;-->
                    <#--&lt;#&ndash;</li>&ndash;&gt;-->
                    <#--<li class="col-md-3  yong-pad" style="padding-left: 10px;">-->
                        <#--<div class="yong-zong " style="min-height: 152px;background: #4b4b4b;position: relative;margin-top: 10px;">-->
                            <#--<div class="yong-hu-num clearfix">-->
                                <#--<div class="yong-biao ">-->
                                    <#--<img src="${ctx}/images/index/yong-hu3.png"/>-->
                                    <#--<h1>会员数量</h1>-->
                                <#--</div>-->

                            <#--</div>-->
                            <#--<div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>-->

                             <#--<#if yugong??>-->
                                 <#--${yugong}-->
                             <#--</#if>-->
                            <#--</i>名-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</li>-->
                <#--</ul>-->
            <#--</div>-->



            <#--&lt;#&ndash;<div class="ying-shou">&ndash;&gt;-->

                <#--&lt;#&ndash;<div class="shou-title clearfix">&ndash;&gt;-->
                    <#--&lt;#&ndash;<h3></h3>&ndash;&gt;-->

                <#--&lt;#&ndash;</div>&ndash;&gt;-->
                <#--&lt;#&ndash;<div class="yong-canvas">&ndash;&gt;-->
                    <#--&lt;#&ndash;<span>区域新闻统计</span>&ndash;&gt;-->
                <#--&lt;#&ndash;</div>&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->
            <#--&lt;#&ndash;&lt;#&ndash;<div style="padding-left:7px;"><span>地区发布新闻比例</span></div>&ndash;&gt;&ndash;&gt;-->
            <#--&lt;#&ndash;<div id="containerBaby" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->

            <#--&lt;#&ndash;<div id="containerBaby1" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->





                <#--&lt;#&ndash;<div class="shou-title clearfix">&ndash;&gt;-->
                    <#--&lt;#&ndash;<h3></h3>&ndash;&gt;-->

                <#--&lt;#&ndash;</div>&ndash;&gt;-->
                <#--&lt;#&ndash;<div class="yong-canvas">&ndash;&gt;-->
                    <#--&lt;#&ndash;<span>区域活动统计</span>&ndash;&gt;-->
                <#--&lt;#&ndash;</div>&ndash;&gt;-->


            <#--&lt;#&ndash;<div id="containerBabyy" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->

            <#--&lt;#&ndash;<div id="containerBabyy1" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->





                <#--&lt;#&ndash;<div class="shou-title clearfix">&ndash;&gt;-->
                    <#--&lt;#&ndash;<h3></h3>&ndash;&gt;-->

                <#--&lt;#&ndash;</div>&ndash;&gt;-->
                <#--&lt;#&ndash;<div class="yong-canvas">&ndash;&gt;-->
                    <#--&lt;#&ndash;<span>区域调查问卷统计</span>&ndash;&gt;-->
                <#--&lt;#&ndash;</div>&ndash;&gt;-->

            <#--&lt;#&ndash;<div id="containerBabyyy" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->

            <#--&lt;#&ndash;<div id="containerBabyyy1" style="width:50%;height: 350px;float:left;">&ndash;&gt;-->
            <#--&lt;#&ndash;</div>&ndash;&gt;-->


        <#--</div>-->
    <#--</div>-->

<#--</div>-->




<script type="text/javascript">


    var newList ;
    var questionList ;
    var huodongList ;

   $.ajax({
       url:'babyTongji',
       async:false,
       success:function (_data) {
           newList = _data.new;
           questionList= _data.question;

           huodongList = _data.huodong
       }
   })



    //隐患级别分布
    var domTwo = document.getElementById("containerBaby");
    var myChartTwo = echarts.init(domTwo);

   var  optionBaby;
    var data = genData();
    optionBaby = {
        title : {
            text: '区域新闻比例',
            subtext: '真实数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,
            //
            // selected: data.selected
        },
        series : [
            {
                name: '名称',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    function genData() {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var i = 0; i < newList.length; i++) {

            legendData.push(newList[i].name);
            seriesData.push({
                name: newList[i].name,
                value: newList[i].num
            });
            selected[newList[i].name] = i < newList.length;
        }

        return {
            legendData: legendData,
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };
        //
        // function makeWord(max, min) {
        //     var nameLen = Math.ceil(Math.random() * max + min);
        //     var name = [];
        //     for (var i = 0; i < nameLen; i++) {
        //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        //     }
        //     return name.join('');
        // }
    }
    myChartTwo.setOption(optionBaby, true);






    var domTBaby = document.getElementById("containerBaby1");
    var myChartTw1o = echarts.init(domTBaby);


    var xName = [];
    var content = [];

    for( var i = 0 ; i <newList.length ; i++){
        xName.push(newList[i].name);
        content.push(newList[i].num)
    }
    //option
    var  optiona ={};
    optiona = {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : xName
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                data:content,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }
        ]
    };
    myChartTw1o.setOption(optiona, true);







//------------========================

    var domtt = document.getElementById("containerBabyy");
    var mct = echarts.init(domtt);

    var  optionBabby;
    var data = genDataa();
    optionBabby = {
        title : {
            text: '区域调查问卷比例',
            subtext: '真实数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,
            //
            // selected: data.selected
        },
        series : [
            {
                name: '名称',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    function genDataa() {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var i = 0; i < questionList.length; i++) {

            legendData.push(questionList[i].title);
            seriesData.push({
                name: questionList[i].title,
                value: questionList[i].num
            });
            selected[questionList[i].title] = i < questionList.length;
        }

        return {
            legendData: legendData,
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };
        //
        // function makeWord(max, min) {
        //     var nameLen = Math.ceil(Math.random() * max + min);
        //     var name = [];
        //     for (var i = 0; i < nameLen; i++) {
        //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        //     }
        //     return name.join('');
        // }
    }
    mct.setOption(optionBabby, true);











    var d = document.getElementById("containerBabyy1");
    var cd = echarts.init(d);


    var xName = [];
    var content = [];

    for( var i = 0 ; i <questionList.length ; i++){
        xName.push(questionList[i].title);
        content.push(questionList[i].num)
    }

    //option
    var  optiona ={};
    optiona = {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : xName
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                data:content,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }
        ]
    };
    cd.setOption(optiona, true);



//=============================================









    var domt = document.getElementById("containerBabyyy");
    var mctt = echarts.init(domt);



    var  optionBabbyy;
    var data = genDataaa();
    optionBabbyy = {
        title : {
            text: '区域活动比例',
            subtext: '真实数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,
            //
            // selected: data.selected
        },
        series : [
            {
                name: '名称',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

function sendEmail() {
    $.ajax({
        url:'sendDuanXin',
        async:false,
        success:function (_data) {
     alert(_data.msg)
        }
    })
}
    function genDataaa() {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var i = 0; i < huodongList.length; i++) {

            legendData.push(huodongList[i].title);
            seriesData.push({
                name: huodongList[i].title,
                value: huodongList[i].num
            });
            selected[huodongList[i].title] = i < huodongList.length;
        }

        return {
            legendData: legendData,
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };
        //
        // function makeWord(max, min) {
        //     var nameLen = Math.ceil(Math.random() * max + min);
        //     var name = [];
        //     for (var i = 0; i < nameLen; i++) {
        //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        //     }
        //     return name.join('');
        // }
    }
    mctt.setOption(optionBabbyy, true);








    var d = document.getElementById("containerBabyyy1");
    var cdd = echarts.init(d);


    var xName = [];
    var content = [];

    for( var i = 0 ; i <huodongList.length ; i++){
        xName.push(huodongList[i].title);
        content.push(huodongList[i].num)
    }

    //option
    var  optiona ={};
    optiona = {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : xName
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                data:content,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#86echartsD560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }
        ]
    };
    cdd.setOption(optiona, true);
    $.ajax({
        url:'zhuanhui/newLook',
        method:'post',
        success:function (_data) {
           if(_data.success){
               alert(_data.message)
           }
        }
    })



</script>