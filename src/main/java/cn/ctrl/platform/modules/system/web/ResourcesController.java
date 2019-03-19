package cn.ctrl.platform.modules.system.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.utils.ZtreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by HuifengWang on 2017/1/5.
 */
@Controller
@RequestMapping("resources")
public class ResourcesController extends BaseController {

    @Autowired
    ResourcesService resourcesService;

    @RequestMapping("manager")
    public String manager(Model model){
        List<SysResources> resourcesList = resourcesService.getResourcesByUser(this.getCurrentSysUser().getId(),true);
  /*      model.addAttribute("resTree",resourcesList);*/
        return "system/resources/manager";
    }

    @GetMapping("treetable")
    public String treetable(Model model ){
        List<SysResources> list = resourcesService.getAllResources(false);
        model.addAttribute("resList",list);
        return "system/resources/treeTable";
    }

    //执行修改
    @PostMapping("saveOrUpdate")
    @ResponseBody
    public JsonContent saveOrUpdate(SysResources res, HttpServletRequest request){
        return resourcesService.saveOrUpdate(res);
    }
    //添加
    @GetMapping("insert")
    public String insert(Model model,String id){
        SysResources resources = new SysResources();
        if(id != null && !("").equals(id)){
            resources = resourcesService.getResourcesNameById(id);
        }
        model.addAttribute("res",resources);
       // model.addAttribute("resTree",new ArrayList<>());
        return "system/resources/form";
    }

    //编辑
    @GetMapping("edit")
    public String edit(Model model,String id){
        SysResources resources = resourcesService.getResourcesById(id);
        model.addAttribute("res",resources);
        return "system/resources/form";
    }

    @PostMapping("delete")
    @ResponseBody
    public JsonContent delete(String id){
        return resourcesService.delete(id);
    }

    @PostMapping("ztree")
    @ResponseBody
    public JsonContent ztree(){
        List<SysResources> all = resourcesService.getAllResources(true);

        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(all,null);
        return JsonContent.success().addParam("ztree",nodes);
    }
}
