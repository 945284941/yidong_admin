package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.Visits;

public interface VisitsMapper extends MyMapper<Visits> {
    int insertt(Visits record);

    int insertSelectivee(Visits record);


    int  dangri(Visits vi);


}