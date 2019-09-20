package cn.ctrl.platform.modules.ydYuanGong.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.ydBuMen.service.YdBuMenService;
import cn.ctrl.platform.modules.ydDiQu.service.YdDiQuService;
import cn.ctrl.platform.modules.ydYuanGong.service.YdYuanGongService;
import cn.ctrl.platform.modules.ydZhiWei.service.YdZhiWeiService;
import cn.ctrl.platform.orm.entity.YdBumen;
import cn.ctrl.platform.orm.entity.YdYuangong;
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
@RequestMapping("ydYuanGong")
public class YdYuanGongController extends BaseController {

    @Autowired
    YdYuanGongService rechargeService;
    @Autowired
    YdZhiWeiService ydZhiWeiService;
    @Autowired
    YdBuMenService ydBuMenService;
    @Autowired
    private RoleService userRealm;

    @GetMapping("manager")
    public String manager(Model model){
        return "ydYuanGong/manager";
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
        return "ydYuanGong/table";
    }


    @GetMapping("insert")
    public String add(Model model){
        YdYuangong classification =new YdYuangong();
        model.addAttribute("recharge",classification);
        Map map = new HashMap();
        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }
         model.addAttribute("diqu",ydBuMenService.findAllNoPage(map));
        model.addAttribute("zhiwei",ydZhiWeiService.findAllNoPage());
        return "ydYuanGong/form";
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, YdYuangong recharge){

        try{
            if(rechargeService.addGoods(recharge,map) > 0){
                return JsonContent.success("操作成功");
            }else{
                return JsonContent.fail("操作失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            return JsonContent.fail("操作失败");
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
        Map map = new HashMap();
        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }
        YdYuangong recharge = rechargeService.selectOne(id);
        model.addAttribute("diqu",ydBuMenService.findAllNoPage(map));
        model.addAttribute("zhiwei",ydZhiWeiService.findAllNoPage());
        model.addAttribute("recharge",recharge);
      return "ydYuanGong/form";
    }

    @GetMapping("shenhe")
    public String shenhe(Model model,String id){
        Map map = new HashMap();
        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }
        YdYuangong recharge = rechargeService.selectOne(id);
        model.addAttribute("diqu",ydBuMenService.findAllNoPage(map));
        model.addAttribute("zhiwei",ydZhiWeiService.findAllNoPage());
        model.addAttribute("recharge",recharge);
        return "ydYuanGong/shenhe";
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


}
