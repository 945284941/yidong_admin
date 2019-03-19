var voucherService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'voucherService',
        modalName: 'voucher_edit',
        editFromName: 'voucher_edit_form'
    },
    voucherList: function () {
        var param = $('#voucher_searchFrom').formToJson();
        $.get(project.path + '/voucher/list',param,function(data){
            $('#voucherList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#voucher_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/voucher/list',param,function(data){
            $('#voucherList').html(data);
        })
    },
    reset:function(){
        $('#key').val('');
        $.get(project.path + '/voucher/list',null,function(data){
            $('#voucherList').html(data);
        })
    },
    voucherAdd:function(id){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/voucher/add?id="+id
        });
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
    voucherSave:function(){
        var $this = this;
        var param = $("#voucher_add_form").formToJson();
        $.post(project.path + '/voucher/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.voucherList();
            alert(data.success);
        })
    },
    voucherDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/voucher/delete',"id="+id,function(data){
                $this.voucherList();
                alert(data.success);
            })
        }
    },
    voucherEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/voucher/edit?id="+id
        })
    },
    voucherUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/voucher/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.voucherList();
        })
    }
});