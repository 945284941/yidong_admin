<#--<form action="/test/do2" method="post">-->
    <#--<input name = "attt" value="${info.xx}">-->
    <#--<input type="submit">-->
<#--</form>-->
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">角色维护</h4>
            </div>
            <div class="modal-body" id="system_role_manager_modalBody">
                <form action="#" id="system_role_manager_saveOrUpdate" class="form-horizontal" novalidate="novalidate">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="control-label col-md-4">上级角色:
                                <span class="required" aria-required="true"> * </span>
                            </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control tree_input input-large" style="width: 25rem;">
                                <div class="treeList">
                                    <ul id="treeDemo3" class="ztree treeDemo"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">角色名称：
                                <span class="required" aria-required="true"> * </span>
                            </label>
                            <div class="col-md-6">
                                <input type="text" data-required="1" class="form-control input-large">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">描述：
                                <span class="required" aria-required="true"> * </span>
                            </label>
                            <div class="col-md-6">
                                <div class="input-icon right">
				                    <textarea type="text" name="describe" class="form-control input-large"
                                              data-required="1" placeholder="">
				                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default circle" data-dismiss="modal" aria-hidden="true"><i
                        class="icon-close"></i> 取消
                </button>
                <button type="button" class="btn green circle"><i class="fa fa-save"></i> 保存</button>
            </div>
        </div>
    </div>