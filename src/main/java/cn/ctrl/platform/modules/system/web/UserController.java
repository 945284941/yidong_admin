package cn.ctrl.platform.modules.system.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.system.service.UserService;
import cn.ctrl.platform.orm.entity.SysRole;
import cn.ctrl.platform.orm.entity.SysUser;
import cn.ctrl.platform.utils.ZtreeNode;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by HuifengWang on 2017/1/17.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController {

    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;

    @GetMapping("manager")
    public String manager(){
        return "system/user/manager";
    }

    @GetMapping("table")
    public String table(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize ){
        PageInfo users = userService.findUserListByUserId(map,pageNo,pageSize);
        model.addAttribute("users",users);
        return "system/user/table";
    }
    @GetMapping("edit")
    public String edit(String id,Model model){
        SysUser user = userService.getUserById(id);
        List<SysRole> roleList = new ArrayList<SysRole>();
        if(user!= null){
            roleList = roleService.getRolesByUser(user.getId());
        }
        model.addAttribute("roleList",roleList);
        model.addAttribute("user",user);
        return "system/user/form";
    }

    @GetMapping("insert")
    public String add(Model model){
        SysUser user =new SysUser();
        model.addAttribute("user",user);
        return "system/user/form";
    }

    @PostMapping("saveOrUpdate")
    @ResponseBody
    public JsonContent saveOrUpdate(HttpServletRequest request, SysUser user){
        String roleIds=request.getParameter("roleIds");
        return userService.saveOrUpdate(user,roleIds);
    }

    @PostMapping("delete")
    @ResponseBody
    public JsonContent delete(String id){
        return userService.delete(id);
    }

    @PostMapping("ztree")
    @ResponseBody
    public JsonContent rolesZtree(String userId){
        List<SysRole> all = roleService.getRolesAndChildrenRolesAndCreateByMe(this.getCurrentSysUser().getId(),false);
        List<SysRole> select = roleService.getRolesByUser(userId);
        List<ZtreeNode> nodes= ZtreeNode.changeZtreeNode(all,select);
        return JsonContent.success().addParam("ztree",nodes);
    }

    @GetMapping("repassword")
    public String passwordChange(){
        return "system/user/passwordChange";
    }

   @RequestMapping("savePassword")
   @ResponseBody
    public JsonContent savePassword(HttpServletRequest request,SysUser user){

        return userService.rePassword(user);
    }
}
