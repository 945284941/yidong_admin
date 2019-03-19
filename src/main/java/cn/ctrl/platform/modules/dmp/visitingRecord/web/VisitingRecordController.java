package cn.ctrl.platform.modules.dmp.visitingRecord.web;

import cn.ctrl.framework.common.utils.UUIDGenerator;
import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.VisitingRecord;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.dmp.visitingRecord.service.VisitingRecordService;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

/**
 * Created by HuifengWang on 2017/1/12.
 */
@Controller
@RequestMapping("visitingRecord")
public class VisitingRecordController extends BaseController{

    @Autowired
    private VisitingRecordService visitingRecordService;
    @Autowired
    private ResourcesService resourcesService;
    @Resource
    private VisitingRecordService ssvisitingRecordService;

    private static VisitingRecordController visitingRecordController;



    /**
     * 来访记录
     * @param model
     * @return
     */
    //@RequiresPermissions("/visitingRecord/manager")
    @RequestMapping("manager")
    public String manager(Model model){
        return "dmp/visitingRecord/visitingRecord";
    }

    @RequestMapping("gainRecordList")
    public String gainRecordList(Model model,@RequestParam Map map,
                                 @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                                 @RequestParam(value = "pageSize", defaultValue = "10") int pageSize){
        PageInfo list = visitingRecordService.gainList(pageNo, pageSize,map);
        model.addAttribute("pageInfo",list);
        return "dmp/visitingRecord/visitingList";
    }


    public  void insert(String url,String userId){
        System.out.println(url+":"+userId);
        visitingRecordController.ssvisitingRecordService.addRecord(url,userId);
    }

    /**
     * 构造方法执行后调用 init()
     */
    @PostConstruct
    public void init() {
        System.out.println("I'm  init  method  using  @PostConstrut....");

        visitingRecordController = this;
        visitingRecordController.ssvisitingRecordService = this.ssvisitingRecordService;

    }

    /**
     *  servlet销毁前调用dostory()
     */
    @PreDestroy
    public void  dostory(){
        System.out.println("I'm  destory method  using  @PreDestroy.....");
    }

    public void setVisitingRecordService(VisitingRecordService visitingRecordService) {
        this.visitingRecordService = visitingRecordService;
    }

}