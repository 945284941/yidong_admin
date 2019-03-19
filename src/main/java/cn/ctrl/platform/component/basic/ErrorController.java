package cn.ctrl.platform.component.basic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by HuifengWang on 2017/1/9.
 */
@Controller
public class ErrorController {
    @RequestMapping("errorPage")
    public String errorPage(){
        return "error";
    }
}
