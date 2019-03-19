package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdBumen;

import java.util.List;
import java.util.Map;

public interface YdBumenMapper extends MyMapper<YdBumen> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdBumen record);

    int insertSelectivee(YdBumen record);

    YdBumen selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdBumen record);

    int updateByPrimaryKeyWithBLOBss(YdBumen record);

    int updateByPrimaryKeyy(YdBumen record);

    List<YdBumen> findAll(Map map);
}