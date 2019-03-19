package cn.ctrl.platform.modules.login.web;

import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.component.basic.Constants;

import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.ydDiQu.service.YdDiQuService;
import cn.ctrl.platform.modules.ydHuoDong.service.YdHuoDongService;
import cn.ctrl.platform.modules.ydNewCat.service.YdNewCatService;
import cn.ctrl.platform.modules.ydQuestionnaire.service.YdQuestionnaireService;
import cn.ctrl.platform.modules.ydYuanGong.service.YdYuanGongService;
import cn.ctrl.platform.orm.entity.*;
import cn.ctrl.platform.orm.mapper.*;
import cn.ctrl.platform.utils.ActionEnter;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by HuifengWang on 2016/12/20.
 */
@Slf4j
@Controller
public class LoginController extends BaseController{

    @Autowired
    ResourcesService resourcesService;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    YdDiQuService ydDiQuService;
    @Autowired
    YdNewCatService ydNewCatService;
    @Autowired
    YdNewsMapper ydNewsMapper;
    @Autowired
    YdQuestionnaireService ydQuestionnaireService;
    @Autowired
    YdHuoDongService ydHuodongMapper;
    @Autowired
    YdHuodongMapper ydHuodongMapperr;
    @Autowired
    YdYuanGongService ydYuangongMapper;
    @Autowired
    YdQuestionnaireMapper ydQuestionnaireMapper;





    @Autowired
    private RoleService userRealm;
    @GetMapping("login")
    public String login(HttpServletRequest request){
        //清除用户登陆的错误信息
        Subject security = SecurityUtils.getSubject();
        if (security.isAuthenticated()) {
            request.getSession().removeAttribute(Constants.LOGIN_ERROR_MSG);
            return "redirect:/";
        }
        return "login";
    }

    @PostMapping("login")
    public String doLogin(){
        return "redirect:/";
    }

    @RequestMapping("logout")
    public String logout(HttpSession session){
        SecurityUtils.getSubject().logout();
        return "redirect:/login";
    }

    @RequestMapping(value = "login",params = "error")
    public String loginError(){
        return "login";
    }


    @RequestMapping(value="config")
    public void config(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json");
        String rootPath = request.getSession().getServletContext().getRealPath("/");
        try {
            String exec = new ActionEnter(request, rootPath).exec();
            PrintWriter writer = response.getWriter();
            writer.write(exec);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    /**
     * 首页
     * @return
     */
    @RequestMapping("/")
    public String index(Model model){
        SysUser user =this.getCurrentSysUser();
        List<SysResources> list = resourcesService.getMenuTreeByUser(user.getId());
        model.addAttribute("tree",list);
        return "system/index";
    }

    @RequestMapping("index")
    public String indexInfo(Model model){
        Map map = new HashMap();
        //----------------人

        //-------------产品



        //新闻
       model.addAttribute("news",ydNewsMapper.findAllCount(new HashMap()));
        //活动
        int questionNum = 0;
        if(ydQuestionnaireService.findAllNoPage()  == null){

        }else{
            questionNum =  ydQuestionnaireService.findAllNoPage().size();
        }
        model.addAttribute("questionNum", questionNum );
        int activity = 0;
        if(ydHuodongMapper.findAllNoPage()  == null){

        }else{
            activity =  ydHuodongMapper.findAllNoPage().size();
        }
        //答题
        model.addAttribute("activity",activity);

        //人员

        int yuangong = 0;
        if(ydYuangongMapper.findAllNoPage()  == null){

        }else{
            yuangong =  ydYuangongMapper.findAllNoPage().size();
        }
        model.addAttribute("yugong",yuangong);

        return "system/component/content";
    }

    @RequestMapping("baby")
    public String baby(Model model,String id){
        Map map = new HashMap();
        //----------------人

        //-------------产品

        if(id == null ){
            model.addAttribute("recharge",new YdNews());
        }else{
            model.addAttribute("recharge",ydNewsMapper.selectByPrimaryKeyy(id));
        }
        model.addAttribute("roleId",userRealm.getRole().getId());
        model.addAttribute("newCats",ydNewCatService.findAllNoPage());
        model.addAttribute("diquId",userRealm.getRole().getDepartmentId());
        model.addAttribute("diqu", ydDiQuService.findAllNoPage());
        return "ydNews/vip";
    }

    @RequestMapping("babyTongji")
    @ResponseBody
    public Map babyTongji(){

        //区域新闻
        List<YdNews> list = ydNewsMapper.findTongjiByQuYu();


        //区域调查问卷


        List<YdQuestionnaire> qlist  = ydQuestionnaireMapper.findTongjiByQuYu();


        List<YdHuodong> dlist = ydHuodongMapperr.findTongjiByQuYu();

        Map map = new HashMap();
        map.put("new",list);
        map.put("question",qlist);
        map.put("huodong",dlist);
        return map;
    }
    @RequestMapping("hello")
    public String hello(){

        return "system/component/content";
    }
}
