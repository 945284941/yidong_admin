package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.Zhuanhui;

import java.util.List;
import java.util.Map;

public interface ZhuanhuiMapper extends MyMapper<Zhuanhui> {
    int insertt(Zhuanhui record);

    int insertSelectivee(Zhuanhui record);

    Zhuanhui selectByPrimaryKeyy(String id);

    int  deleteByPrimaryKeyy(String  id);

    int updateByPrimaryKeySelectivee(Zhuanhui zhuanhui);

    List<Zhuanhui> findAll(Map map);

    void updateLook();
}