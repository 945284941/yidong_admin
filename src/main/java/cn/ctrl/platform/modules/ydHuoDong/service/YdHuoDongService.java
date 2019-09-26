package cn.ctrl.platform.modules.ydHuoDong.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.YdHuodong;
import cn.ctrl.platform.orm.entity.YdHuodongCat;
import cn.ctrl.platform.orm.entity.YdHuodongYuangong;
import cn.ctrl.platform.orm.mapper.YdHuodongCatMapper;
import cn.ctrl.platform.orm.mapper.YdHuodongMapper;
import cn.ctrl.platform.orm.mapper.YdHuodongYuangongMapper;
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
public class YdHuoDongService extends BaseService {

    @Autowired
    YdHuodongMapper rechargeMapper;
    @Autowired
    YdHuodongYuangongMapper ydHuodongYuangongMapper;


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

        List<YdHuodong> goodsList = rechargeMapper.findAll(map);

        return new PageInfo(goodsList);
    }
    public PageInfo findAllPeople(Map map, Integer pageNo, Integer pageSize) {

        if (pageNo == null || pageNo <= 0) pageNo = 1;
        if (pageSize == null || pageSize <= 0 || pageSize >= 500) pageSize = 10;

        PageHelper.startPage(pageNo, pageSize);

        List<YdHuodongYuangong> goodsList = ydHuodongYuangongMapper.findAll(map);

        return new PageInfo(goodsList);
    }


    public YdHuodong  selectOne(String id) {

        YdHuodong goods = rechargeMapper.selectByPrimaryKeyy(id);

        return goods;
    }
    public JsonContent delete(String id){
        if(rechargeMapper.deleteByPrimaryKeyy(id) > 0){
           return JsonContent.success("删除成功");
        }else{
            return JsonContent.fail("删除失败");
        }
    }

    public int addGoods(YdHuodong equipment, Map<String, Object> map) {


         if(equipment.getId() == null || equipment.getId().equals("")){
             equipment.setId(UUIDUtils.getUUID());
             equipment.setCreateTime(new Date());
             equipment.setCreateId(this.getCurrentSysUser().getId());
             if(equipment.getBaby().equals("1")){
                 equipment.setCheckStatus("1");
             }else{
//                 equipment.setCheckStatus("0");
             }
             return rechargeMapper.insertSelectivee(equipment);
         }else{
             return rechargeMapper.updateByPrimaryKeySelectivee(equipment);
         }
    }


    public List<YdHuodong> findAllNoPage(){
        return rechargeMapper.findAll(new HashMap());
    }

}
