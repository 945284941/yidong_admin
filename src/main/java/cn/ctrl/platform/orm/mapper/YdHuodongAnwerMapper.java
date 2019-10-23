package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdHuodong;
import cn.ctrl.platform.orm.entity.YdHuodongAnwer;

import java.util.List;
import java.util.Map;

public interface YdHuodongAnwerMapper extends MyMapper<YdHuodong> {

    int insertt(YdHuodongAnwer record);

    int insertSelectivee(YdHuodongAnwer record);

    YdHuodongAnwer selectByPrimaryKeyy(String id);

    int  deleteByPrimaryKeyy(String  id);

    int updateByPrimaryKeySelectivee(YdHuodongAnwer zhuanhui);

    List<YdHuodongAnwer> findAll(Map map);



}