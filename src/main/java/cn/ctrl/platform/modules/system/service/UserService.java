package cn.ctrl.platform.modules.system.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.framework.common.utils.UUIDGenerator;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.RoleAndUser;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.entity.SysUser;
import cn.ctrl.platform.orm.mapper.RoleAndUserMapper;
import cn.ctrl.platform.orm.mapper.SysRoleMapper;
import cn.ctrl.platform.orm.mapper.SysUserMapper;
import cn.ctrl.platform.utils.PasswordUtil;
import cn.ctrl.platform.utils.UUIDUtils;
import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by HuifengWang on 2016/12/26.
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class UserService extends BaseService {
    @Autowired
    SysUserMapper userMapper;

    @Autowired
    SysRoleMapper roleMapper;

    @Autowired
    RoleService roleService;

    @Autowired
    RoleAndUserMapper roleAndUserMapper;
    /**
     * 查询当前用户所拥有的权限所能看到的user用户
     * @return
     */
    //@Cacheable(value ="findUserListByUserId")
    public PageInfo findUserListByUserId(Map map, Integer pageNo, Integer pageSize) {

        if (pageNo == null || pageNo <= 0) pageNo = 1;
        if (pageSize == null || pageSize <= 0 || pageSize >= 500) pageSize = 10;

        //如果用户的角色变了,是否需要清除findUserListByUserId的缓存?
        List<SysRole> roles = roleService.getRolesAndChildrenRolesAndCreateByMe(this.getCurrentSysUser().getId(),false);
        List<String> ids = Lists.newArrayList();
        for (int i = 0; i < roles.size(); i++) {
            ids.add(roles.get(i).getId());
        }
        map.put("roleIds",ids);
        PageHelper.startPage(pageNo,pageSize);
        List<SysUser> users= userMapper.findUsersByRoleIds(map);
        for (int i = 0; i < users.size(); i++) {
            SysUser user = users.get(i);
            List<SysRole> list = roleMapper.getRoleByUserId(user.getId());
            user.setRoleList(list);
        }
        return new PageInfo(users);
    }

    //@Cacheable(value = "getUserById")
    public SysUser getUserById(String id) {
        return userMapper.selectByPrimaryKey(id);
    }

    //如果用户删除或者更新了,需要把所有用户相关的缓存干掉!
    //@CacheEvict(value = {"getUserById","findUserListByUserId","getRolesAndChildrenRolesAndCreateByMe"},allEntries = true)
    public JsonContent saveOrUpdate(SysUser user, String roleIds) {

        Integer i ;
        user.setUpdateBy(this.getCurrentSysUser().getId());
        user.setUpdateTime(new Date());
        SysUser olduser = userMapper.selectByUsername(user);
        //添加
        if(StringUtils.isEmpty(user.getId())){
            if (null==user.getPassword()||"".equals(user.getPassword())) {
                return JsonContent.fail("登录密码不能为空!");
            }
            //判断账号是否重复
            if(olduser != null){
                return JsonContent.fail("该账号已经注册!");
            }
            log.info("执行添加数据....");
            user.setId(UUIDUtils.getUUID());
            user.setCreateBy(this.getCurrentSysUser().getId());
            user.setCreateTime(new Date());
            user.setPassword(PasswordUtil.md5(user.getPassword()));
            i =userMapper.insertSelective(user);
        }else{
            if("1".equals(user.getId())){
                return JsonContent.fail("超管是神圣不可侵犯的!!");
            }
            //更新
            log.info("执行添加更新....{}",user.getId());
            SysUser user1=userMapper.selectByPrimaryKey(user.getId());
            if(olduser != null&&!user.getUsername().equals(user1.getUsername())){
                return JsonContent.fail("该账号已经注册!");
            }
            i = userMapper.updateByPrimaryKeySelective(user);
        }


        RoleAndUser rau=new RoleAndUser();
        rau.setUserId(user.getId());
        roleAndUserMapper.delete(rau);
        String ids[] = roleIds.split(",");
        int b =0;
        int a = ids.length;
        if(ids!=null && ids.length>0){
            for (int j = 0; j< ids.length; j++) {
                rau = new RoleAndUser();
                rau.setUserId(user.getId());
                rau.setRoleId(ids[j]);
                rau.setId(UUIDGenerator.getUUID());
                roleAndUserMapper.insertSelective(rau);
                b++;
            }
        }

        if(i>0 && a==b){
            return JsonContent.success("操作成功");
        }
        return JsonContent.fail();
    }


    //@CacheEvict(value = {"getUserById","findUserListByUserId","getRolesAndChildrenRolesAndCreateByMe"},allEntries = true)
    public JsonContent delete(String userId) {
        if("1".equals(userId)){
            return JsonContent.fail("超管是神圣不可侵犯的!!");
        }

        if(userId.equals(this.getCurrentSysUser().getId())){
            return JsonContent.fail("自己不能删除自己的账号!");
        }
        int flag = userMapper.deleteByPrimaryKey(userId);
        RoleAndUser rau = new RoleAndUser();
        rau.setUserId(userId);
        int i = roleAndUserMapper.delete(rau);
        if(i>0 && flag >0){
            return JsonContent.success("删除成功！");
        }
        return JsonContent.fail("删除失败！");
    }

    public JsonContent rePassword(SysUser user) {

        String oldPwd = PasswordUtil.md5(user.getPassword());
        SysUser oldUser = userMapper.selectByUsername(user);
        if(oldUser == null){
            return JsonContent.fail("该用户不存在！");
        }else if(!(oldPwd).equals(oldUser.getPassword())){
            return JsonContent.fail("用户密码不正确！");
        }else{
            user.setNewPassword(PasswordUtil.md5(user.getNewPassword()));
            userMapper.rePassword(user);
        }
        return JsonContent.success("修改成功！");
    }
}
