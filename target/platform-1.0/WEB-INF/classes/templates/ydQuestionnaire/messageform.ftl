<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">调查问卷设置       </h4>
</div>
<div class="modal-body">
    <form id="system_expert_form_table" class="form-horizontal"
          novalidate="novalidate"     enctype="multipart/form-data">
        <input type="hidden"  name="id" value="${(recharge.id)!""}"/>


        <div class="form-group">
        <label class="control-label col-md-3">调查问卷描述：
            <span class="required" aria-required="true"> * </span>
        </label>
        <div class="col-md-7">
            <input type="text" data-required="1" name="question" value="${(recharge.question)!""}"
                   class="form-control">
        </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">类型：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                 <select name="chooseType" class="form-control" onchange="leixing(this.options[this.options.selectedIndex].value)">
                         <#if recharge.chooseType??>
                             <option value="0" <#if recharge.chooseType == '0'>selected="selected"</#if> >选择</option>
                             <option value="1" <#if recharge.chooseType == '1'>selected="selected"</#if> >问答</option>
                         </#if>
                      <#if !recharge.chooseType??>
                             <option value="0">选择</option>
                             <option value="1">问答</option>
                      </#if>
                 </select>
            </div>
        </div>

      <div id="baby"
      <#if recharge.chooseType??>
         <#if recharge.chooseType == '1'>
         style="display: none;"
         </#if>
      </#if>
      >
        <div class="form-group">
            <label class="control-label col-md-3">选项a：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="a" value="${(recharge.a)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">选项b：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="b" value="${(recharge.b)!""}"
                       class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label class="control-label col-md-3">选项c：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="text" data-required="1" name="c" value="${(recharge.c)!""}"
                       class="form-control">
            </div>
        </div>


          <div class="form-group">
              <label class="control-label col-md-3">选项d：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="d" value="${(recharge.d)!""}"
                         class="form-control">
              </div>
          </div>


          <div class="form-group">
              <label class="control-label col-md-3">选项e：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="e" value="${(recharge.e)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项f：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="f" value="${(recharge.f)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项g：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="g" value="${(recharge.g)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项h：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="h" value="${(recharge.h)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项i
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="i" value="${(recharge.i)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项j：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="j" value="${(recharge.j)!""}"
                         class="form-control">
              </div>
          </div>

          <div class="form-group">
              <label class="control-label col-md-3">选项k：
                  <span class="required" aria-required="true"> * </span>
              </label>
              <div class="col-md-7">
                  <input type="text" data-required="1" name="k" value="${(recharge.k)!""}"
                         class="form-control">
              </div>
          </div>
      </div>

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">选择类型：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<#if recharge.chooseType??>-->
                 <#--<select name="chooseType"  class="form-control">-->
                     <#--<option value="0" <#if recharge.chooseType == '0'>selected="selected"</#if> >单选</option>-->
                     <#--<option value="1" <#if recharge.chooseType == '1'>selected="selected"</#if>>多选</option>-->
                 <#--</select>-->
                <#--</#if>-->
                 <#--<#if !recharge.chooseType??>-->
                 <#--<select name="chooseType"  class="form-control">-->
                     <#--<option value="0">单选</option>-->
                     <#--<option value="1">多选</option>-->
                 <#--</select>-->
                 <#--</#if>-->
            <#--</div>-->
        <#--</div>-->


        <input type="hidden" name="questionnaireId" value="${id}">


        <div class="form-group">
            <label class="control-label col-md-3">排序：
                <span class="required" aria-required="true"> * </span>
            </label>
            <div class="col-md-7">
                <input type="number" data-required="1" name="sortNum" value="${(recharge.sortNum)!""}"
                       class="form-control">
            </div>
        </div>

        <#--<div class="form-group">-->
            <#--<label class="control-label col-md-3">排序：-->
                <#--<span class="required" aria-required="true"> * </span>-->
            <#--</label>-->
            <#--<div class="col-md-7">-->
                <#--<input type="number" data-required="1" name="paixu" value="${(recharge.paixu)!""}"-->
                       <#--class="form-control">-->
            <#--</div>-->
        <#--</div>-->
</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>
    <button type="button" onclick="Duang.getService('ydQuestionnaireService').messagesaveOrUpdate('${id}')" class="btn green circle"><i
            class="fa fa-save"></i> 保存
    </button>
</div>

<script type="text/javascript">
  function  leixing(value){
     if(value == '1'){
         $('#baby').css("display","none");
     }else{
         $('#baby').css("display","block");
     }
  }
</script>
