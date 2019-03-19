package cn.ctrl.platform.component.interceptor;


import cn.ctrl.platform.modules.dmp.visitingRecord.web.VisitingRecordController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by HuifengWang on 2017/1/22.
 */
@Slf4j
public class BaseInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        log.info(">>>BaseInterceptor>>>>>>>在请求处理之前进行调用（Controller方法调用之前）");

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        log.info(">>>BaseInterceptor>>>>>>>请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）");
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        log.info(">>>BaseInterceptor>>>>>>>在整个请求结束之后被调用，也就是在DispatcherServlet 渲染了对应的视图之后执行（主要是用于进行资源清理工作）");
        log.info("数据"+httpServletRequest.getRequestURI()+"--"+httpServletRequest.getRemoteUser());
        String url = httpServletRequest.getRequestURI();
        String userId = httpServletRequest.getRemoteUser();
        if(userId != null && !("").equals(userId)){
            userId = userId.substring(userId.indexOf("id=")+3,userId.indexOf(","));
            log.info(url+"--"+userId);
            VisitingRecordController visitingRecordController = new VisitingRecordController();
            visitingRecordController.insert(url,userId);
        }
    }
}
