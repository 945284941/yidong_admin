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

            </div>



            <div class="ying-shou">

                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <#--<div class="yong-canvas">-->
                    <#--<span>区域新闻统计</span>-->
                <#--</div>-->
            </div>
            <#--<div style="padding-left:7px;"><span>地区发布新闻比例</span></div>-->
            <div id="3ac0251e53ef40a998542e00b3e4c1ba" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="3b2f401faac14652b649a56071c767fa" style="width:50%;height: 350px;float:left;">
            </div>





                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <#--<div class="yong-canvas">-->
                    <#--<span>区域活动统计</span>-->
                <#--</div>-->


            <div id="401b90f0a3e443c6a2af37ddffddead5" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="47aae69606c64ee5b9b963795d525a54" style="width:50%;height: 350px;float:left;">
            </div>





                <div class="shou-title clearfix">
                    <h3></h3>

                </div>
                <#--<div class="yong-canvas">-->
                    <#--<span>区域调查问卷统计</span>-->
                <#--</div>-->

            <div id="50ae0e58cbed4bd09da7861eddb52701" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="9d1e9d4d75cf43d6a4fa172b071cd07a" style="width:50%;height: 350px;float:left;">
            </div>






            <div class="shou-title clearfix">
                <h3></h3>

            </div>
        <#--<div class="yong-canvas">-->
        <#--<span>区域调查问卷统计</span>-->
        <#--</div>-->

            <div id="a618ad7c42aa4821a9e74093fca58723" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="a81fd99e52a34eb597dbcf469e44aed5" style="width:50%;height: 350px;float:left;">
            </div>



            <div class="shou-title clearfix">
                <h3></h3>

            </div>
        <#--<div class="yong-canvas">-->
        <#--<span>区域调查问卷统计</span>-->
        <#--</div>-->

            <div id="b26939a8ae614ddda7509123d02d4040" style="width:50%;height: 350px;float:left;">
            </div>

            <div id="b26939a8ae614ddda7509123d02d4040" style="width:50%;height: 350px;float:left;">
            </div>
            <div class="shou-title clearfix">
                <h3></h3>

            </div>
        <#--<div class="yong-canvas">-->
        <#--<span>区域调查问卷统计</span>-->
        <#--</div>-->

            <div id="cbdcf777241848c38a17ccf552c94ce0" style="width:50%;height: 350px;float:left;">
            </div>





        </div>
    </div>

</div>




<script type="text/javascript">


 var ids = ['3ac0251e53ef40a998542e00b3e4c1ba',
    '3b2f401faac14652b649a56071c767fa','401b90f0a3e443c6a2af37ddffddead5',
 "47aae69606c64ee5b9b963795d525a54","50ae0e58cbed4bd09da7861eddb52701",
 "9d1e9d4d75cf43d6a4fa172b071cd07a","a618ad7c42aa4821a9e74093fca58723",
 "a81fd99e52a34eb597dbcf469e44aed5","b26939a8ae614ddda7509123d02d4040",
 "b7159ff57bae4b9dadacacc62367f596","cbdcf777241848c38a17ccf552c94ce0"];
 for (var j = 0; j < ids.length ; j++){


     $.ajax({
         url:'ydNews/tongjiNewCat',
         async:false,
         data:{
           catId:ids[j]
         },
         success:function (_data) {





                 var newList = _data.value;


                 //隐患级别分布

                 var domTwo = document.getElementById(ids[j]);
                 var myChartTwo = echarts.init(domTwo);

                 var optionBaby;
                 var data = genData();
                 optionBaby = {
                     title: {
                         text: _data.name,
                         subtext: '真实数据',
                         x: 'center'
                     },
                     tooltip: {
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
                     series: [
                         {
                             name: '名称',
                             type: 'pie',
                             radius: '55%',
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

                 }

                 myChartTwo.setOption(optionBaby, true);


         }
     })
 }



//
//     //隐患级别分布
//     var domTwo = document.getElementById("gangweijiangong");
//     var myChartTwo = echarts.init(domTwo);
//
//    var  optionBaby;
//     var data = genData();
//     optionBaby = {
//         title : {
//             text: '区域新闻比例',
//             subtext: '真实数据',
//             x:'center'
//         },
//         tooltip : {
//             trigger: 'item',
//             formatter: "{a} <br/>{b} : {c} ({d}%)"
//         },
//         legend: {
//             type: 'scroll',
//             orient: 'vertical',
//             right: 10,
//             top: 20,
//             bottom: 20,
//             data: data.legendData,
//             //
//             // selected: data.selected
//         },
//         series : [
//             {
//                 name: '名称',
//                 type: 'pie',
//                 radius : '55%',
//                 center: ['40%', '50%'],
//                 data: data.seriesData,
//                 itemStyle: {
//                     emphasis: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }
//         ]
//     };
//
//
//     function genData() {
//         var nameList = [
//             '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
//         ];
//         var legendData = [];
//         var seriesData = [];
//         var selected = {};
//         for (var i = 0; i < newList.length; i++) {
//
//             legendData.push(newList[i].name);
//             seriesData.push({
//                 name: newList[i].name,
//                 value: newList[i].num
//             });
//             selected[newList[i].name] = i < newList.length;
//         }
//
//         return {
//             legendData: legendData,
//             legendData: legendData,
//             seriesData: seriesData,
//             selected: selected
//         };
//
//     }
//     myChartTwo.setOption(optionBaby, true);
//
//
//
//
//
//
//     var domTBaby = document.getElementById("xingfu");
//     var myChartTw1o = echarts.init(domTBaby);
//
//
//     var xName = [];
//     var content = [];
//
//     for( var i = 0 ; i <newList.length ; i++){
//         xName.push(newList[i].name);
//         content.push(newList[i].num)
//     }
//     //option
//     var  optiona ={};
//     optiona = {
//         tooltip : {
//             trigger: 'axis'
//         },
//         toolbox: {
//             show : true,
//             feature : {
//                 mark : {show: true},
//                 dataView : {show: true, readOnly: false},
//                 magicType : {show: true, type: ['line', 'bar']},
//                 restore : {show: true},
//                 saveAsImage : {show: true}
//             }
//         },
//         calculable : true,
//         xAxis : [
//             {
//                 type : 'category',
//                 data : xName
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value'
//             }
//         ],
//         series : [
//             {
//                 type:'bar',
//                 data:content,
//                 itemStyle: {
//                     normal: {
//                         color: function(params) {
//                             // build a color map as your need.
//                             var colorList = [
//                                 '#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
//                                 '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//                                 '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
//                             ];
//                             return colorList[params.dataIndex]
//                         }
//                     }
//                 }
//             }
//         ]
//     };
//     myChartTw1o.setOption(optiona, true);
//
//
//
//
//
//
//
// //------------========================
//
//     var domtt = document.getElementById("nuanxingongcheng");
//     var mct = echarts.init(domtt);
//
//     var  optionBabby;
//     var data = genDataa();
//     optionBabby = {
//         title : {
//             text: '区域调查问卷比例',
//             subtext: '真实数据',
//             x:'center'
//         },
//         tooltip : {
//             trigger: 'item',
//             formatter: "{a} <br/>{b} : {c} ({d}%)"
//         },
//         legend: {
//             type: 'scroll',
//             orient: 'vertical',
//             right: 10,
//             top: 20,
//             bottom: 20,
//             data: data.legendData,
//             //
//             // selected: data.selected
//         },
//         series : [
//             {
//                 name: '名称',
//                 type: 'pie',
//                 radius : '55%',
//                 center: ['40%', '50%'],
//                 data: data.seriesData,
//                 itemStyle: {
//                     emphasis: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }
//         ]
//     };
//
//
//     function genDataa() {
//         var nameList = [
//             '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
//         ];
//         var legendData = [];
//         var seriesData = [];
//         var selected = {};
//         for (var i = 0; i < questionList.length; i++) {
//
//             legendData.push(questionList[i].title);
//             seriesData.push({
//                 name: questionList[i].title,
//                 value: questionList[i].num
//             });
//             selected[questionList[i].title] = i < questionList.length;
//         }
//
//         return {
//             legendData: legendData,
//             legendData: legendData,
//             seriesData: seriesData,
//             selected: selected
//         };
//         //
//         // function makeWord(max, min) {
//         //     var nameLen = Math.ceil(Math.random() * max + min);
//         //     var name = [];
//         //     for (var i = 0; i < nameLen; i++) {
//         //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
//         //     }
//         //     return name.join('');
//         // }
//     }
//     mct.setOption(optionBabby, true);
//
//
//
//
//
//
//
//
//
//
//
//     var d = document.getElementById("jienengjianpai");
//     var cd = echarts.init(d);
//
//
//     var xName = [];
//     var content = [];
//
//     for( var i = 0 ; i <questionList.length ; i++){
//         xName.push(questionList[i].title);
//         content.push(questionList[i].num)
//     }
//
//     //option
//     var  optiona ={};
//     optiona = {
//         tooltip : {
//             trigger: 'axis'
//         },
//         toolbox: {
//             show : true,
//             feature : {
//                 mark : {show: true},
//                 dataView : {show: true, readOnly: false},
//                 magicType : {show: true, type: ['line', 'bar']},
//                 restore : {show: true},
//                 saveAsImage : {show: true}
//             }
//         },
//         calculable : true,
//         xAxis : [
//             {
//                 type : 'category',
//                 data : xName
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value'
//             }
//         ],
//         series : [
//             {
//                 type:'bar',
//                 data:content,
//                 itemStyle: {
//                     normal: {
//                         color: function(params) {
//                             // build a color map as your need.
//                             var colorList = [
//                                 '#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
//                                 '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//                                 '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
//                             ];
//                             return colorList[params.dataIndex]
//                         }
//                     }
//                 }
//             }
//         ]
//     };
//     cd.setOption(optiona, true);
//
//
//
// //=============================================
//
//
//
//
//
//
//
//
//
//     var domt = document.getElementById("xinlingyizhan");
//     var mctt = echarts.init(domt);
//
//
//
//     var  optionBabbyy;
//     var data = genDataaa();
//     optionBabbyy = {
//         title : {
//             text: '区域活动比例',
//             subtext: '真实数据',
//             x:'center'
//         },
//         tooltip : {
//             trigger: 'item',
//             formatter: "{a} <br/>{b} : {c} ({d}%)"
//         },
//         legend: {
//             type: 'scroll',
//             orient: 'vertical',
//             right: 10,
//             top: 20,
//             bottom: 20,
//             data: data.legendData,
//             //
//             // selected: data.selected
//         },
//         series : [
//             {
//                 name: '名称',
//                 type: 'pie',
//                 radius : '55%',
//                 center: ['40%', '50%'],
//                 data: data.seriesData,
//                 itemStyle: {
//                     emphasis: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }
//         ]
//     };
//
//
//     function genDataaa() {
//         var nameList = [
//             '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
//         ];
//         var legendData = [];
//         var seriesData = [];
//         var selected = {};
//         for (var i = 0; i < huodongList.length; i++) {
//
//             legendData.push(huodongList[i].title);
//             seriesData.push({
//                 name: huodongList[i].title,
//                 value: huodongList[i].num
//             });
//             selected[huodongList[i].title] = i < huodongList.length;
//         }
//
//         return {
//             legendData: legendData,
//             legendData: legendData,
//             seriesData: seriesData,
//             selected: selected
//         };
//         //
//         // function makeWord(max, min) {
//         //     var nameLen = Math.ceil(Math.random() * max + min);
//         //     var name = [];
//         //     for (var i = 0; i < nameLen; i++) {
//         //         name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
//         //     }
//         //     return name.join('');
//         // }
//     }
//     mctt.setOption(optionBabbyy, true);
//
//
//
//
//
//
//
//
//     var d = document.getElementById("chuantongwenhua");
//     var cdd = echarts.init(d);
//
//
//     var xName = [];
//     var content = [];
//
//     for( var i = 0 ; i <huodongList.length ; i++){
//         xName.push(huodongList[i].title);
//         content.push(huodongList[i].num)
//     }
//
//     //option
//     var  optiona ={};
//     optiona = {
//         tooltip : {
//             trigger: 'axis'
//         },
//         toolbox: {
//             show : true,
//             feature : {
//                 mark : {show: true},
//                 dataView : {show: true, readOnly: false},
//                 magicType : {show: true, type: ['line', 'bar']},
//                 restore : {show: true},
//                 saveAsImage : {show: true}
//             }
//         },
//         calculable : true,
//         xAxis : [
//             {
//                 type : 'category',
//                 data : xName
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value'
//             }
//         ],
//         series : [
//             {
//                 type:'bar',
//                 data:content,
//                 itemStyle: {
//                     normal: {
//                         color: function(params) {
//                             // build a color map as your need.
//                             var colorList = [
//                                 '#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67',
//                                 '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//                                 '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
//                             ];
//                             return colorList[params.dataIndex]
//                         }
//                     }
//                 }
//             }
//         ]
//     };
//     cdd.setOption(optiona, true);




</script>