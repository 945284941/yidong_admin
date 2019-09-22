package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.Banner;

import java.util.List;
import java.util.Map;

public interface BannerMapper extends MyMapper<Banner> {
    int deleteByPrimaryKeyy(String id);

    int insertt(Banner record);

    int insertSelectivee(Banner record);

    Banner selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(Banner record);

    int updateByPrimaryKeyy(Banner record);

    List<Banner> findAll(Map map);
}