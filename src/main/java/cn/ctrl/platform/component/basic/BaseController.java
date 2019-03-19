package cn.ctrl.platform.component.basic;

import cn.ctrl.framework.common.exception.BusinessException;
import cn.ctrl.framework.common.exception.ExceptionCode;
import cn.ctrl.framework.common.exception.ExceptionEntity;
import cn.ctrl.framework.common.exception.SystemException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by HuifengWang on 2016/12/22.
 */
public class BaseController extends BaseBase{

    @ExceptionHandler
    @ResponseBody
    public ExceptionEntity jsonErrorHandler(HttpServletRequest request, Exception ex, HttpServletResponse response) {
        response.setStatus(500);
        if(ex instanceof SystemException) {
            response.setStatus(501);
            return new ExceptionEntity(ex.getMessage(), ExceptionCode.SYSTEM);
        } else if(ex instanceof BusinessException) {
            response.setStatus(502);
            return new ExceptionEntity(ex.getMessage(), ExceptionCode.BUSINESS);
        } else if(ex instanceof RuntimeException) {
            response.setStatus(503);
            return new ExceptionEntity(ex.getLocalizedMessage(), ExceptionCode.RUNTIME);
        } else {
            return new ExceptionEntity(ex.getMessage(), ExceptionCode.DEFAULT);
        }
    }
}
