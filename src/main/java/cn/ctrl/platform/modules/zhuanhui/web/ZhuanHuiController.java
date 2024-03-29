package cn.ctrl.platform.modules.zhuanhui.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.zhuanhui.service.ZhuanHuiService;
import cn.ctrl.platform.orm.entity.YdDiqu;
import cn.ctrl.platform.orm.entity.Zhuanhui;
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
@RequestMapping("zhuanhui")
public class ZhuanHuiController extends BaseController {

    @Autowired
    ZhuanHuiService rechargeService;



    @GetMapping("manager")
    public String manager(Model model){
        return "zhuanhui/manager";
    }

    @GetMapping("table")
    public String table(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "20") int pageSize ){
        PageInfo goods = rechargeService.findAll(map,pageNo,pageSize);
        model.addAttribute("recharge",goods);
        return "zhuanhui/table";
    }



    @GetMapping("insert")
    public String add(Model model){
        Zhuanhui classification =new Zhuanhui();
        model.addAttribute("recharge",classification);
        return "zhuanhui/form";
    }
    @PostMapping("newLook")
    @ResponseBody
    public JsonContent newLook(){
        Map map = new HashMap();
        map.put("look","0");
       List<Zhuanhui> zhuanhuis =
               rechargeService.findAllNoPage(map);
       if(zhuanhuis != null && zhuanhuis.size() > 0){
         return JsonContent.success("有新的转会申请");
       }else{
          return JsonContent.fail("");
       }
    }
    @PostMapping("updateLook")
    @ResponseBody
    public void updateLook(){
           rechargeService.updateLook();
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, Zhuanhui recharge){

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

        Zhuanhui recharge = rechargeService.selectOne(id);

        model.addAttribute("recharge",recharge);
      return "zhuanhui/form";
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
