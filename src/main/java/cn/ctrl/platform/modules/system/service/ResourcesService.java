package cn.ctrl.platform.modules.system.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.framework.common.utils.TreeDataUtil;
import cn.ctrl.framework.common.utils.UUIDGenerator;
import cn.ctrl.framework.common.utils.UtilsBean;
import cn.ctrl.framework.common.utils.UtilsJson;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.RoleAndResources;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.mapper.RoleAndResourcesMapper;
import cn.ctrl.platform.orm.mapper.SysResourcesMapper;
import cn.ctrl.platform.orm.mapper.SysRoleMapper;
import cn.ctrl.platform.orm.mapper.SysUserMapper;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by HuifengWang on 2017/1/4.
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class ResourcesService extends BaseService {

    @Autowired
    SysResourcesMapper resourcesMapper;
    @Autowired
    SysUserMapper userMapper;
    @Autowired
    SysRoleMapper roleMapper;
    @Autowired
    RoleAndResourcesMapper roleAndResourcesMapper;

    /**
     * wanghuifeng
     * @param roleId
     * @param isTreeShow
     * @return
     */
    //@Cacheable(value = "getResourcesByRoleId")
    public List<SysResources> getResourcesByRoleId(String roleId, Boolean isTreeShow){
        //如果是超管,返回所有资源
        if("1".equals(roleId)){
            List<SysResources> all = resourcesMapper.queryAll();
            //是否树形组合
            if (isTreeShow) {
                return showTree(all);
            }
            return all;
        }
        String[] roles= new String[]{roleId};
        List<SysResources> list =resourcesMapper.findResourcesByRoleId(roles);
        //是否树形组合
        if (isTreeShow) {
            return showTree(list);
        }
        return list;
    }


    /**
     * wanghuifeng
     * 根据用户ID获取,获取该用户所有的资源列表
     * @param userId
     * @param isTreeShow
     * @return
     */
    //@Cacheable(value = "getResourcesByUser")
    public List<SysResources> getResourcesByUser(String userId, Boolean isTreeShow) {
        //如果是超管,返回所有资源
        if("1".equals(userId)){
            List<SysResources> all = resourcesMapper.queryAll();
            //是否树形组合
            if (isTreeShow) {
                return showTree(all);
            }
            return all;
        }
        List<SysRole> roles = roleMapper.getRolesByUserId(userId);
        String[] roleIds = new String[roles.size()];
        for (int i = 0; i < roles.size(); i++) {
            roleIds[i] = roles.get(i).getId();
        }
        List<SysResources> list = resourcesMapper.findResourcesByRoleId(roleIds);
        //是否树形组合
        if (isTreeShow) {
            return showTree(list);
        }
        return list;
    }


    /**
     * wanghuifeng
     * 获取用户可用按钮
     * @param userId
     * @return
     */
    //@Cacheable(value = "getMenuTreeByUser")
    public List<SysResources> getMenuTreeByUser(String userId) {
        List<SysResources> resourcesList;
        //如果是超管,返回所有资源
        if("1".equals(userId)){
            resourcesList = resourcesMapper.queryAll();
        }else{
            resourcesList = this.getResourcesByUser(userId, false);
        }
        if (resourcesList != null && resourcesList.size() > 0) {
            List<Map<String, Object>> tree = Lists.newArrayList();
            for (int i = 0; i < resourcesList.size(); i++) {
                SysResources resources = resourcesList.get(i);
                if (!"1".equals(resources.getType())) continue; //如果type为1
                tree.add(UtilsBean.toMap(resourcesList.get(i)));
            }
            List<Map<String, Object>> newTree = TreeDataUtil.getTreeData(tree, "id", "pid", "sub", false);
            return UtilsJson.toList(UtilsJson.toJson(newTree), SysResources.class);
        }
        return null;
    }

    /**
     * wanghuifeng
     * 更新资源,如果资源变更,需要把所有跟角色相关的缓存干掉!!
     * @param res
     * @return
     */
    //添加或者更新
    //@CacheEvict(value = {"getResourcesByRoleId","getResourcesByUser","getMenuTreeByUser"})
    public JsonContent saveOrUpdate(SysResources res) {
        Integer i;

        //添加
        if (res.getId() == null || ("").equals(res.getId())) {
            //判断模块名称和路径重复
            SysResources oldRes = resourcesMapper.selectByName(res);
            if(oldRes != null){
                return JsonContent.fail("资源名称重复，请重新检查！");
            }else{
                if(res.getUrl() != null && !("").equals(res.getUrl())){
                    oldRes = resourcesMapper.selectByUrl(res.getUrl());
                    if(oldRes != null){
                        return JsonContent.fail("资源路径重复，请重新检查！");
                    }
                }
            }
            log.info("执行添加数据....");
            res.setId(UUIDGenerator.getUUID());
            res.setCreateBy(this.getCurrentSysUser().getId());
            res.setCreateTime(new Date());
            res.setPtree(res.getPid()+","+res.getId());
            res.setDeep(res.getDeep()+1);
            i = resourcesMapper.insertSelective(res);
        } else {
            SysResources parent = resourcesMapper.selectByPrimaryKey(res.getPid());
            if(parent != null){
                if(res.getId().equals(res.getPid())||res.getId().equals(parent.getPid())){
                    return JsonContent.fail("父类不能与本身相同且不能成环状关系！");
                }
            }

            //更新
            log.info("执行添加数据....{}", res.getId());
            res.setUpdateBy(this.getCurrentSysUser().getId());
            res.setUpdateTime(new Date());
            res.setPtree(res.getPid()+","+res.getId());
            res.setDeep(res.getDeep()+1);
            i = resourcesMapper.updateByPrimaryKeySelective(res);
        }
        if (i > 0) {
            return JsonContent.success("操作成功");
        }
        return JsonContent.fail();
    }

    private List<SysResources> showTree(List<SysResources> list){
        if (list != null && list.size() > 0) {
            List<Map<String, Object>> tree = Lists.newArrayList();
            for (int i = 0; i < list.size(); i++) {
                tree.add(UtilsBean.toMap(list.get(i)));
            }
            List<Map<String, Object>> newTree = TreeDataUtil.getTreeData(tree, "id", "pid", "sub", false);
            return UtilsJson.toList(UtilsJson.toJson(newTree), SysResources.class);
        } else {
            return null;
        }
    }

    /**
     * 获取所有的菜单资源,仅用于资源管理
     * isMenu : 是否只显示菜单
     * @return
     */
    public List<SysResources> getAllResources(Boolean isMenu) {
        if(isMenu){
            List<SysResources> resourcesList = resourcesMapper.selectAllMenuResources();
            return resourcesList;
        }
        List<SysResources> resourcesList = resourcesMapper.queryAll();
        return showTree(resourcesList);
    }

    /**
     * 删除业务逻辑
     * @param id
     * @return
     */
    public JsonContent delete(String id) {
        //需要判断是否有下级
        SysResources sysResources = new SysResources();
        sysResources.setPid(id);
        List temp =resourcesMapper.select(sysResources);
        if(temp!=null && temp.size()>0){
            return JsonContent.fail("该资源有下级资源,禁止删除!");
        }
        //如果该该资源已经被分配了,需要删除被分配的连接
        RoleAndResources rar = new RoleAndResources();
        rar.setResourcesId(id);
        List<RoleAndResources> temp2= roleAndResourcesMapper.selectWithRoleName(rar);
        if(temp2!=null && temp2.size()>0){
            StringBuffer roles = new StringBuffer();
            for (int i = 0; i < temp2.size(); i++) {
                roles.append(temp2.get(i).getRoleName());
            }
            return JsonContent.fail("该资源已经被角色["+roles.toString()+"]分配,不能删除");
        }
        int i = resourcesMapper.deleteByPrimaryKey(id);
        if(i>0){
            return JsonContent.success("删除成功!");
        }
        return  JsonContent.fail("删除失败!");
    }

    /**
     * 根据主键查询
     * @param resId
     * @return
     */
    public SysResources getResourcesById(String resId) {
        SysResources resources= resourcesMapper.selectByPrimaryKey(resId);
        if(resources!=null && StringUtils.isNotBlank(resources.getPid())){
            SysResources presources = resourcesMapper.selectByPrimaryKey(resources.getPid());
            resources.setParentResources(presources);
        }
        return resources;
    }

    /**
     * 添加 下级 获取 上级模块
     * @param resId
     * @return
     */
    public SysResources getResourcesNameById(String resId) {
        SysResources resources= new SysResources();

        SysResources presources = resourcesMapper.selectByPrimaryKey(resId);
        resources.setParentResources(presources);

        return resources;
    }
}
