package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.Lawyer;

import java.util.List;
import java.util.Map;

public interface LawyerMapper extends MyMapper<Lawyer> {

    int insertt(Lawyer record);

    int insertSelectivee(Lawyer record);

    List<Lawyer> findAll(Map map);

    Lawyer selectByPrimaryKeyy(String id);

    int  deleteByPrimaryKeyy(String id);

    int  updateByPrimaryKeySelectivee(Lawyer lawyer);
}