package cn.ctrl.platform.modules.lawyer.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.lawyer.service.LawyerService;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.ydBuMen.service.YdBuMenService;
import cn.ctrl.platform.modules.ydZhiWei.service.YdZhiWeiService;
import cn.ctrl.platform.orm.entity.Lawyer;
import cn.ctrl.platform.orm.entity.YdYuangong;
import cn.ctrl.platform.orm.mapper.YdDiquMapper;
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
@RequestMapping("lawyer")
public class LawyerController extends BaseController {

    @Autowired
    LawyerService rechargeService;
    @Autowired
    YdZhiWeiService ydZhiWeiService;
    @Autowired
    YdBuMenService ydBuMenService;
    @Autowired
    private RoleService userRealm;
    @Autowired
    private YdDiquMapper ydDiquMapper;


    @GetMapping("manager")
    public String manager(Model model){
        return "lawyer/manager";
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
        return "lawyer/table";
    }


    @GetMapping("insert")
    public String add(Model model){
        Lawyer classification =new Lawyer();
        model.addAttribute("recharge",classification);
        Map map = new HashMap();
        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }
         model.addAttribute("diqu",ydDiquMapper.findAll(new HashMap()));

        return "lawyer/form";
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, Lawyer recharge){

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
        Map map = new HashMap();
        if(userRealm.getRole().getId().equals("1")){
            //超级管理员
        }else{
            map.put("diquId",userRealm.getRole().getDepartmentId());
        }
        Lawyer recharge = rechargeService.selectOne(id);
        model.addAttribute("diqu",ydDiquMapper.findAll(new HashMap()));

        model.addAttribute("recharge",recharge);
      return "lawyer/form";
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
