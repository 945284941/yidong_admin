package cn.ctrl.platform.modules.ydQuestionaireMessage.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.ydDiQu.service.YdDiQuService;
import cn.ctrl.platform.modules.ydQuestionaireMessage.YdQuestionaireMessageService;
import cn.ctrl.platform.orm.entity.*;
import cn.ctrl.platform.orm.mapper.YdQuestionnaireMessageProprietorMapper;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cn.ctrl.platform.modules.aliyun.AliyunOSSClientUtil.getFileUrlNew;

/**
 * Created by HuifengWang on 2017/1/17.
 */
@Controller
@RequestMapping("ydQuestionnaireMessage")
public class YdQuestionaireMessageController extends BaseController {

    @Autowired
    YdQuestionaireMessageService rechargeService;
    @Autowired
    YdQuestionnaireMessageProprietorMapper ydQuestionnaireMessageProprietorMapper;

    @GetMapping("manager")
    public String manager(Model model,String id) {
        model.addAttribute("id",id);
        return "ydQuestionnaire/messagemanager";
    }

    @GetMapping("table")
    public String table(Model model,@RequestParam Map map,@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize ){
        PageInfo goods = rechargeService.findAll(map,pageNo,pageSize);
        model.addAttribute("recharge",goods);
        model.addAttribute("id",map.get("questionnaireId"));
        return "ydQuestionnaire/messagetable";
    }


    @GetMapping("insert")
    public String add(Model model,String id){
        YdQuestionnaireMessage classification =new YdQuestionnaireMessage();
        model.addAttribute("recharge",classification);
        model.addAttribute("id",id);

        return "ydQuestionnaire/messageform";
    }
    @PostMapping("save")
    @ResponseBody
    public JsonContent save(@RequestParam Map  map, HttpServletRequest request, YdQuestionnaireMessage recharge){

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

        YdQuestionnaireMessage recharge = rechargeService.selectOne(id);
        model.addAttribute("id",recharge.getQuestionnaireId());
        model.addAttribute("recharge",recharge);
      return "ydQuestionnaire/messageform";
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

    @RequestMapping(value="tongji")
    public String tongji(Model model,String id){
        model.addAttribute("id",id);

        return "ydQuestionnaire/tongji";
    }
    @GetMapping("findTongji")
    @ResponseBody
    public List<YdNewCat> findTongji(String id){

        Map map = new HashMap();
        map.put("questionnaireMessageId",id);
        map.put("a","1");
        Long a =  ydQuestionnaireMessageProprietorMapper.findAll(map);

         map= new HashMap();
        map.put("questionnaireMessageId",id);
        map.put("b","1");

        Long b =  ydQuestionnaireMessageProprietorMapper.findAll(map);
        map = new HashMap();
        map.put("questionnaireMessageId",id);
        map.put("c","1");
        Long c =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("d","1");
        Long d =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("e","1");
        Long e =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("f","1");
        Long f =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("g","1");
        Long g =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("h","1");
        Long h =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("i","1");
        Long ii =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("j","1");
        Long j =  ydQuestionnaireMessageProprietorMapper.findAll(map);

        map.put("questionnaireMessageId",id);
        map.put("k","1");
        Long k =  ydQuestionnaireMessageProprietorMapper.findAll(map);


        //a的结果
        List<YdNewCat> ydNewCats = new ArrayList<>();
        for (int  i =0 ; i <11 ;i++){
            YdNewCat ydNews = new YdNewCat();

            if(i == 0){
                ydNews.setName("a");
                ydNews.setDisabled(a+"");
            }
            if(i == 1){
                ydNews.setName("b");
                ydNews.setDisabled(b+"");
            }

            if(i == 2){
                ydNews.setName("c");
                ydNews.setDisabled(c+"");
            }

            if(i == 3){
                ydNews.setName("d");
                ydNews.setDisabled(d+"");
            }

            if(i == 4){
                ydNews.setName("e");
                ydNews.setDisabled(e+"");
            }

            if(i == 5){
                ydNews.setName("f");
                ydNews.setDisabled(f+"");
            }

            if(i == 6){
                ydNews.setName("g");
                ydNews.setDisabled(g+"");
            }

            if(i == 7){
                ydNews.setName("h");
                ydNews.setDisabled(h+"");
            }

            if(i == 8){
                ydNews.setName("i");
                ydNews.setDisabled(ii+"");
            }

            if(i == 9){
                ydNews.setName("j");
                ydNews.setDisabled(j+"");
            }

            if(i == 10){
                ydNews.setName("k");
                ydNews.setDisabled(k+"");
            }


            ydNewCats.add(ydNews);
        }
        return ydNewCats;

    }


}
