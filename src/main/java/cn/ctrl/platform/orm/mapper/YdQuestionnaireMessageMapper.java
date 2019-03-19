package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.YdQuestionnaireMessage;

import java.util.List;
import java.util.Map;

public interface YdQuestionnaireMessageMapper extends MyMapper<YdQuestionnaireMessage> {
    int deleteByPrimaryKeyy(String id);

    int insertt(YdQuestionnaireMessage record);

    int insertSelectivee(YdQuestionnaireMessage record);

    YdQuestionnaireMessage selectByPrimaryKeyy(String id);

    int updateByPrimaryKeySelectivee(YdQuestionnaireMessage record);

    int updateByPrimaryKeyy(YdQuestionnaireMessage record);

    YdQuestionnaireMessage findOneByQuestionId(String id);

    List<YdQuestionnaireMessage> findAll(Map map);
}