var movePowerService = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'movePowerService',
        modalName: 'move_power_manager_edit',
        formId: 'move_power_form'
    },
    init: function () {
    },
    loadlist: function () {
        var param = $('#move_power_manager_searchFrom').formToJson();
        $.get(project.path + '/move/list', param, function (data) {
            $('#move_power_manager_list').html(data);
        })
    },
    pageList: function (pageNo) {
        if (!pageNo) {
            pageNo = 1;
        }
        var param = $('#move_power_manager_searchFrom').formToJson();
        param.pageNo = pageNo;
        $.get(project.path + '/move/list', param, function (data) {
            $('#move_power_manager_list').html(data);
        })
    },
    pageAccreditList: function (id) {
        var param = $('#move_power_accredit_searchFrom').formToJson();
        param.pageNo = 1;
        param.id = id;
        $.get(project.path + '/move/accreditList', param, function (data) {
            $('#system_move_accredit_div').html(data);
        })

    },
    reset: function () {
        document.getElementById('move_power_manager_searchFrom').reset();
        $('#corp_manager_search_corpId').val('');
        $("#corp_manager_search_corpName").attr("value", "");
        $('#deptdoc_manager_search_deptdocId').val('');
        $("#deptdoc_manager_search_deptdocName").attr("value", "");
        $.get(project.path + '/move/list', function (data) {
            $('#move_power_manager_list').html(data);
        })
    },

    /**
     * 编辑
     * @param id
     */
    form: function (id) {
        Layout.loadAjaxContent(project.path + "/move/form?id=" + id);
    },

    /**
     * 新增
     */
    add: function () {
        Layout.loadAjaxContent(project.path + "/move/add");
    },
    /**
     * 根据公司id获取部门
     */
    getDeptdocs: function () {
        var id = document.getElementById("pkCorp").value;
        if (id != null || id != "") {
            $.post(project.path + '/move/bdDeptdocs?id=' + id, function (data) {
                $.each(data.bdDeptdocs, function (index, item) {
                    $("#pkDeptdoc").append("<option value='" + item.id + "'>" + item.deptname + "</option>")
                    $("#pkDeptdoc").show();
                }, 'json')
            })
            $("#pkDeptdoc").html("<option value=''>请选择</option>")
        }
    },
    /**
     * 根据部门id获取员工
     */
    getPsndocs: function (Id) {
        var id = document.getElementById("pkDeptdoc").value;
        if (id != null || id != "") {
            $.post(project.path + '/move/bdPsndocs?id=' + id, function (data) {

                $.each(data.bdPsndocs, function (index, item) {
                    $("#pkPsndoc").append("<option value='" + item.id + "'>" + item.psnname + "</option>")
                    $("#pkPsndoc").show();
                }, 'json')
            })
            $("#pkPsndoc").html("<option value=''>请选择</option>")
        }
    },
    /**
     * 删除
     * @param id
     */
    delete: function (id) {
        //删除
        var $this = this;
        var r = confirm("确定该操作吗");
        if (r == true) {
            $.post(project.path + '/move/delete?id=' + id, function () {
                $this.loadlist();
                Duang.success("提示", "删除成功");
            })
        }

    }
});