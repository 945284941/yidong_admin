package cn.ctrl.platform.modules.system.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.framework.common.utils.TreeDataUtil;
import cn.ctrl.framework.common.utils.UUIDGenerator;
import cn.ctrl.framework.common.utils.UtilsBean;
import cn.ctrl.framework.common.utils.UtilsJson;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.component.basic.Constants;
import cn.ctrl.platform.orm.entity.RoleAndResources;
import cn.ctrl.platform.orm.entity.RoleAndUser;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.entity.SysUser;
import cn.ctrl.platform.orm.mapper.RoleAndResourcesMapper;
import cn.ctrl.platform.orm.mapper.RoleAndUserMapper;
import cn.ctrl.platform.orm.mapper.SysRoleMapper;
import com.alibaba.druid.util.StringUtils;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by HuifengWang on 2016/12/26.
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class RoleService extends BaseService {
    @Autowired
    RoleAndUserMapper roleAndUserMapper;
    @Autowired
    SysRoleMapper roleMapper;
    @Autowired
    RoleAndResourcesMapper roleAndResourcesMapper;

    public SysRole getRole(){
        SysUser user  = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(Constants.SESSION_INFO);
        String userId = user.getId();

        List<SysRole> list = roleMapper.findRoleByUserId(userId);
        return list.get(0);
    }

    /**
     * wanghuifeng
     * 根据用户获取用户的角色列表
     * @param userId
     * @return
     */
    //@Cacheable(value = "getRolesByUser")
    public List<SysRole> getRolesByUser(String userId) {
        List<SysRole> list = roleMapper.getRolesByUserId(userId);
        return list;
    }

    /**
     * wanghuifeng
     * 获取我所拥有的角色,以及我所有用角色的下级角色,还有我创建的角色
     * @param userId
     * @return
     */
    //@Cacheable(value = "getRolesAndChildrenRolesAndCreateByMe")
    public List<SysRole> getRolesAndChildrenRolesAndCreateByMe(String userId, Boolean isShowTree){
        //如果登陆的账号是超级管理员,返回所有角色!
        if(!StringUtils.isEmpty(userId) && "1".equals(userId)){
            List<SysRole> all = roleMapper.selectAll();
            if(isShowTree){
                return showTree(all);
            }
            return all;
        }
        //-------其他角色--------
        //step1:获取我所拥有的角色
        List<SysRole> list = roleMapper.getRolesByUserId(userId);
        //step2，获取我创建的角色
        List<SysRole> creatByMe  = roleMapper.getRolesCreateByMe(userId);
        //整合我创建的角色
        list.addAll(creatByMe);
        //通过set清洗重复数据
        Set<SysRole> result = new HashSet<>();
        List<SysRole> temp = Lists.newArrayList();
        for (int i = 0; i < list.size(); i++) {
            //step3:获取该角色的孩子角色
            SysRole parentRole = list.get(i);
            List<SysRole> subRoles = roleMapper.getSubRolesByParentRole(parentRole);
            if(subRoles!=null && subRoles.size()>0){
                for (int j = 0; j < subRoles.size(); j++) {
                    SysRole child = subRoles.get(j);
                    result.add(child);
                }
            }
            result.add(parentRole);
        }
        temp.addAll(result);
        if(isShowTree){
            return showTree(temp);
        }
        return temp;
    }

    /**
     * wanghuifeng
     * 添加或者更新,如果角色变更,需要把所有跟角色相关的用户的缓存全部干掉!
     * @param role
     * @return
     */
    //@CacheEvict(value = {"findUserListByUserId","getRolesByUser","getRolesAndChildrenRolesAndCreateByMe","getRoleById"},allEntries = true)
    public JsonContent saveOrUpdate(SysRole role, String resIds) {
        Integer i ;
        role.setUpdateBy(this.getCurrentSysUser().getId());
        role.setUpdateTime(new Date());
        String ids[] = resIds.split(",");

        //添加
        if(StringUtils.isEmpty(role.getId())){
            //判断角色名称重复
            SysRole oldrole = roleMapper.selectByName(role.getName());
            if(oldrole != null){
                return JsonContent.fail("该角色已经被注册！");
            }

            SysRole parent = roleMapper.selectByPrimaryKey(role.getPid());
            log.info("执行添加数据....");
            role.setId(UUIDGenerator.getUUID());
            role.setCreateBy(this.getCurrentSysUser().getId());
            role.setCreateTime(new Date());
            role.setPtree(parent.getPtree()+role.getId()+",");
            i =roleMapper.insertSelective(role);
        }else{
            SysRole parent = roleMapper.selectByPrimaryKey(role.getPid());
            if(role.getId().equals(role.getPid())||role.getId().equals(parent.getPid())){
                return JsonContent.fail("父类不能与本身相同且不能成环状关系！");
            }
            role.setPtree(parent.getPtree()+role.getId()+",");
            //更新
            log.info("执行更新....{}",role.getId());
            i = roleMapper.updateByPrimaryKeySelective(role);

            //如果角色的资源删除了某个资源,孩子节点的角色里面该资源也应该删除!
            //获取原有角色的资源列表,比对现在的角色列表,查看原有的比现在的少的数据
            RoleAndResources rar=new RoleAndResources();
            rar.setRoleId(role.getId());
            List<RoleAndResources> roleAndResourcesList = roleAndResourcesMapper.select(rar);
            List<String> oldIds = Lists.newArrayList();
            for (int j = 0; j < roleAndResourcesList.size(); j++) {
                oldIds.add(roleAndResourcesList.get(j).getResourcesId());
            }
            //如果oldIds 跟redIds 对比,其中少了数据,需要把少的数据拿出来,然后更新
            List<String> newIds = Lists.newArrayList();
            for (int j = 0; j < ids.length; j++) {
                newIds.add(ids[j]);
            }
            //取交集
            newIds.retainAll(oldIds);

            if(newIds.size()<oldIds.size()){
                oldIds.removeAll(newIds);
                List<String> delIds = oldIds;
                //获取所有的孩子节点
                List<SysRole> subRoles = roleMapper.getSubRolesByParentRole(role);
                for (int j = 0; j < subRoles.size(); j++) {
                    for (int k = 0; k < delIds.size(); k++) {
                        RoleAndResources roleAndResources = new RoleAndResources();
                        roleAndResources.setRoleId(subRoles.get(j).getId());
                        roleAndResources.setResourcesId(delIds.get(k));
                        roleAndResourcesMapper.delete(roleAndResources);
                    }
                }
            }
        }

        RoleAndResources rar=new RoleAndResources();
        rar.setRoleId(role.getId());
        roleAndResourcesMapper.delete(rar);
        int b =0;
        int a = ids.length;
        if(ids!=null && ids.length>0){
            for (int j = 0; j< ids.length; j++) {
                rar = new RoleAndResources();
                rar.setRoleId(role.getId());
                rar.setResourcesId(ids[j]);
                rar.setId(UUIDGenerator.getUUID());
                roleAndResourcesMapper.insertSelective(rar);
                b++;
            }
        }



        if(i>0 && a==b){
            return JsonContent.success("操作成功");
        }
        return JsonContent.fail();
    }

    /**
     * wanghufieng
     * 根据ID获取角色信息
     * @param id
     * @return
     */
    //@Cacheable(value = "getRoleById")
    public SysRole getRoleById(String id) {
        SysRole role = roleMapper.selectByPrimaryKey(id);
        if(!role.getPid().equals("0")){
            SysRole parentRole = roleMapper.selectByPrimaryKey(role.getPid());
            role.setParentRole(parentRole);
        }
        return role;
    }

    /**
     * 根据ID删除角色,如果角色变更,需要把所有的跟角色相关的缓存干掉
     * @param id
     * @return
     */
    //@CacheEvict(value = {"findUserListByUserId","getRolesByUser","getRolesAndChildrenRolesAndCreateByMe","getRoleById"},allEntries = true)
    public JsonContent delete(String id) {
        //查询该角色是否分配，如果分配，所有拥有该角色的人是否全都失去关联？
        //如果该角色已经被分配，无法删除
        //如果该角色已经有下级角色，无法删除

        //判断是否有下级
        SysRole parent =  roleMapper.selectByPrimaryKey(id);
        List<SysRole> subRoles =roleMapper.getSubRolesByParentRole(parent);
        if(subRoles!=null &&subRoles.size()>1){
            return JsonContent.fail("该角色有下级，无法删除！");
        }
        RoleAndUser roleAndUser  = new RoleAndUser();
        roleAndUser.setRoleId(id);
        List<RoleAndUser> roleAndUsers = roleAndUserMapper.select(roleAndUser);

        if(roleAndUsers!=null &&roleAndUsers.size()>0){
            return JsonContent.fail("该角色已经被分配，无法删除！");
        }
        int i =roleMapper.deleteByPrimaryKey(id);
        RoleAndResources rar = new RoleAndResources();
        rar.setResourcesId(id);
        int j = roleAndResourcesMapper.delete(rar);
        if(i>0){
            return JsonContent.success("删除成功！");
        }
        return JsonContent.fail("删除失败！");
    }


    private List<SysRole> showTree(List<SysRole> list){
        if (list != null && list.size() > 0) {
            List<Map<String, Object>> tree = Lists.newArrayList();
            for (int i = 0; i < list.size(); i++) {
                tree.add(UtilsBean.toMap(list.get(i)));
            }
            List<Map<String, Object>> newTree = TreeDataUtil.getTreeData(tree, "id", "pid", "sub", false);
            return UtilsJson.toList(UtilsJson.toJson(newTree), SysRole.class);
        } else {
            return null;
        }
    }
}
