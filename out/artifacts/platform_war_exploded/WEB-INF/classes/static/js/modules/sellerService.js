var sellerService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'sellerService',
        modalName: 'seller_edit',
        formName: 'seller_edit_form'
    },

    initImg:function(){
        //初始化fileinput控件（第一次初始化）
        $('#imgFile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: project.path + "/seller/upImg", //上传的地址
            enctype: 'multipart/form-data',
            allowedFileExtensions : ['jpg', 'png','bmp','jpeg'],//接收的文件后缀
            showPreview : false,//不显示预览
            uploadExtraData:function(){//向后台传递参数
                var data={
                    apkName:$("#apkName").val(),
                    versionNum:$("#versionNum").val(),
                    description:$("#description").val(),
                    imgLogo:$("#imgLogo").val()
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
            $("#imgLogo").val(data.response.url);
        });
     },
    initUeditor:function(){
        var ue = UE.getEditor('editor');
        ue.ready(function() {
            //设置编辑器的内容
            var remark = $("#remark").val();
            if(remark == null || "" == remark){
                ue.setContent('请填写商家介绍');
            }else{
                ue.setContent(remark);
            }
        });
        ue.addListener("contentChange",function(){
            $("#remark").val(ue.getContent());
        });
    },
    sellerList: function () {
       var param = $('#seller_searchFrom').formToJson();
        $.get(project.path + '/seller/list',param,function(data){
            $('#sellerList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#seller_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/seller/list',param,function(data){
            $('#sellerList').html(data);
        })
    },
    reset:function(){
        $('#Phone').val('');
        $.get(project.path + '/seller/list',null,function(data){
            $('#sellerList').html(data);
        })
    },
    sellerDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/seller/delete',"id="+id,function(data){
                $this.sellerList();
                alert("删除成功！");
            })
        }
    },
    sellerEdit:function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/seller/edit?id=" + id
        });
    },
    sellerUpdate:function () {
        var $this = this;
        var param = $('#' + this.options.formName).formToJson();
        $.post(project.path + '/seller/update',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.sellerList();
            alert(data.success);
        })
    },
    sellerAdd:function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/seller/add"
        });
    },
    sellerSave:function () {
        var $this = this;
        var param = $("#seller_add_form").formToJson();
        $.post(project.path + '/seller/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.sellerList();
            alert(data.success);
        })
    },
    sellerCarousel:function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/seller/carousel?id=" + id
        });
    },
    sellerCarouselSave:function () {
        var $this = this;
        var param = $("#carousel_form").formToJson();
        $.post(project.path + '/seller/carouselSave',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.sellerList();
            alert(data.success);
        })
    },
    sellerCarouselDelete:function () {
        var $this = this;
        var id = $("#selectId").val();
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/seller/carouselDelete',"id="+id,function(data){
                alert(data.success);
                $this.sellerCarousel();
            })
        }
    }
});