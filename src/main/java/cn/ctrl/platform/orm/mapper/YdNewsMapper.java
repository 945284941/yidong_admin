package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdNews;

import java.util.List;
import java.util.Map;

public interface YdNewsMapper extends MyMapper<YdNews> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdNews record);

    int insertSelectivee(YdNews record);

    YdNews selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdNews record);

    int updateByPrimaryKeyWithBLOBss(YdNews record);

    int updateByPrimaryKeyy(YdNews record);

    List<YdNews> findAll(Map ydNews);

    Long findAllCount(Map map);

    List<YdNews> findTongjiByQuYu();
}