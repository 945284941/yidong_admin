package cn.ctrl.platform.modules.ydNews.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.component.shiro.realm.UserRealm;
import cn.ctrl.platform.modules.cmpp.TestMain;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.ydDiQu.service.YdDiQuService;
import cn.ctrl.platform.modules.ydNewCat.service.YdNewCatService;
import cn.ctrl.platform.modules.ydNews.service.YdNewsService;
import cn.ctrl.platform.orm.entity.YdNewCat;
import cn.ctrl.platform.orm.entity.YdNews;
import cn.ctrl.platform.orm.entity.YdZhiwei;
import cn.ctrl.platform.orm.mapper.YdNewsMapper;
import com.github.pagehelper.PageInfo;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cn.ctrl.platform.modules.aliyun.AliyunOSSClientUtil.getFileUrlNew;

/**
 * Created by HuifengWang on 2017/1/17.
 */
@Controller
@RequestMapping("ydNews")
public class YdNewsController extends BaseController {

    @Autowired
    YdNewsService rechargeService;
    @Autowired
    YdDiQuService ydDiQuService;
    @Autowired
    private RoleService userRealm;
    @Autowired
    YdNewCatService ydNewCatService;
    @Autowired
    YdNewsMapper ydNewsMapper;

    @GetMapping("manager")
    public String manager(Model model){
        return "ydNews/manager";
    }
    @GetMapping("shanxingmanager")
    public String shanxingmanager(Model model){
        return "shanxingtongji/manager";
    }

    @GetMapping("shenhemanager")
    public String shenhemanager(Model model){
        return "ydNews/shenhemanager";
    }
    @GetMapping("table")
    public String table(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize ){

        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }

        PageInfo goods = rechargeService.findAll(map,pageNo,pageSize);
        model.addAttribute("recharge",goods);
        return "ydNews/table";
    }


    @GetMapping("shenhe")
    public String shenhe(Model model,String id){

     YdNews ydNews =  rechargeService.selectOne(id);
       model.addAttribute("news",ydNews);
        return "ydNews/form";
    }
    @GetMapping("insert")
    public String add(Model model){
        YdZhiwei classification =new YdZhiwei();
        model.addAttribute("recharge",classification);
        model.addAttribute("roleId",userRealm.getRole().getId());
//        model.addAttribute("diquId",userRealm.getRole().getDepartmentId());
//        model.addAttribute("diqu", ydDiQuService.findAllNoPage());
        return "ydNews/form";
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, YdNews recharge){

        if(!userRealm.getRole().getId().equals("1")){
            recharge.setDiquId(userRealm.getRole().getDepartmentId());
        }
       if(rechargeService.addGoods(recharge,map) > 0){
           return JsonContent.success("操作成功");
       }else{
           return JsonContent.fail("操作成功");
       }

    }


    @PostMapping("delete")
    @ResponseBody
    public JsonContent delete(String id){
        return rechargeService.delete(id);
    }
 @RequestMapping("imgSave")
 @ResponseBody
 public JsonContent imgSave(@RequestParam("file") MultipartFile file)  {

     String url = getFileUrlNew(file);
     String a = "0";

     return JsonContent.success(url);
 }

    @GetMapping("edit")
    public String edit(Model model,String id){

        YdNews recharge = rechargeService.selectOne(id);
        model.addAttribute("roleId",userRealm.getRole().getId());

//        model.addAttribute("diqu", ydDiQuService.findAllNoPage());
        model.addAttribute("recharge",recharge);
      return "ydNews/form";
    }

    @PostMapping("imgF")
    @ResponseBody
    public Map imgF(MultipartHttpServletRequest request,
                    HttpServletResponse response) throws IOException {
        Map map = new HashMap();
        List<MultipartFile> files = request.getFiles("imgFile");


        /*    System.out.println(f);*/
        if(files == null || files.size() == 0){
            return JsonContent.fail("文件为空上传失败");
        }else{
            MultipartFile file = files.get(0);
            String url = getFileUrlNew(file);
            map.put("url",url);
            map.put("message",url);
            map.put("error", 0);
        }
        return  map;
    }


    //新闻分类统计图

    @RequestMapping("tongjiNewCat")
    @ResponseBody
    public Map tongjiNewCat(@RequestParam Map map){

//        List<YdNewCat> newCats = ydNewCatService.findAllNoPage();

          YdNewCat ydNewCat = ydNewCatService.selectOne(map.get("catId")+"");




            map.put("name", ydNewCat.getName());

            map.put("value",ydNewsMapper.findTongjiByQuYu(map));


        return map;

    }

}
