package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdQuestionnaireMessageProprietor;

import java.util.List;
import java.util.Map;

public interface YdQuestionnaireMessageProprietorMapper extends MyMapper<YdQuestionnaireMessageProprietor> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdQuestionnaireMessageProprietor record);

    int insertSelectivee(YdQuestionnaireMessageProprietor record);

    YdQuestionnaireMessageProprietor selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdQuestionnaireMessageProprietor record);

    int updateByPrimaryKeyy(YdQuestionnaireMessageProprietor record);

    Long findAll(Map map);

    List<YdQuestionnaireMessageProprietor> findAllByPage(Map map);
}