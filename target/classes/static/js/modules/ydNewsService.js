var ydNewsService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'ydNewsService',
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
        $.get(project.path + '/ydNews/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
    },

     changImg:function(){

    $.ajaxFileUpload({
        url: project.path + '/ydNews/imgSave',
        type: 'post',
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'myImg',
        dataType: 'JSON',
        success: function (data, status) {
            data = data.replace(/<.*?>/ig, "");
            var img = JSON.parse(data);
            if (img.success) {
                $("#deImg").attr("src", img.message);
                $("#defaultPicSrc").val(img.message);
                Duang.success("提示", "上传成功");
            } else {
                Duang.error("提示", "上传失败");
            }
        },
        error: function (data, status, e) {//服务器响应失败时的处理函数
            Duang.error("提示", "上传失败");
        }
    });
},
    baby: function(){
        var $this =this;
        var content =  baidu.editor.getEditor('editor').getContent();
        var param = $('#' + this.options.formName).formToJson();
        param.content = content;

        $.post(project.path + '/ydNews/save', param, function (data) {
            if (data.success) {
                // $("#" + $this.options.modalName).modal('hide');

                Duang.success("提示", "保存成功");
                $('#' + $this.options.formName)[0].reset();
                baidu.editor.getEditor('editor').setContent('');
                $('#defaultPicSrc').val('')
                $('#deImg').attr("src","")
                baidu.editor.getEditor('editor').setContent('');
            } else {
                Duang.error("提示", data.message);
            }
        }, 'json')
    },
    qingkong:function(){
        $('#' + this.options.formName)[0].reset();
        baidu.editor.getEditor('editor').setContent('');
      $('#defaultPicSrc').val('')
        $('#deImg').attr("src","")
    },
    pageList: function (pageNo) {
        var _this =this ;
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#'+this.options.formId).formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/ydNews/table',param,function(data){
            $('#'+_this.options.contentName).html(data);
        })
       // $("#system_user_manager_table").load(project.path+"/user/table?pageNo=" + pageNo);
    },
    reset:function(){
        var _this =this ;
         $('#'+this.options.formId)[0].reset();

    },
    edit: function (id) {
        // $("#" + this.options.modalName).modal({
        //     remote: project.path + "/ydNews/edit?id=" + id
        // });\
        $.get(project.path + 'baby?id='+id,function(data){
            $('.page-content-body').html(data);
        })
    },
    add: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/ydNews/insert"
        });
    },
    delete: function (id) {
        var r = window.confirm("确定删除?");
        if (r) {
            var $this = this;
            $.post(project.path + '/ydNews/delete?id=' + id, function (data) {
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

                $.post(project.path + '/ydNews/save', param, function (data) {
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