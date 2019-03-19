package cn.ctrl.platform.orm.mapper;

import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.SysRole;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

public interface SysRoleMapper extends MyMapper<SysRole> {

    /**
     *
     * wanghuifeng
     * @param userId
     * @return
     */
    List<SysRole> getRolesByUserId(String userId);

    /**
     * wanghuifeng
     * 根据父类Role获取孩子节点
     */

    List<SysRole> getSubRolesByParentRole(SysRole parentRole);

    /**
     * wanghuifeng
     * 获取由我创建的角色
     * @param userId
     * @return
     */
    List<SysRole> getRolesCreateByMe(String userId);

    /**
     * zhangya
     * 通过角色名称获取角色
     * @param name
     * @return
     */
    SysRole selectByName(String name);

    List<SysRole> getRoleByUserId(String id);


    List<SysRole> findRoleByUserId(String id);
}