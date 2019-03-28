package cn.ctrl.platform.modules.ydQuestionnaireMessageProprietor.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.YdQuestionnaire;
import cn.ctrl.platform.orm.entity.YdQuestionnaireMessageProprietor;
import cn.ctrl.platform.orm.mapper.YdQuestionnaireMapper;
import cn.ctrl.platform.orm.mapper.YdQuestionnaireMessageMapper;
import cn.ctrl.platform.orm.mapper.YdQuestionnaireMessageProprietorMapper;
import cn.ctrl.platform.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by HuifengWang on 2016/12/26.
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class YdQuestionnaireMessageProprietorService extends BaseService {


    @Autowired
    YdQuestionnaireMessageProprietorMapper ydQuestionnaireMessageProprietorMapper;


    /**
     * 查询当前用户所拥有的权限所能看到的user用户
     *
     * @return
     */
    //@Cacheable(value ="findUserListByUserId")
    public PageInfo findAll(Map map, Integer pageNo, Integer pageSize) {

        if (pageNo == null || pageNo <= 0) pageNo = 1;
        if (pageSize == null || pageSize <= 0 || pageSize >= 500) pageSize = 10;

        PageHelper.startPage(pageNo, pageSize);

        List<YdQuestionnaireMessageProprietor> goodsList =
                ydQuestionnaireMessageProprietorMapper.findAllByPage(map);

        return new PageInfo(goodsList);
    }


    public YdQuestionnaireMessageProprietor  selectOne(String id) {

        YdQuestionnaireMessageProprietor goods = ydQuestionnaireMessageProprietorMapper.selectByPrimaryKeyy(id);

        return goods;
    }
    public JsonContent delete(String id){
        if(ydQuestionnaireMessageProprietorMapper.deleteByPrimaryKeyy(id) > 0){
           return JsonContent.success("删除成功");
        }else{
            return JsonContent.fail("删除失败");
        }
    }

    public int addGoods(YdQuestionnaireMessageProprietor equipment, Map<String, Object> map) {


         if(equipment.getId() == null || equipment.getId().equals("")){
             equipment.setId(UUIDUtils.getUUID());


//            if(rechargeMapper.insertSelectivee(equipment) > 0){
//                YdQuestionnaireMessage ydQuestionnaireMessage  = new YdQuestionnaireMessage();
//                ydQuestionnaireMessage.setId(UUIDUtils.getUUID());
//                ydQuestionnaireMessage.setA(equipment.getA());
//                ydQuestionnaireMessage.setB(equipment.getB());
//                ydQuestionnaireMessage.setC(equipment.getC());
//                ydQuestionnaireMessage.setQuestionnaireId(equipment.getId());
//                ydQuestionnaireMessage.setQuestion(equipment.getQuestion());
//                ydQuestionnaireMessage.setChooseType(equipment.getChooseType());
//                ydQuestionnaireMessage.setSortNum(Integer.parseInt(equipment.getSortNum()));
//                ydQuestionnaireMessage.setCreateTime(new Date());
//                return  ydQuestionnaireMessageMapper.insertSelectivee(ydQuestionnaireMessage);
//             }else{
//                return 0;
//            }
            return ydQuestionnaireMessageProprietorMapper.insertSelectivee(equipment);
         }else{

//             if(rechargeMapper.updateByPrimaryKeySelectivee(equipment) > 0){
//                 YdQuestionnaireMessage ydQuestionnaireMessage  = new YdQuestionnaireMessage();
//                 //g根据id查询id
//                 ydQuestionnaireMessage.setId(ydQuestionnaireMessageMapper.findOneByQuestionId(equipment.getId()).getId());
//                 ydQuestionnaireMessage.setA(equipment.getA());
//                 ydQuestionnaireMessage.setB(equipment.getB());
//                 ydQuestionnaireMessage.setC(equipment.getC());
//                 ydQuestionnaireMessage.setQuestionnaireId(equipment.getId());
//                 ydQuestionnaireMessage.setQuestion(equipment.getQuestion());
//                 ydQuestionnaireMessage.setChooseType(equipment.getChooseType());
//                 ydQuestionnaireMessage.setSortNum(Integer.parseInt(equipment.getSortNum()));
//                 ydQuestionnaireMessage.setCreateTime(new Date());
//                 return  ydQuestionnaireMessageMapper.updateByPrimaryKeySelectivee(ydQuestionnaireMessage);
//             }else{
//                 return 0;
//             }
           return ydQuestionnaireMessageProprietorMapper.updateByPrimaryKeySelectivee(equipment);

         }
    }


    public List<YdQuestionnaireMessageProprietor> findAllNoPage(){
        return ydQuestionnaireMessageProprietorMapper.findAllByPage(new HashMap());
    }

}
