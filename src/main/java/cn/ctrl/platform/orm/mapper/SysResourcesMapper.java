package cn.ctrl.platform.orm.mapper;

import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.SysResources;

import java.util.List;
import java.util.Map;

public interface SysResourcesMapper extends MyMapper<SysResources> {
    List<SysResources> findResourcesByRoleId(String[] roleId);

    List<SysResources> selectAllMenuResources();

    SysResources selectByUrl(String url);

    /**
     * 通过名称查询模块（用于判断模块名称重复）
     * @param res
     * @return
     */
    SysResources selectByName(SysResources res);

    List<SysResources> queryAll();
}