package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdHuodongYuangong;

import java.util.List;
import java.util.Map;

public interface YdHuodongYuangongMapper  extends MyMapper<YdHuodongYuangong> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdHuodongYuangong record);

    int insertSelectivee(YdHuodongYuangong record);

    YdHuodongYuangong selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdHuodongYuangong record);

    int updateByPrimaryKeyy(YdHuodongYuangong record);

    List<YdHuodongYuangong> findAll(Map map);
}