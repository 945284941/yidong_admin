package cn.ctrl.platform.orm.mapper;

import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.SysUser;

import java.util.List;
import java.util.Map;

public interface SysUserMapper extends MyMapper<SysUser> {
    boolean isExist(SysUser user);

    SysUser selectByUsername(SysUser user);

    void rePassword(SysUser user);

    /**
     * wanghuifeng
     * 根据角色查询用户列表
     * @return
     */
    List<SysUser> findUsersByRoleIds(Map map);

    List searchByParam(Map<String, String> map);
}