<#assign ctx=request.contextPath>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"
            aria-hidden="true"></button>
    <h4 class="modal-title">活动参与情况       </h4>
</div>
<div class="modal-body">

    <table class="table table-bordered table-hover">
        <thead>
        <th style="text-align: center;">总人数</th>
        <th style="text-align: center;">报名人数</th>
        <th style="text-align: center;">报名比例</th>


        </thead>
        <tbody>


        <tr style="text-align: center;">
            <td>${(yuangong)!"0"}</td>
            <td  >${(baomingyuangong)!"0"}</td>
            <td>${(bili)!"0%"}</td>
        </tr>

        </tbody>
    </table>
</div>
</form>

</div>
<div style="text-align: center;margin-bottom: 10px;">
    <button type="button" class="btn default circle"
            data-dismiss="modal" aria-hidden="true"><i
            class="icon-action-undo"></i> 返回
    </button>

</div>
<script type="text/javascript">






</script>