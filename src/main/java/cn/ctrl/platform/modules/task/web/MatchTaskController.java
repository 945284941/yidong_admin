package cn.ctrl.platform.modules.task.web;

import cn.ctrl.platform.component.basic.BaseController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2018/7/7.
 */
@Slf4j
@Controller
@RequestMapping("trade")
public class MatchTaskController extends BaseController {

//    @Autowired
//    TradeService tradeService;
//    @Autowired
//    KDictService kDictService;
//    /**
//     * 定时匹配订单
//     */
//    @Scheduled(cron= "0 0 9 * * ?")
//    public void matchAllOrder()  {
//        //查询是否自动匹配 is_open_tim
//        List<KDict> kDictList = kDictService.gainType("is_open_tim");
//        if("1".equals(kDictList.get(0).getdValue())){
//            log.info("定时匹配开始---------");
//            tradeService.taskPipei();
//            log.info("定时匹配结束---------");
//        }else{
//            log.info("定时匹配被关闭了，不进行定时匹配---------");
//        }
//
//
//    }
//    /**
//     * 定时匹配订单
//     */
//    @Scheduled(cron= "0 0 22 * * ?")
//    public void disMemberByOrder()  {
//        //匹配成功的订单 超过6小时未打款的用户全部冻结
//        tradeService.toChuli6Nopay();
//
//    }
}
