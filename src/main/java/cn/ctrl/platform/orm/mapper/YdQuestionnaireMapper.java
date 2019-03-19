package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdQuestionnaire;

import java.util.List;
import java.util.Map;

public interface YdQuestionnaireMapper extends MyMapper<YdQuestionnaire> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdQuestionnaire record);

    int insertSelectivee(YdQuestionnaire record);

    YdQuestionnaire selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdQuestionnaire record);

    int updateByPrimaryKeyy(YdQuestionnaire record);

    List<YdQuestionnaire> findAll(Map map);

    List<YdQuestionnaire> findTongjiByQuYu();
}