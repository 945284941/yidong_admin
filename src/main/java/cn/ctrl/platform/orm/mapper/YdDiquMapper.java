package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdDiqu;

import java.util.List;
import java.util.Map;

public interface YdDiquMapper extends MyMapper<YdDiqu> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdDiqu record);

    int insertSelectivee(YdDiqu record);

    YdDiqu selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdDiqu record);

    int updateByPrimaryKeyy(YdDiqu record);

    List<YdDiqu> findAll(Map map);
}