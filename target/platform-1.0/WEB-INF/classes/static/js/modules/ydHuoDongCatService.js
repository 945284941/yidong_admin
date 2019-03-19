var ydHuoDongCatService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'ydHuoDongCatService',
        modalName: 'system_expert_manager_edit',
        formId: 'system_expert_manager_searchFrom',
        formName:'system_expert_form_table',
        contentName:'system_expert_manager_table'
    },
    init: function () {
    },
    loadTable: function () {
        var _this =this ;
        var param = $('#'+this.options.formId).formToJson();
        $.get(project.path + '/ydHuoDongCat/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    pageList: function (pageNo) {
        var _this =this ;
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#'+this.options.formId).formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/ydHuoDongCat/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        var _this =this ;
         $('#'+this.options.formId)[0].reset();
        $.get(project.path + '/ydHuoDongCat/table',function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDongCat/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDongCat/insert"
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/ydHuoDongCat/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.loadTable();
                    Duang.success("提示", data.message);
                } else {
                    Duang.error("提示", data.message);
                }
            })
        }
    },
    saveOrUpdate: function () {
        var $this = this;
        var param = $('#' + this.options.formName).formToJson();

                $.post(project.path + '/ydHuoDongCat/save', param, function (data) {
                    if (data.success) {
                        $("#" + $this.options.modalName).modal('hide');
                        $this.loadTable();
                        Duang.success("提示", "保存成功");
                    } else {
                        Duang.error("提示", data.message);
                    }
                }, 'json')


    },

});