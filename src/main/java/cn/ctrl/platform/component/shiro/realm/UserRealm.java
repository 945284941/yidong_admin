package cn.ctrl.platform.component.shiro.realm;

import cn.ctrl.framework.common.utils.JsonMapper;
import cn.ctrl.platform.component.basic.Constants;
import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.entity.SysUser;
import cn.ctrl.platform.orm.mapper.SysResourcesMapper;
import cn.ctrl.platform.orm.mapper.SysRoleMapper;
import cn.ctrl.platform.orm.mapper.SysUserMapper;
import cn.ctrl.platform.utils.PasswordUtil;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class UserRealm extends AuthorizingRealmAdaptor implements InitializingBean{

	@Autowired
    SysUserMapper userMapper;
    @Autowired
    SysRoleMapper roleMapper;

    @Autowired
    SysResourcesMapper resourcesMapper;

    @Autowired
    ResourcesService resourcesService;
	
	/**
	 * 忽略用户状态为空的用户
	 */
	@Override
	public boolean isIgnoreNullUserState() {
		return true ;
	}
	
	/**
	 * 用户权限信息认证，可以在用户认证通过后对用户进行授权，避免二次访问
	 */
	@Override
	protected Object getUserByToken(AuthenticationToken token) throws Exception {
		log.info("开始登陆认证,{}", JsonMapper.toJSONString(token));
		SysUser user = null ;

		UsernamePasswordToken userToken = (UsernamePasswordToken)token ;

		if(StringUtils.isNotBlank(userToken.getUsername()) && userToken.getPassword()!=null && StringUtils.isNotBlank(String.valueOf(userToken.getPassword()))){
			user = new SysUser();
			user.setUsername(userToken.getUsername());
			user.setPassword(PasswordUtil.md5(String.valueOf(userToken.getPassword())));
			//判断用户名是否存在
			List list  = userMapper.select(user);
			if(list!=null && list.size()>0){
				//进行实体登陆验证，如果存在账号，返回登陆之后的实体信息
                user = userMapper.selectOne(user);
			}else{
				//如果账号不存在，抛出未知账号的异常
				throw new UnknownAccountException() ;
			}
		}
		return user;
	}

    /**
     * 将权限验证的方法拿到当前类中，在父类中会出现调用不到的情况。
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return super.doGetAuthorizationInfo(principals) ;
    }

    /**
     * 获取当前用户的所有角色
     *
     * @return
     */
    @Override
    public List<String> getRoles() {
        SysUser user  = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(Constants.SESSION_INFO);
        List<SysRole> list = roleMapper.getRolesByUserId(user.getId());
        List<String> tem = Lists.newArrayList();
        if(list!=null && list.size()>0){
            for (int i = 0; i < list.size(); i++) {
                tem.add(list.get(i).getName());
            }
        }
        return tem;
    }

    public SysRole getRole(){
        SysUser user  = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(Constants.SESSION_INFO);
        String userId = user.getId();

        List<SysRole> list = roleMapper.findRoleByUserId(userId);
        return list.get(0);
    }
    /**
     * 获取当前用户的所有权限
     *
     * @return
     */
    @Override
    public List<String> getPermissions() {
        SysUser user  = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(Constants.SESSION_INFO);
        List<SysRole> roles = roleMapper.getRolesByUserId(user.getId());
        String[] roleIds=new String[roles.size()];
        boolean isAdmin =false;
        for (int i = 0; i < roles.size(); i++) {
            if("1".equals(roles.get(i).getId())){
                isAdmin = true;
                break;
            }
            roleIds[i]=roles.get(i).getId();
        }
        List<SysResources> res;
        if(isAdmin){
             res= resourcesMapper.selectAll();
        }else{
            res= resourcesMapper.findResourcesByRoleId(roleIds);
        }
        List<String> tem = Lists.newArrayList();
        if(res!=null && res.size()>0){
            for (int i = 0; i < res.size(); i++) {
                tem.add(res.get(i).getCode());
            }
        }
        return tem;
    }

    @Override
	public void afterPropertiesSet() throws Exception {
		setAuthenticationTokenClass(UsernamePasswordToken.class);
	}

    public void cleanAuthz(){
        super.clearCachedAuthorizationInfo(SecurityUtils.getSubject().getPrincipals());
    }
}
