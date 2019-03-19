package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdHuodongCat;


import java.util.List;
import java.util.Map;

public interface YdHuodongCatMapper extends MyMapper<YdHuodongCat> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdHuodongCat record);

    int insertSelectivee(YdHuodongCat record);

    YdHuodongCat selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdHuodongCat record);

    int updateByPrimaryKeyy(YdHuodongCat record);

    List<YdHuodongCat> findAll(Map map);
}