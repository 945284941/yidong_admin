package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdYuangong;

import java.util.List;
import java.util.Map;

public interface YdYuangongMapper extends MyMapper<YdYuangong> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdYuangong record);

    int insertSelectivee(YdYuangong record);

    YdYuangong selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdYuangong record);

    int updateByPrimaryKeyy(YdYuangong record);

    List<YdYuangong> findAll(Map map);
}