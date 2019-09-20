<#assign ctx=request.contextPath>
<link rel="stylesheet" href="${ctx}/css/yong.css">
<style>
    li {
        margin-right: 0px;
    }
</style>
<div class="container-fluid">
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-xs-12 yong-right-pad">
            <div class="hu-yong">
                <ul class="row clearfix">
                    <li class="col-md-3 yong-pad">
                        <div class="yong-zong bg-color1" style="min-height: 152px;position: relative">
                            <div class="yong-hu-num clearfix">
                                <div class="yong-biao ">
                                    <img src="${ctx}/images/index/yong-hu1.png"/>
                                    <input type="button" value="发送短信" onclick="sendEmail()">
                                    <h1>新闻量</h1>
                                </div>
                            </div>
                            <div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>
                            <#if news??>
                                ${news}
                            </#if>

                            </i>条
                            </div>

                        </div>
                    </li>
                    <li class="col-md-3 yong-pad">
                        <div class="yong-zong bg-color2" style="min-height: 152px;position: relative">
                            <div class="yong-hu-num clearfix ">
                                <div class="yong-biao ">
                                    <img src="${ctx}/images/index/yong-hu2.png"/>
                                    <h1>活动量</h1>
                                </div>

                            </div>
                            <div class="yong-shu shu-mar" style="position: absolute;bottom: 5px; left:0px;width: 100%;">
                                <i>
                            <#if activity??>
                                ${activity}
                            </#if>
                                </i>条
                            </div>
                        </div>
                    </li>
                    <li class="col-md-3  yong-pad">
                        <div class="yong-zong bg-color3" style="min-height: 152px;position: relative">
                            <div class="yong-hu-num clearfix">
                                <div class="yong-biao ">
                                    <img src="${ctx}/images/index/yong-hu3.png"/>
                                    <h1>调查问卷</h1>
                                </div>

                            </div>
                            <div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>

                            <#if questionNum??>
                                ${questionNum}
                            </#if>
                            </i>条
                            </div>
                        </div>
                    </li>
                    <li class="col-md-3  yong-pad">
                        <div class="yong-zong " style="min-height: 152px;background: #4b4b4b;position: relative">
                            <div class="yong-hu-num clearfix">
                                <div class="yong-biao ">
                                    <img src="${ctx}/images/index/yong-hu3.png"/>
                                    <h1>员工</h1>
                                </div>

                            </div>
                            <div class="yong-shu" style="position: absolute;bottom: 5px; left:0px;width: 100%;"><i>

                             <#if yugong??>
                                 ${yugong}
                             </#if>
                            </i>名
                            </div>
                        </div>
                    </li>
                </ul>
            </div>



            <div class="ying-shou">

                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <div class="yong-canvas">
                    <span>区域新闻统计</span>
                </div>
            </div>
            <#--<div style="padding-left:7px;"><span>地区发布新闻比例</span></div>-->
            <div id="containerBaby" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="containerBaby1" style="width:50%;height: 350px;float:left;">
            </div>





                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <div class="yong-canvas">
                    <span>区域活动统计</span>
                </div>


            <div id="containerBabyy" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="containerBabyy1" style="width:50%;height: 350px;float:left;">
            </div>





                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <div class="yong-canvas">
                    <span>区域调查问卷统计</span>
                </div>

            <div id="containerBabyyy" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="containerBabyyy1" style="width:50%;height: 350px;float:left;">
            </div>


        </div>
    </div>

</div>




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
    cdd.setOption(optiona, true);




</script>