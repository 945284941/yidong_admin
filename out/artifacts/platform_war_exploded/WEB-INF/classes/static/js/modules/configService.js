var configService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'configService',
        modalName: 'config_edit',
        editFromName: 'config_edit_form'
    },
    configList: function () {
        var param = $('#config_searchFrom').formToJson();
        $.get(project.path + '/config/list',param,function(data){
            $('#configList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#config_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/config/list',param,function(data){
            $('#configList').html(data);
        })
    },
    reset:function(){
        $('#key').val('');
        $.get(project.path + '/config/list',null,function(data){
            $('#configList').html(data);
        })
    },
    configAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/config/add"
        });
    },
    configSave:function(){
        var $this = this;
        var param = $("#config_add_form").formToJson();
        $.post(project.path + '/config/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.configList();
            alert(data.success);
        })
    },
    configDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/config/delete',"id="+id,function(data){
                $this.configList();
                alert("删除成功！");
            })
        }
    },
    configEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/config/edit?id="+id
        })
    },
    configUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/config/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.configList();
        })
    }
});