package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdHuodong;
import cn.ctrl.platform.orm.entity.YdQuestionnaire;

import java.util.List;
import java.util.Map;

public interface YdHuodongMapper  extends MyMapper<YdHuodong> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdHuodong record);

    int insertSelectivee(YdHuodong record);

    YdHuodong selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdHuodong record);

    int updateByPrimaryKeyy(YdHuodong record);

    List<YdHuodong> findAll(Map map);
    List<YdHuodong> findTongjiByQuYu();
}