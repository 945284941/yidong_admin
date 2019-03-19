package cn.ctrl.platform.utils;

import cn.ctrl.platform.component.basic.Constants;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by HuifengWang on 2016/12/28.
 */
public class ValidCodeUtils {

    //获取当前线程的验证码
    public String  getValidCode(){
        return "xxxx";
    }

    //验证是否正确
    public static boolean checkValidCode(HttpServletRequest request, String code){
        String validMsg = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
        if(StringUtils.isNotBlank(validMsg) && validMsg.equalsIgnoreCase(code)){
            //如果验证成功了,把当前用户当前线程的验证码清楚
            request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY,"");
            return true;
        }
        return false;
    }

    //判断是否开启验证
    public static boolean isOpenValidCode(){
        return true;
    }
}
