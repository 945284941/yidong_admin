package cn.ctrl.platform.component.elastic;

import cn.ctrl.platform.component.basic.BaseEntity;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * Created by HuifengWang on 2017/1/13.
 * 搜索引擎查询条件封装
 */

@Data
@Slf4j
public class DmpSearchVo extends BaseEntity{
    //部门
    private String department;
    //行业
    private String industry;
}
