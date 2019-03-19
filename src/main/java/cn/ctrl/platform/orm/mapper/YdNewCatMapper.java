package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdHuodongCat;
import cn.ctrl.platform.orm.entity.YdNewCat;

import java.util.List;
import java.util.Map;

public interface YdNewCatMapper extends MyMapper<YdNewCat> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdNewCat record);

    int insertSelectivee(YdNewCat record);

    YdNewCat selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdNewCat record);

    int updateByPrimaryKeyy(YdNewCat record);

    List<YdNewCat> findAll(Map map);
}