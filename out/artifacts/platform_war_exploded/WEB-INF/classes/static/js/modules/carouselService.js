var carouselService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'carouselService',
        modalName: 'carousel_edit',
        editFromName: 'carousel_edit_form'
    },
    initImg:function(){
        //初始化fileinput控件（第一次初始化）
        $('#imgFile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: project.path + "/carousel/upImg", //上传的地址
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
    carouselList: function () {
        var param = $('#carousel_searchFrom').formToJson();
        $.get(project.path + '/carousel/list',param,function(data){
            $('#carouselList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#carousel_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/carousel/list',param,function(data){
            $('#carouselList').html(data);
        })
    },
    reset:function(){
        $('#Type').val('');
        $.get(project.path + '/carousel/list',null,function(data){
            $('#carouselList').html(data);
        })
    },
    carouselAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/carousel/add"
        });
    },
    carouselSave:function(){
        var $this = this;
        var param = $("#carousel_add_form").formToJson();
        $.post(project.path + '/carousel/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.carouselList();
            alert(data.success);
        })
    },
    carouselDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/carousel/delete',"id="+id,function(data){
                $this.carouselList();
                alert("删除成功！");
            })
        }
    },
    carouselEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/carousel/edit?id="+id
        })
    },
    carouselUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/carousel/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.carouselList();
        })
    }
});