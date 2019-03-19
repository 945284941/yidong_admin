package cn.ctrl.platform.orm.mapper;

import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.RoleAndResources;

import java.util.List;

public interface RoleAndResourcesMapper extends MyMapper<RoleAndResources> {
    List selectWithRoleName(RoleAndResources rar);
}