var visitingRecordservice = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'visitingRecordservice'
    },
    initSignEvery:function(){
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            orientation: "left",
            autoclose: true
        });
        $( document ).scroll(function(){
            $('.date-picker').datepicker('place'); //#modal is the id of the modal
        });
        $(".empty").click(function(){
        	$('.myform')[0].reset();
        });
    },
    recordList: function () {
        var param = $('#visitingRecord_searchFrom').formToJson();
        $.get(project.path + '/visitingRecord/gainRecordList',param,function(data){
            $('#recordList').html(data);
        })
       // $("#recordList").load(project.path+"visitingRecord/gainRecordList?pageNo=" + pageNo);
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#visitingRecord_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/visitingRecord/gainRecordList',param,function(data){
            $('#recordList').html(data);
        })
    },
    reset:function(){
        document.getElementById('visitingRecord_searchFrom').reset();
        $('#visitingRecord_userName').val('');

        $.get(project.path + '/visitingRecord/gainRecordList',function(data){
            $('#recordList').html(data);
        })
    },
});