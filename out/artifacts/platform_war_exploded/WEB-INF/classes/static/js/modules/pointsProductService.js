var pointsProductService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'pointsProductService',
        modalName: 'pointsProduct_edit',
        editFromName: 'pointsProduct_edit_form'
    },
    initImg:function(){
        //初始化fileinput控件（第一次初始化）
        $('#imgFile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: project.path + "/pointsProduct/upImg", //上传的地址
            enctype: 'multipart/form-data',
            allowedFileExtensions : ['jpg', 'png','bmp','jpeg'],//接收的文件后缀
            showPreview : false,//不显示预览
            uploadExtraData:function(){//向后台传递参数
                var data={
                    apkName:$("#apkName").val(),
                    versionNum:$("#versionNum").val(),
                    description:$("#description").val(),
                    imgSrc:$("#imgSrc").val()
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
            $("#imgSrc").val(data.response.url);
        });
    },
    initUeditor:function(){
        var ue = UE.getEditor('editor');
        ue.ready(function() {
            //设置编辑器的内容
            var memo = $("#memo").val();
            if(memo == null || "" == memo){
                ue.setContent('请填写积分商品介绍');
            }else{
                ue.setContent(memo);
            }
        });
        ue.addListener("contentChange",function(){
            $("#memo").val(ue.getContent());
        });
    },
    pointsProductList: function () {
        var param = $('#pointsProduct_searchFrom').formToJson();
        $.get(project.path + '/pointsProduct/list',param,function(data){
            $('#pointsProductList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#pointsProduct_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/pointsProduct/list',param,function(data){
            $('#pointsProductList').html(data);
        })
    },
    reset:function(){
        $('#key').val('');
        $.get(project.path + '/pointsProduct/list',null,function(data){
            $('#pointsProductList').html(data);
        })
    },
    pointsProductAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/pointsProduct/add"
        });
    },
    pointsProductSave:function(){
        var $this = this;
        var param = $("#pointsProduct_add_form").formToJson();
        $.post(project.path + '/pointsProduct/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.pointsProductList();
            alert(data.success);
        })
    },
    pointsProductDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/pointsProduct/delete',"id="+id,function(data){
                $this.pointsProductList();
                alert("删除成功！");
            })
        }
    },
    pointsProductEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/pointsProduct/edit?id="+id
        })
    },
    pointsProductUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/pointsProduct/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.pointsProductList();
        })
    },
    pointsProductCarousel:function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/pointsProduct/carousel?id=" + id
        });
    },
    pointsProductCarouselSave:function () {
        var $this = this;
        var param = $("#carousel_form").formToJson();
        $.post(project.path + '/pointsProduct/carouselSave',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.pointsProductList();
            alert(data.success);
        })
    },
    pointsProductCarouselDelete:function () {
        var $this = this;
        var id = $("#selectId").val();
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/pointsProduct/carouselDelete',"id="+id,function(data){
                alert(data.success);
                $this.pointsProductCarousel();
            })
        }
    }
});