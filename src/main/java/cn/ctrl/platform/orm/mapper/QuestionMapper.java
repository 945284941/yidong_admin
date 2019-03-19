package cn.ctrl.platform.orm.mapper;



import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.Question;

import java.util.List;
import java.util.Map;

public interface QuestionMapper extends MyMapper<Question> {
    int insertt(Question record);

    int insertSelectivee(Question record);


    List<Question> findAll(Map map);

    Question selectByPrimaryKeyy(String id);

    int  deleteByPrimaryKeyy(String id);

    int  updateByPrimaryKeySelectivee(Question lawyer);
}