package cn.ctrl.platform.modules.zhuanhui.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.YdDiqu;
import cn.ctrl.platform.orm.entity.Zhuanhui;
import cn.ctrl.platform.orm.mapper.YdDiquMapper;
import cn.ctrl.platform.orm.mapper.ZhuanhuiMapper;
import cn.ctrl.platform.utils.UUIDUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by HuifengWang on 2016/12/26.
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class ZhuanHuiService extends BaseService {

    @Autowired
    ZhuanhuiMapper rechargeMapper;


    public void updateLook(){
        rechargeMapper.updateLook();
    }

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

        List<Zhuanhui> goodsList = rechargeMapper.findAll(map);

        return new PageInfo(goodsList);
    }


    public List<Zhuanhui> findAllNoPage(Map map){

        return rechargeMapper.findAll(map);
    }

    public Zhuanhui  selectOne(String id) {

        Zhuanhui goods = rechargeMapper.selectByPrimaryKeyy(id);

        return goods;
    }
    public JsonContent delete(String id){
        if(rechargeMapper.deleteByPrimaryKeyy(id) > 0){
           return JsonContent.success("删除成功");
        }else{
            return JsonContent.fail("删除失败");
        }
    }

    public int addGoods(Zhuanhui equipment, Map<String, Object> map) {


         if(equipment.getId() == null || equipment.getId().equals("")){
             equipment.setId(UUIDUtils.getUUID());

//             equipment.setCreateBy(this.getCurrentSysUser().getId());
             return rechargeMapper.insertSelectivee(equipment);
         }else{
             return rechargeMapper.updateByPrimaryKeySelectivee(equipment);
         }
    }


    public List<Zhuanhui> findAllNoPage(){
        return rechargeMapper.findAll(new HashMap());
    }

}
