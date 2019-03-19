var carPeccancyService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'carPeccancyService',
        modalName: 'carPeccancy_manager_edit',
        formId: 'carPeccancy_form'
    },
    init: function () {
    },
    loadTable: function () {
        var param = $('#carPeccancy_manager_searchFrom').formToJson();
        $.get(project.path + '/carPeccancy/table',param,function(data){
            $('#carPeccancy_manager_table').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#carPeccancy_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/carPeccancy/table',param,function(data){
            $('#carPeccancy_manager_table').html(data);
        })
    },
    reset:function(){
        document.getElementById('carPeccancy_manager_searchFrom').reset();
        $.get(project.path + '/carPeccancy/table',function(data){
            $('#carPeccancy_manager_table').html(data);
        })
    },
    edit: function (id) {
        Layout.loadAjaxContent(project.path+"/carPeccancy/edit?id="+id)
    },
    add: function () {
        Layout.loadAjaxContent(project.path+"/carPeccancy/add")
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/carPeccancy/delete?id=' + id, function (data) {
                if (data.success) {
                    $this.loadTable();
                    Duang.success("提示", data.message);
                } else {
                    Duang.error("提示", data.message);
                }
            })
        }
    },
    save: function () {
        var $this = this;
        var param = $('#' + this.options.formId).formToJson();
        if(param.carDetailId == null || param.carDetailId == ""){
            Duang.error("提示","请选择车牌号!");
        }else if(param.peccancyTime == null || param.peccancyTime == ""){
            Duang.error("提示","请选择违章时间!");
        }else if(param.peccancyPosition == null || param.peccancyPosition == ""){
            Duang.error("提示","请输入违章地点!");
        }else if(param.content == null || param.content == ""){
            Duang.error("提示","请输入详细内容!");
        }else if(param.peccancyPrice == null || param.peccancyPrice == ""){
            Duang.error("提示","请输入违章金额!");
        }else if(param.peccancyPoints == null || param.peccancyPoints == ""){
            Duang.error("提示","请输入违章扣分!");
        }else if(param.state == null || param.state == ""){
            Duang.error("提示","请选择处理状态!");
        }else {
            $.post(project.path + '/carPeccancy/save', param, function (data) {
                if (data.success) {
                    Duang.success("提示", data.message);
                    Layout.loadAjaxContent(project.path+"/carPeccancy/manager")
                } else {
                    Duang.error("提示", data.message);
                }
            }, 'json')
        }

    },
    toImport: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/carPeccancy/toImport"
        });
    },
    importCarPeccancy:function () {
        var $this = this;
        var param = $('#carPeccancy_import').formToJson();
        $.ajaxFileUpload({
            url:project.path + '/carPeccancy/importCarPeccancy',
            type:'post',
            secureuri:false,                       //是否启用安全提交,默认为false
            fileElementId:'file',
            data:param,
            dataType:'JSON',
            success:function(data, status){        //服务器响应成功时的处理函数
                data = data.replace(/<.*?>/ig,"");  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
                var img=JSON.parse(data);
                if(img.success){
                    $this.loadTable();
                    $("#" + $this.options.modalName).modal('hide');
                    Duang.success("提示", img.message);
                }else{
                    Duang.error("提示", img.message);
                }
            },
            error:function(data, status, e){ //服务器响应失败时的处理函数
                Duang.error("提示", data.message);
            }
        });
    }
});