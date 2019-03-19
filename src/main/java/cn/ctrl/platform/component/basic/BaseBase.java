package cn.ctrl.platform.component.basic;

import cn.ctrl.platform.component.shiro.realm.UserRealm;
import cn.ctrl.platform.orm.entity.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.subject.Subject;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by HuifengWang on 2016/12/5.
 */
public class BaseBase{

    /**
     * 获取当前用户
     * @return
     */
    public Subject getCurrent(){
//        Authentication current = SecurityContextHolder.getContext().getAuthentication();
        Subject current = SecurityUtils.getSubject();
        return current;
    }

    public SysUser getCurrentSysUser(){
        return (SysUser) SecurityUtils.getSubject().getPrincipal();
    }

    /**
     * 清空用户的权限
     */
    public void clearAuthz(){
        RealmSecurityManager rsm = (RealmSecurityManager) SecurityUtils.getSecurityManager();
        UserRealm userRealm = (UserRealm) rsm.getRealms().iterator().next();
        userRealm.cleanAuthz();
    }
}
