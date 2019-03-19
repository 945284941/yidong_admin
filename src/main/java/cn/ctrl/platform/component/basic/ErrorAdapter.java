package cn.ctrl.platform.component.basic;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.framework.common.utils.UtilsWeb;
import cn.ctrl.platform.component.basic.BaseBase;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by HuifengWang on 2016/11/23.
 */
@ControllerAdvice
public class ErrorAdapter extends BaseBase {
    @ExceptionHandler
    public ModelAndView handleException(HttpServletRequest request, HttpServletResponse response, Exception ex){
        System.out.println(ex.getMessage());
        if(UtilsWeb.isAjaxRequest(request)){
            response.setHeader("session-status","10000");
            response.setHeader("session-message",ex.getMessage());
            UtilsWeb.responseJson(response, JsonContent.fail("请求失败异常!"));
            return null;
        }
        return new ModelAndView("error");
    }
}
