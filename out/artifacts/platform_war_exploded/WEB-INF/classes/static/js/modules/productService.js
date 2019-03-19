var productService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'productService',
        modalName: 'product_edit',
        editFromName: 'product_edit_form'
    },
    initImg:function(){
        //初始化fileinput控件（第一次初始化）
        $('#imgFile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: project.path + "/product/upImg", //上传的地址
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
                ue.setContent('请填写商品介绍');
            }else{
                ue.setContent(memo);
            }
        });
        ue.addListener("contentChange",function(){
            $("#memo").val(ue.getContent());
        });
    },
    productList: function () {
        var param = $('#product_searchFrom').formToJson();
        $.get(project.path + '/product/list',param,function(data){
            $('#productList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#product_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/product/list',param,function(data){
            $('#productList').html(data);
        })
    },
    reset:function(){
        $('#key').val('');
        $.get(project.path + '/product/list',null,function(data){
            $('#productList').html(data);
        })
    },
    productAdd:function(id){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/product/add?id="+id
        });
    },
    productSave:function(){
        var $this = this;
        var param = $("#product_add_form").formToJson();
        $.post(project.path + '/product/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.productList();
            alert(data.success);
        })
    },
    productDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/product/delete',"id="+id,function(data){
                $this.productList();
                alert("删除成功！");
            })
        }
    },
    productEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/product/edit?id="+id
        })
    },
    productUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/product/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.productList();
        })
    },
    productCarousel:function (id) {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/product/carousel?id=" + id
        });
    },
    productCarouselSave:function () {
        var $this = this;
        var param = $("#carousel_form").formToJson();
        $.post(project.path + '/product/carouselSave',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.productList();
            alert(data.success);
        })
    },
    productCarouselDelete:function () {
        var $this = this;
        var id = $("#selectId").val();
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/product/carouselDelete',"id="+id,function(data){
                alert(data.success);
                $this.productCarousel();
            })
        }
    }
});