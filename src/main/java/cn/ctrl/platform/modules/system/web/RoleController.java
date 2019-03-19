package cn.ctrl.platform.modules.system.web;


import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.entity.YdDiqu;
import cn.ctrl.platform.orm.mapper.YdDiquMapper;
import cn.ctrl.platform.utils.ZtreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;


/**
 * Created by HuifengWang on 2017/1/6.
 */
@Controller
@RequestMapping("role")
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;
    @Autowired
    private ResourcesService resourcesService;
    @Autowired
    private YdDiquMapper ydDiquMapper;

    /**
     * 角色列表
     * @param model
     * @return
     */
    @RequestMapping("manager")
    public String manager(Model model){

        return "system/role/manager";
    }

    @RequestMapping("treetable")
    public String loadTreeTable(Model model){
        List<SysRole> list = roleService.getRolesAndChildrenRolesAndCreateByMe(this.getCurrentSysUser().getId(),true);
        model.addAttribute("roleList",list);
        return "system/role/treeTable";
    }

    @PostMapping("delete")
    @ResponseBody
    public JsonContent delete(String id){
        return roleService.delete(id);
    }

    @PostMapping("saveOrUpdate")
    @ResponseBody
    public JsonContent saveOrUpdate(HttpServletRequest request , SysRole role){
        String resIds =request.getParameter("resIds");
        JsonContent jsonContent=roleService.saveOrUpdate(role,resIds);
        return jsonContent;
    }

    @GetMapping("edit")
    public String edit(String id,Model model){
        SysRole role = roleService.getRoleById(id);
        model.addAttribute("role",role);
        model.addAttribute("departmentId",ydDiquMapper.findAll(new HashMap()));

        return "system/role/edit";
    }

    @GetMapping("insert")
    public String insert(Model model){
        SysRole role = new SysRole();
        model.addAttribute("role",role);
        model.addAttribute("departmentId",ydDiquMapper.findAll(new HashMap()));
        return "system/role/edit";
    }


    @GetMapping("accredit")
    public String accredit(String roleId,String first,Model model){
        SysRole role =roleService.getRoleById(roleId);
        model.addAttribute("role",role);
        model.addAttribute("first",first);
        return "system/role/accredit";
    }

    @PostMapping("accredit/ztree")
    @ResponseBody
    public JsonContent accreditZtree(String roleId){
        //我可分配的所有资源
        //List<SysResources> all = resourcesService.getResourcesByUser(this.getCurrentSysUser().getId(),false);
        //当前角色所有的资源

        //选中的父类的资源
        SysRole self = roleService.getRoleById(roleId);
        SysRole parent = roleService.getRoleById(self.getPid());

        List<SysResources> select = resourcesService.getResourcesByRoleId(roleId,false);
        List<SysResources> parentRes=resourcesService.getResourcesByRoleId(parent.getId(),false);
        //List<SysResources> chkDisabled=new ArrayList<>(all);
        //chkDisabled.removeAll(parentRes);
        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(parentRes,select);
        return JsonContent.success().addParam("ztree",nodes);
    }
    @PostMapping("accredit/ztree/flush")
    @ResponseBody
    public JsonContent accreditZtreeFlush(String roleId){

        //我可分配的所有资源
//        List<SysResources> all = resourcesService.getResourcesByUser(this.getCurrentSysUser().getId(),false);
//        List<SysResources> chkDisabled= new ArrayList<>(all);
//        List<SysResources> select = resourcesService.getResourcesByRoleId(roleId,false);
//        chkDisabled.removeAll(select);
//        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(all,null,chkDisabled);

        List<SysResources> select = resourcesService.getResourcesByRoleId(roleId,false);
        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(select,null);
        return JsonContent.success().addParam("ztree",nodes);
    }

    @PostMapping("ztree")
    @ResponseBody
    public JsonContent rolesZtree(){
        List<SysRole> all = roleService.getRolesAndChildrenRolesAndCreateByMe(this.getCurrentSysUser().getId(),false);

        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(all,null);
        return JsonContent.success().addParam("ztree",nodes);
    }
}
