var menuService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'menuService',
        modalName: 'menu_edit',
        editFromName: 'menu_edit_form'
    },
    initImg:function(){
        //初始化fileinput控件（第一次初始化）
        $('#imgFile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: project.path + "/menu/upImg", //上传的地址
            enctype: 'multipart/form-data',
            allowedFileExtensions : ['jpg', 'png','bmp','jpeg'],//接收的文件后缀
            showPreview : false,//不显示预览
            uploadExtraData:function(){//向后台传递参数
                var data={
                    apkName:$("#apkName").val(),
                    versionNum:$("#versionNum").val(),
                    description:$("#description").val(),
                    imgUrl:$("#imgUrl").val()
                };
                return data;
            },
        });
        //同步上传错误处理
        $('#imgFile').on('filebatchuploaderror', function(event, data) {
            alert(data.error);
        });
        //同步上传返回结果处理
        $("#imgFile").on("filebatchuploadsuccess",function(event, data) {
            alert(data.response.success);
            $("#imgUrl").val(data.response.url);
        });
    },
    menuList: function () {
        var param = $('#menu_searchFrom').formToJson();
        $.get(project.path + '/menu/list',param,function(data){
            $('#menuList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#menu_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/menu/list',param,function(data){
            $('#menuList').html(data);
        })
    },
    reset:function(){
        $('#key').val('');
        $.get(project.path + '/menu/list',null,function(data){
            $('#menuList').html(data);
        })
    },
    menuAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/menu/add"
        });
    },
    menuSave:function(){
        var $this = this;
        var param = $("#menu_add_form").formToJson();
        $.post(project.path + '/menu/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.menuList();
            alert(data.success);
        })
    },
    menuDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/menu/delete',"id="+id,function(data){
                alert(data.success);
                $this.menuList();
            })
        }
    },
    menuEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/menu/edit?id="+id
        })
    },
    menuUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/menu/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.menuList();
        })
    }
});