var bdCorpService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'bdCorpService',
        modalName: 'bd_corp_manager_edit',
        formId:'bd_corp_form'
    },
    init: function () {
    },
    loadlist: function () {
        var param = $('#bd_corp_manager_searchFrom').formToJson();
        console.log(param);
        $.post(project.path + '/bdCorp/list',param,function(data){
            $('#bd_corp_manager_list').html(data);
        })
    },
    pageList: function (pageNo) {

        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#bd_corp_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.post(project.path + '/bdCorp/list',param,function(data){
            $('#bd_corp_manager_list').html(data);
        })
    },
    reset:function(){
        document.getElementById('bd_corp_manager_searchFrom').reset();
        $.post(project.path + '/bdCorp/list',function(data){
            $('#bd_corp_manager_list').html(data);
        })
    },
    detail: function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/bdCorp/detail?id=" + id
        });
    },

    edit: function (id) {
        Layout.loadAjaxContent(project.path+"/bdCorp/form?id=" + id);
        // $("#Staff_manager_edit").modal({
        //     remote: project.path + '/staff/edit?id=' + id
        // });
    },
    
    update:function(){
        var $this = this;
        var param = $('#' + this.options.formId).formToJson();
        if(param.morningStartWorkTime == null || param.morningStartWorkTime == ""){
            Duang.error("提示","上午上班时间!");
        } else if(param.morningEndWorkTime == null || param.morningEndWorkTime == ""){
            Duang.error("提示","上午下班时间!");
        }else if(param.afternoonStartWorkTime == null || param.afternoonStartWorkTime == "") {
            Duang.error("提示","下午上班时间!");
        }else if(param.afternoonEndWorkTime == null || param.afternoonEndWorkTime == "") {
            Duang.error("提示","下午下班时间!");
        }else {
            setTimeout(function () {
                $("#share").attr("disabled", "true");
                $.post(project.path + '/bdCorp/update', param, function (data) {

                    if (data.success) {

                        Duang.success("提示", data.message);
                        Layout.loadAjaxContent(project.path + "/bdCorp/manager")
                    } else {
                        Duang.error("提示", data.message);
                    }
                }, 'json')
            }, 1);
            $("#share").removeAttr("disabled");
        }
    },
   

});