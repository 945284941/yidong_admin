var ydHuoDongService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'ydHuoDongService',
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
        $.get(project.path + '/ydHuoDong/table',param,function(data){
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
        $.get(project.path + '/ydHuoDong/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        var _this =this ;
         $('#'+this.options.formId)[0].reset();
        $.get(project.path + '/ydHuoDong/table',function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDong/edit?id=" + id
        });
    },
    baominglv: function(id){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDong/huodongcanyuqingkuang?id=" + id
        });
    },
    shenhe: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDong/shenhe?id=" + id
        });
    },

    shenheya: function (status) {
        var $this = this;
        var param = $('#' + this.options.formName).formToJson();
        param.checkStatus = status;
        $.post(project.path + '/ydHuoDong/save', param, function (data) {
            if (data.success) {
                $("#" + $this.options.modalName).modal('hide');
                $this.loadTable();
                Duang.success("提示", "保存成功");
            } else {
                Duang.error("提示", data.message);
            }
        }, 'json')

    },
    lookPeople:function(page,id){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDong/lookPeople?id=" + id+"&pageNo="+page
        });
    },
    add: function (baby) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydHuoDong/insert?baby="+baby
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/ydHuoDong/delete?id=' + id, function (data) {
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

                $.post(project.path + '/ydHuoDong/save', param, function (data) {
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