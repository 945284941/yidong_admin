var bdPsndocService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'bdPsndocService',
        modalName: 'bd_psndoc_manager_edit',
        
    },
    init: function () {
    },
    loadlist: function () {
        var param = $('#bd_psndoc_manager_searchFrom').formToJson();
        $.get(project.path + '/bdPsndoc/list',param,function(data){
            $('#bd_psndoc_manager_list').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#bd_psndoc_manager_searchFrom').formToJson();
        param.pageNo=pageNo;
        $.get(project.path + '/bdPsndoc/list',param,function(data){
            $('#bd_psndoc_manager_list').html(data);
        })
    },
    reset:function(){
        document.getElementById('bd_psndoc_manager_searchFrom').reset();
        $.get(project.path + '/bdPsndoc/list',function(data){
            $('#bd_psndoc_manager_list').html(data);
        })
    },
   
    
    toImport: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/bdPsndoc/toImport"
        });
    },
    toImportsnbasdoc: function () {
        $("#" + this.options.modalName).modal({
            remote: project.path + "/bdPsndoc/toImportPsnbasdoc"
        });
    },
    

    importBdPsnbasdoc:function () {
        var $this = this;
        var param = $('#bdPsndoc_import_bdPsndoc').formToJson();
        $.ajaxFileUpload({
            url:project.path + '/bdPsndoc/importBdPsnbasdoc',
            type:'post',
            secureuri:false,                       //是否启用安全提交,默认为false
            fileElementId:'file',
            data:param,
            dataType:'JSON',
            success:function(data, status){        //服务器响应成功时的处理函数
                data = data.replace(/<.*?>/ig,"");  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
                var img=JSON.parse(data);
                if(img.success){
                    $this.pageList();
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
    },
    /**
     * 导入
     */
    importPsndoc:function () {
        var $this = this;
        var param = $('#bdPsndoc_import_bdPsndoc').formToJson();
        $.ajaxFileUpload({
            url:project.path + '/bdPsndoc/importBdPsndoc',
            type:'post',
            secureuri:false,                       //是否启用安全提交,默认为false
            fileElementId:'file',
            data:param,
            dataType:'JSON',
            success:function(data, status){        //服务器响应成功时的处理函数
                data = data.replace(/<.*?>/ig,"");  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
                var img=JSON.parse(data);
                if(img.success){
                    $this.pageList();
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
    },
    
});