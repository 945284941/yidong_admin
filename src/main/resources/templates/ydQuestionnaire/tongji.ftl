<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">调查问卷统计      </h4>
</div>
<div class="modal-body">

    <div id="baby" style="width:500px;height: 200px;">
    </div>


</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <#--<button type="button"  class="btn green circle"><i-->
            <#--class="fa fa-save"></i> 保存-->
    <#--</button>-->
</div>
<script type="text/javascript">

    var dom = document.getElementById("baby");
    var myChart = echarts.init(dom);

    var city;

    $.ajax({
        url:'ydQuestionnaireMessage/findTongji',
        data:{
            id:'${id}'
        },
        async:false,
        dataType:'json',
        success:function (_data) {
            city = _data
        }
    })
    var dataTwo = genDataTwo();
    var optionEng ;
    optionEng = {
        title : {
            text: '选项比例',
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
            data: dataTwo.legendData,

            // selected: dataTwo.selected
        },
        series : [
            {
                name: '名称',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: dataTwo.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    function genDataTwo() {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        for (var i = 0; i < city.length; i++) {

            legendData.push(city[i].name);
            seriesData.push({
                name: city[i].name,
                value: city[i].disabled
            });
            selected[city[i].catName] = i < city.length;
        }
        return {
            legendData: legendData,
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };

    }

    if (optionEng && typeof optionEng === "object") {
        myChart.setOption(optionEng, true);
    }
</script>