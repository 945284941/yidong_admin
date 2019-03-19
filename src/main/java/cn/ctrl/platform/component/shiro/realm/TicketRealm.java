package cn.ctrl.platform.component.shiro.realm;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.InitializingBean;

import java.util.List;


@Slf4j
public class TicketRealm extends AuthorizingRealmAdaptor implements InitializingBean{
	@Override
	protected Object getUserByToken(AuthenticationToken token) throws Exception {
		return null;
	}

	/**
	 * 获取当前用户的所有角色
	 *
	 * @return
	 */
	@Override
	public List<String> getRoles() {
		return null;
	}

	/**
	 * 获取当前用户的所有权限
	 *
	 * @return
	 */
	@Override
	public List<String> getPermissions() {
		return null;
	}

	@Override
	public void afterPropertiesSet() throws Exception {

	}
//
//	/**
//	 * 用户权限信息认证，可以在用户认证通过后对用户进行授权，避免二次访问
//	 */
//	@Override
//	protected SysUser getUserByToken(AuthenticationToken token) throws Exception {
//		log.info("开始ticket认证");
//
//		SysUser sysUser = null ;
//
//		TicketToken ticketToken = (TicketToken)token ;
//
//		if(StringUtils.isNotBlank(ticketToken.getTicket())){
//			log.warn("验证ticket , ticket = "+ticketToken.getTicket());
//			sysUser = sysUserService.getUserByTicket(ticketToken.getTicket()) ;
//		}
//
//		return sysUser;
//	}
//
//	/**
//	 * 将权限验证的方法拿到当前类中，在父类中会出现调用不到的情况。
//	 * @param principals
//	 * @return
//     */
//	@Override
//	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//		return super.doGetAuthorizationInfo(principals) ;
//	}
//
//	@Override
//	public void afterPropertiesSet() throws Exception {
//		setAuthenticationTokenClass(TicketToken.class);
//	}
//
}
