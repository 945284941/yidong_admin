package cn.ctrl.platform.config;

import cn.ctrl.framework.shiro.AbstractShiroConfig;
import cn.ctrl.framework.shiro.filter.LoginFormAuthenticationFilter;
import cn.ctrl.framework.shiro.filter.LoginWinFormAuthenticationFilter;
import cn.ctrl.framework.shiro.filter.SecureFilter;
import cn.ctrl.platform.component.shiro.realm.UserRealm;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.web.filter.mgt.DefaultFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.Map;

/**
 * Created by HuifengWang on 2017/1/11.
 */
@Configuration
public class ShiroConfig extends AbstractShiroConfig {

    @Override
    protected void configFilterChainDefinition(Map<String, String> linkedDefinitionMap) {
        super.configFilterChainDefinition(linkedDefinitionMap);
        linkedDefinitionMap.put("/crawData/**",SecureFilter.anon.name());
        linkedDefinitionMap.put("/logout", SecureFilter.logout.name());
        linkedDefinitionMap.put("/plugins/**", SecureFilter.anon.name() );
        linkedDefinitionMap.put("/images/**", SecureFilter.anon.name() );
        linkedDefinitionMap.put("/js/**", SecureFilter.anon.name() );
        linkedDefinitionMap.put("/css/**", SecureFilter.anon.name() );
        linkedDefinitionMap.put("/dmp/**", SecureFilter.anon.name() );
        linkedDefinitionMap.put("/**", SecureFilter.loginauth.name());

    }
    @Override
    protected void configShiroFilters(Map<String, Filter> filters){
        super.configShiroFilters(filters);
        //设置页面形式中认证filter的用户名和密码参数
        LoginFormAuthenticationFilter loginAuthFilter =(LoginFormAuthenticationFilter)filters.get(SecureFilter.loginauth.name()) ;
        loginAuthFilter.setUsernameParam("username") ;
        loginAuthFilter.setPasswordParam("password") ;
    }
//    @Bean
//    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager){
//        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
//        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
//        return authorizationAttributeSourceAdvisor;
//    }

}
