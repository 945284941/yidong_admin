package cn.ctrl.platform.utils;

import org.apache.shiro.SecurityUtils;

/**
 * Created by HuifengWang on 2017/1/13.
 * 资源权限验证工具类
 */
public class UtilsPermission {
    public static  boolean hasPermission(String permission){
        return SecurityUtils.getSubject().isPermitted(permission);
    }
}
