package cn.ctrl.platform.modules.ydNews.service;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.YdNews;
import cn.ctrl.platform.orm.entity.YdZhiwei;
import cn.ctrl.platform.orm.mapper.YdNewsMapper;
import cn.ctrl.platform.orm.mapper.YdZhiweiMapper;
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
public class YdNewsService extends BaseService {

    @Autowired
    YdNewsMapper rechargeMapper;



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

        List<YdNews> goodsList = rechargeMapper.findAll(map);

        return new PageInfo(goodsList);
    }


    public YdNews  selectOne(String id) {

        YdNews goods = rechargeMapper.selectByPrimaryKeyy(id);

        return goods;
    }
    public JsonContent delete(String id){
        if(rechargeMapper.deleteByPrimaryKeyy(id) > 0){
           return JsonContent.success("删除成功");
        }else{
            return JsonContent.fail("删除失败");
        }
    }

    public int addGoods(YdNews equipment, Map<String, Object> map) {


         if(equipment.getId() == null || equipment.getId().equals("")){
             equipment.setId(UUIDUtils.getUUID());
             equipment.setCreateTime(new Date());
             equipment.setState("0");
            equipment.setCreateBy(this.getCurrentSysUser().getId());
             return rechargeMapper.insertSelectivee(equipment);
         }else{
             return rechargeMapper.updateByPrimaryKeySelectivee(equipment);
         }
    }


    public List<YdNews> findAllNoPage(){
        return rechargeMapper.findAll(new HashMap());
    }

}
