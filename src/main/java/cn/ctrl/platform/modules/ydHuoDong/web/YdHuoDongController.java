package cn.ctrl.platform.modules.ydHuoDong.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.component.shiro.realm.UserRealm;
import cn.ctrl.platform.modules.system.service.RoleService;
import cn.ctrl.platform.modules.ydBuMen.service.YdBuMenService;
import cn.ctrl.platform.modules.ydDiQu.service.YdDiQuService;
import cn.ctrl.platform.modules.ydHuoDong.service.YdHuoDongService;
import cn.ctrl.platform.modules.ydHuoDongCat.service.YdHuoDongCatService;
import cn.ctrl.platform.modules.ydYuanGong.service.YdYuanGongService;
import cn.ctrl.platform.orm.entity.*;
import cn.ctrl.platform.orm.mapper.YdHuodongYuangongMapper;
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
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cn.ctrl.platform.modules.aliyun.AliyunOSSClientUtil.getFileUrlNew;

/**
 * Created by HuifengWang on 2017/1/17.
 */
@Controller
@RequestMapping("ydHuoDong")
public class YdHuoDongController extends BaseController {

    @Autowired
    YdHuoDongService rechargeService;
    @Autowired
    YdHuoDongCatService ydHuoDongCatService;
    @Autowired
    YdDiQuService ydDiQuService;
    @Autowired
    private RoleService userRealm;
    @Autowired
    private YdBuMenService ydBuMenService;
    @Autowired
    private YdYuanGongService ydYuanGongService;
    @Autowired
    YdHuodongYuangongMapper ydHuodongYuangongMapper;


    @GetMapping("manager")
    public String manager(Model model,String baby){

        model.addAttribute("huodongCat",ydHuoDongCatService.findAllNoPage());
        model.addAttribute("baby",baby);
        return "ydHuoDong/manager";
    }

    @GetMapping("huodongcanyuqingkuang")
    public String huodongcanyuqingkuang(@RequestParam Map map,Model model){

         YdHuodong ydHuodong =  rechargeService.selectOne(map.get("id")+"");

        String diquId = ydHuodong.getDiquId();

        //部门
        map.put("diquId",diquId);
         List<YdBumen> list
                   =  ydBuMenService.findAllNoPage(map);

         if(list == null || list.size() == 0 ){
             model.addAttribute("bili","0");
             model.addAttribute("yuangong","0");
             model.addAttribute("baomingyuangong","0%");
         }else{
             String departmentId = list.get(0).getId();
             //通过活动查看 总人数
             map.put("departmentId",departmentId);

             List<YdYuangong>  yugonglist =
                     ydYuanGongService.findAllNoPage(map);

             map.put("huodongId",map.get("id"));
             List<YdHuodongYuangong> ydHuodongYuangong =
                     ydHuodongYuangongMapper.findAll(map);




             String yuangong  = yugonglist.size()+"";
             String baomingyuangong =    ydHuodongYuangong.size()+"";
             if(yuangong.equals("0") || baomingyuangong.equals("0")){
                 model.addAttribute("bili",0+"%");
             }else{

                 BigDecimal b1 = new BigDecimal(yuangong);
                 BigDecimal b2 = new BigDecimal(baomingyuangong);
                 Double zuihou =
                         b2.divide(b1, 4, BigDecimal.ROUND_HALF_UP).doubleValue();
                 model.addAttribute("bili",zuihou*100+"%");
             }

             model.addAttribute("yuangong",yugonglist.size());
             model.addAttribute("baomingyuangong",ydHuodongYuangong.size());
         }

        return "ydHuoDong/formtongji";
    }


    @GetMapping("table")
    public String table(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize ){

        try {
            if (userRealm.getRole().getId().equals("1")) {
                //超级管理员
            } else {
                map.put("diquId", userRealm.getRole().getDepartmentId());
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        PageInfo goods = rechargeService.findAll(map,pageNo,pageSize);
        model.addAttribute("recharge",goods);
        return "ydHuoDong/table";
    }

    @GetMapping("lookPeople")
    public String lookPeople(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize ){
        map.put("huodongId",map.get("id").toString());

        PageInfo goods = rechargeService.findAllPeople(map,pageNo,pageSize);
        model.addAttribute("recharge",goods);
        model.addAttribute("id",map.get("id").toString());
        return "ydHuoDong/lookPeople";
    }
    @GetMapping("insert")
    public String add(Model model,String baby){
        YdHuodong classification =new YdHuodong();
        model.addAttribute("recharge",classification);
        model.addAttribute("baby",baby);
        model.addAttribute("diquId",userRealm.getRole().getDepartmentId());
        model.addAttribute("roleId",userRealm.getRole().getId());
        model.addAttribute("huodongCat",ydHuoDongCatService.findAllNoPage());
        model.addAttribute("diqu",ydDiQuService.findAllNoPage());
        return "ydHuoDong/form";
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, YdHuodong recharge){
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


     return JsonContent.success(url);
 }

    @GetMapping("edit")
    public String edit(Model model,String id){
        model.addAttribute("roleId",userRealm.getRole().getId());
        YdHuodong recharge = rechargeService.selectOne(id);
        model.addAttribute("huodongCat",ydHuoDongCatService.findAllNoPage());
        model.addAttribute("diqu",ydDiQuService.findAllNoPage());
        model.addAttribute("recharge",recharge);
      return "ydHuoDong/form";
    }

    @GetMapping("shenhe")
    public String shenhe(Model model,String id){
        YdHuodong recharge = rechargeService.selectOne(id);
        model.addAttribute("recharge",recharge);
        return "ydHuoDong/shenhe";
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
