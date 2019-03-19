package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdZhiwei;

import java.util.List;
import java.util.Map;

public interface YdZhiweiMapper extends MyMapper<YdZhiwei> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdZhiwei record);

    int insertSelectivee(YdZhiwei record);

    YdZhiwei selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdZhiwei record);

    int updateByPrimaryKeyy(YdZhiwei record);

    List<YdZhiwei> findAll(Map map);
}