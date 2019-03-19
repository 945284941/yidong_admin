package cn.ctrl.platform.component.basic;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.framework.common.utils.UtilsJson;
import com.github.pagehelper.PageInfo;

/**
 * Created by HuifengWang on 2016/11/23.
 */
public class BaseService extends BaseBase{
    protected PageInfo JsonContent2PageInfo(JsonContent jsonContent){
        String success=String.valueOf(jsonContent.get("success"));
        PageInfo page =new PageInfo();
        if(success!=null && "true".equals(success)){
           page = UtilsJson.toObject((String) jsonContent.get("data"),PageInfo.class);
        }
        return page;
    }
}
