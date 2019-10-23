var zhuanhuiService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'zhuanhuiService',
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
        $.get(project.path + '/zhuanhui/table',param,function(data){
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
        $.get(project.path + '/zhuanhui/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        var _this =this ;
         $('#'+this.options.formId)[0].reset();
        $.get(project.path + '/zhuanhui/table',function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/zhuanhui/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/zhuanhui/insert"
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/zhuanhui/delete?id=' + id, function (data) {
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

                $.post(project.path + '/zhuanhui/save', param, function (data) {
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