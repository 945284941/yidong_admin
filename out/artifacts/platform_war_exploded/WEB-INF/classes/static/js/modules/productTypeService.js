var productTypeService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'productTypeService',
        modalName: 'productType_edit',
        editFromName: 'productType_edit_form'
    },
    productTypeList: function () {
        var param = $('#productType_searchFrom').formToJson();
        $.get(project.path + '/productType/list',param,function(data){
            $('#productTypeList').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#productType_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/productType/list',param,function(data){
            $('#productTypeList').html(data);
        })
    },
    reset:function(){
        $('#Name').val('');
        $.get(project.path + '/productType/list',null,function(data){
            $('#productTypeList').html(data);
        })
    },
    productTypeAdd:function(){
        $("#" + this.options.modalName).modal({
            remote: project.path + "/productType/add"
        });
    },
    productTypeSave:function(){
        var $this = this;
        var param = $("#productType_add_form").formToJson();
        $.post(project.path + '/productType/save',param,function(data){
            $("#" + $this.options.modalName).modal('hide');
            $this.productTypeList();
            alert(data.success);
        })
    },
    productTypeDelete:function(id){
        var $this = this;
        var r = window.confirm("确定删除?");
        if (r){
            $.get(project.path + '/productType/delete',"id="+id,function(data){
                $this.productTypeList();
                alert("删除成功！");
            })
        }
    },
    productTypeEdit : function(id){
        $('#'+this.options.modalName).modal({
            remote : project.path+"/productType/edit?id="+id
        })
    },
    productTypeUpdate : function() {
        var $this = this;
        var param = $('#' + this.options.editFromName).formToJson();
        $.post(project.path + "/productType/update", param, function (data) {
            $("#" + $this.options.modalName).modal('hide');
            alert(data.success);
            $this.productTypeList();
        })
    }
});