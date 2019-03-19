var memberService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'memberService',
        modalName: 'member_edit',
        editFromName : 'member_edit_form'
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
    memberList: function () {
        var param = $('#member_searchFrom').formToJson();
        $.get(project.path + '/member/list',param,function(data){
            $('#memberList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#member_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/member/list',param,function(data){
            $('#memberList').html(data);
        })
    },
    reset:function(){
        $('#Phone').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $.get(project.path + '/member/list',null,function(data){
            $('#memberList').html(data);
        })
    },
    memberDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/member/delete',"id="+id,function(data){
                $this.memberList();
                alert("删除成功！");
            })
        }
    },
    changeStatus : function (id,state) {
        var $this = this ;
        var r;
        if(state == 0 ) {
            r = window.confirm("是否冻结该用户");
            state = 1;
        }else{
            r = window.confirm("是否要恢复用户");
            state = 0;
        }
        if(r){
            $.get(project.path+"/member/updateState",{id:id,state:state},function(_data){
               $this.memberList();
               alert("修改状态成功");
            })
        }
    },
    memberEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/member/memberEdit?id="+id
        })
    },
    memberUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.get(project.path + "/member/update", param, function (data) {
            $this.memberList();
            alert("修改成功");
            $("#" + $this.options.modalName).modal('hide');
        })
    },
    pointList : function(id){
        $('#memberId').val(id);
        $('#'+this.options.modalName).modal({
            remote : project.path+"/member/findPointRecordByMemberId?id="+id
        })
    },
    pointListByPoint : function(pageNo){
         var id = $('#memberId').val(id);
        $('#'+this.options.modalName).modal({
            remote : project.path+"/member/findPointRecordByMemberId?id="+id+"&pageNo="+pageNo
        })
    }


});