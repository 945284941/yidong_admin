var rechargeService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'rechargeService',
        modalName: 'recharge_edit',
        editFromName: 'recharge_edit_form'
    },
    rechargeList: function () {
        var param = $('#recharge_searchFrom').formToJson();
        $.get(project.path + '/recharge/list',param,function(data){
            $('#rechargeList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#recharge_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/recharge/list',param,function(data){
            $('#rechargeList').html(data);
        })
    },
    reset:function(){
        $('#name').val('');
        $.get(project.path + '/recharge/list',null,function(data){
            $('#rechargeList').html(data);
        })
    },
    rechargeAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/recharge/add"
        });
    },
    rechargeSave:function(){
        var $this = this;
        var param = $("#recharge_add_form").formToJson();
        $.post(project.path + '/recharge/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.rechargeList();
            alert(data.success);
        })
    },
    rechargeDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/recharge/delete',"id="+id,function(data){
                $this.rechargeList();
                alert("删除成功！");
            })
        }
    },
    rechargeEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/recharge/edit?id="+id
        })
    },
    rechargeUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/recharge/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.rechargeList();
        })
    },
    rechargeIsDel:function (id,isDel) {
        var $this = this ;
        var r;
        if(isDel == "1" ) {
            r = window.confirm("是否临时删除");
            isDel = "0";
        }else if(isDel == "0"){
            r = window.confirm("是否要恢复状态");
            isDel = "1";
        }
        if(r){
            $.get(project.path+"/recharge/isDel",{id:id,isDel:isDel},function(data){
                $this.rechargeList();
                alert(data.success);
            })
        }
    }
});