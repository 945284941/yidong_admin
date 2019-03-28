var ydQuestionnaireService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'ydQuestionnaireService',
        modalName: 'system_expert_manager_edit',
        formId: 'system_expert_manager_searchFrom',
        formName:'system_expert_form_table',
        contentName:'system_expert_manager_table'
    },
    init: function () {
    },
    manager:function(id){
        $.get(project.path + '/ydQuestionnaireMessage/manager?id='+id,function(data){
            $('.page-content-body').html(data);
        })
    },
    contentManager:function(id){
        $.get(project.path + '/ydQuestionnaireMessageProprietor/manager?id='+id,function(data){
            $('.page-content-body').html(data);
        })
    },

    loadTable: function () {
        var _this =this ;
        var param = $('#'+this.options.formId).formToJson();
        $.get(project.path + '/ydQuestionnaire/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    messageloadTable: function (id) {
        var _this =this ;
        var param = $('#'+this.options.formId).formToJson();
        param.questionnaireId=id
        $.get(project.path + '/ydQuestionnaireMessage/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    contentloadTable : function(){
        var _this =this ;
        var param = $('#'+this.options.formId).formToJson();

        $.get(project.path + '/ydQuestionnaireMessageProprietor/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    tongji: function(id){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydQuestionnaireMessage/tongji?id=" + id
        });

        
    },
    contentloadTablePageList(pageNo){
        var _this =this ;
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#'+this.options.formId).formToJson();
        param.pageNo=pageNo;

        $.get(project.path + '/ydQuestionnaireMessageProprietor/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    messagepageList: function (pageNo,id) {
        var _this =this ;
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#'+this.options.formId).formToJson();
        param.pageNo=pageNo;
        param.questionnaireId=id
        $.get(project.path + '/ydQuestionnaireMessage/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
        // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    pageList: function (pageNo) {
        var _this =this ;
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#'+this.options.formId).formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/ydQuestionnaire/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        var _this =this ;
         $('#'+this.options.formId)[0].reset();
        $.get(project.path + '/ydQuestionnaire/table',function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    messagereset:function(id){
        var _this =this ;
        $('#'+this.options.formId)[0].reset();
        param.questionnaireId=id
        $.get(project.path + '/ydQuestionnaireMessage/table',function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },
    edit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydQuestionnaire/edit?id=" + id
        });
    },
    messageedit: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydQuestionnaireMessage/edit?id=" + id
        });
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydQuestionnaire/insert"
        });
    },
    messageadd: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydQuestionnaireMessage/insert?id="+id
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/ydQuestionnaire/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.loadTable();
                    Duang.success("提示", data.message);
                } else {
                    Duang.error("提示", data.message);
                }
            })
        }
    },
    messagedelete: function (id,qid) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/ydQuestionnaireMessage/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.messageloadTable(qid);
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

                $.post(project.path + '/ydQuestionnaire/save', param, function (data) {
                    if (data.success) {
                        $("#" + $this.options.modalName).modal('hide');
                        $this.loadTable();
                        Duang.success("提示", "保存成功");
                    } else {
                        Duang.error("提示", data.message);
                    }
                }, 'json')


    },
    messagesaveOrUpdate: function (id) {
        var $this = this;
        var param = $('#' + this.options.formName).formToJson();

        $.post(project.path + '/ydQuestionnaireMessage/save', param, function (data) {
            if (data.success) {
                $("#" + $this.options.modalName).modal('hide');
                $this.messageloadTable(id);
                Duang.success("提示", "保存成功");
            } else {
                Duang.error("提示", data.message);
            }
        }, 'json')


    },

});