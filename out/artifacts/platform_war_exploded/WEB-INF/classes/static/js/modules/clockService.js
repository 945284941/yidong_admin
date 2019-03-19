var clockService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'clockService',
        modalName: 'clock_manager_edit',
    },
    init: function () {
    },
    loadlist: function () {
        var param = $('#clock_manager_searchFrom').formToJson();
        $.get(project.path + '/clock/list',param,function(data){
            $('#clock_manager_list').html(data);
        })
    },loadAvgOnlinelist: function () {
        var param = $('#avgOnline_manager_searchFrom').formToJson();
        $.get(project.path + '/clock/avgOnlinelist',param,function(data){
            $('#avgOnline_manager_list').html(data);
        })
    },loadOffAvgOnlinelist: function () {
        var param = $('#offAvgOnline_manager_searchFrom').formToJson();
        $.get(project.path + '/clock/offavgOnlinelist',param,function(data){
            $('#offAvgOnline_manager_list').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#clock_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/clock/list',param,function(data){
            $('#clock_manager_list').html(data);
        })
    },
    reset:function(){
        document.getElementById('clock_manager_searchFrom').reset();
        $('#corp_manager_search_corpId').val('');
        $("#corp_manager_search_corpName").attr("value","");
        $('#deptdoc_manager_search_deptdocId').val('');
        $("#deptdoc_manager_search_deptdocName").attr("value","");
        $.get(project.path + '/clock/list',function(data){
            $('#clock_manager_list').html(data);
        })
    },loadTracklist: function () {
        var param = $('#trackRecor_manager_searchFrom').formToJson();
        $.get(project.path + '/clock/trackRecorlist',param,function(data){
            $('#trackRecor_manager_list').html(data);
        })
    },
    pageTrackList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#trackRecor_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/clock/trackRecorlist',param,function(data){
            $('#trackRecor_manager_list').html(data);
        })
    },reset:function(){
        document.getElementById('trackRecor_manager_searchFrom').reset();
        $.get(project.path + '/clock/trackRecorlist',function(data){
            $('#trackRecor_manager_list').html(data);
        })
    } , getDeptdocs: function () {
        var id = document.getElementById("pkCorp").value;
        if (id != null || id != "") {
            $.post(project.path + '/move/bdDeptdocs?id=' + id, function (data) {
                $.each(data.bdDeptdocs, function (index, item) {
                    $("#pkDeptdoc").append("<option value='" + item.id + "'>" + item.deptname + "</option>");
                    $("#pkDeptdoc").show();
                }, 'json')
            });
            $("#pkDeptdoc").html("<option value=''>请选择</option>")
        }
    }
});