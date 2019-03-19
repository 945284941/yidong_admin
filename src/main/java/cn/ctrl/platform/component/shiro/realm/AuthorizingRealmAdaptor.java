package cn.ctrl.platform.component.shiro.realm;


import cn.ctrl.platform.component.basic.Constants;

import cn.ctrl.platform.orm.entity.SysUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public abstract class AuthorizingRealmAdaptor extends AuthorizingRealm {
	/**
	 * 是否忽略用户状态为null的用户，默认为false
	 * @return
	 */
	public boolean isIgnoreNullUserState() {
		return false;
	}


	
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		//记录在认证过程中出现的异常信息
		AuthenticationException authenticationException = null ;
		//记录认证实体
		SysUser sysUser = null ;
		try {
			sysUser = (SysUser) getUserByToken(token);
			//对用户信息进行校验
			if(sysUser ==null){
				//已存在账号的密码错误
				throw new IncorrectCredentialsException() ;
			}
		} catch (Exception e) {
			//捕获在获取用户信息过程中出现的异常信息
			if(e instanceof AuthenticationException){
				authenticationException = (AuthenticationException)e ;
			}else{
				authenticationException = new AuthenticationException(e.getMessage()) ;
			}
		}
		//如果获取用户异常，抛出异常信息，并存储在session中
		if(authenticationException!=null){
			log.warn("认证异常："+authenticationException.getClass().getName()+" , message:"+authenticationException.getMessage());
			//session中存储的认证异常的key为AuthenticationException类名称
			SecurityUtils.getSubject().getSession().setAttribute(AuthenticationException.class.getName() , authenticationException);

			throw authenticationException ;
		}

		//认证成功之后返回认证信息
		SimpleAuthenticationInfo authenticationInfo =
				new SimpleAuthenticationInfo(sysUser, token.getCredentials() , getName()) ;

        //认证成功,把用户信息存入session
		SecurityUtils.getSubject().getSession().setAttribute(Constants.SESSION_INFO,sysUser);
		return authenticationInfo ;
	}
	
	protected abstract Object getUserByToken(AuthenticationToken token) throws Exception ;
	
	/**
	 * 进行授权
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo() ;
		List<String> roles = getRoles();
		for (String role : roles) {
			authorizationInfo.addRole(role);
		}

		List<String> permissions = getPermissions();

		for (String permission : permissions) {
			authorizationInfo.addStringPermission(permission);
		}

		//给用户设置权限跟资源
		setRolesAndResourcesCode(authorizationInfo);
		return authorizationInfo;
	}

	private void setRolesAndResourcesCode(SimpleAuthorizationInfo authorizationInfo) {
		SysUser user = (SysUser) SecurityUtils.getSubject().getPrincipal();
		user.setResources(new ArrayList(authorizationInfo.getStringPermissions()));
		user.setRoles(new ArrayList(authorizationInfo.getRoles()));
		SecurityUtils.getSubject().getSession().setAttribute(Constants.SESSION_INFO,user);
	}


	/**
	 * 获取当前用户的所有角色
	 * @return
	 */
	public abstract List<String> getRoles();

	/**
	 * 获取当前用户的所有权限
	 * @return
	 */
	public abstract List<String> getPermissions();
}
