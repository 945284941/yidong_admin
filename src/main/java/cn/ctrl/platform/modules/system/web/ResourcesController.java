package cn.ctrl.platform.modules.system.web;

import cn.ctrl.framework.common.basic.JsonContent;
import cn.ctrl.platform.component.basic.BaseController;
import cn.ctrl.platform.modules.system.service.ResourcesService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.utils.ZtreeNode;
import cn.ctrl.platform.utils.duanxin.IdentificationService;
import cn.ctrl.platform.utils.duanxin.Token;
import cn.ctrl.platform.utils.httpUtil.HttpUtil;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
   public  final  static String  kaiguanurl = "http://10.19.240.99/openapi/restOauth2Server/access_token";
   public final  static String appid = "20190823027676804";
    public final  static String secret = "34f85ca80ec353d3052b8a2d3973a0c5";

    @GetMapping("uu")
    public String uu(Model model,String id){


        JSONObject jsonObject = new JSONObject();
        jsonObject.put("grant_type","client_credentials");
        jsonObject.put("client_id",appid);
        jsonObject.put("client_secret",secret);


//            jsonObject.put("card_num",sysStaff.getCardnum());

        JSONObject jo =  JSONObject.parseObject(HttpUtil.httpPostWithJson(jsonObject,kaiguanurl));

        System.out.println(jo.get("access_token"));
        return jo.get("access_token").toString();

    }
//    public static void main(String[] baby){
//
//
//
//    JSONObject jsonObject = new JSONObject();
//    jsonObject.put("grant_type","client_credentials");
//    jsonObject.put("client_id",appid);
//    jsonObject.put("client_secret",secret);
//
//
////            jsonObject.put("card_num",sysStaff.getCardnum());
//
//    JSONObject jo =  JSONObject.parseObject(HttpUtil.httpPostWithJson(jsonObject,kaiguanurl));
//
//    System.out.println(jo.get("access_token"));
//
//
//}

    public static  void main(String[] baby){


        StringBuffer requestParam = new StringBuffer();

        String urlPath = "/openapi/httpService/IdentificationService?";
//        String method = "sendSmsInfo";
//        String methodName = urlPath + method;
        //能开接口地址
        requestParam.append("http://10.19.240.99");
        requestParam.append(urlPath);
        requestParam.append("access_token=" + "d77ad9333c0bc8d15adb6e14df3aa494ec248d73");
        requestParam.append("&method=" + "getOrVerifyRandCode");
        requestParam.append("&format=" + "json");
        requestParam.append("&RANDOMCODE=" + "168624");
        requestParam.append("&TELNUM=" + "18763948253");
        requestParam.append("&version=" + "1.0.0");
//        requestParam.append("&SMSCONTENT=" +  StringBuffer requestParam = new StringBuffer();
//
//        String urlPath = "/openapi/httpService/IdentificationService?";
////        String method = "sendSmsInfo";
////        String methodName = urlPath + method;
//        //能开接口地址
//        requestParam.append("http://10.19.240.99");
//        requestParam.append(urlPath);
//        requestParam.append("access_token=" + "d77ad9333c0bc8d15adb6e14df3aa494ec248d73");
//        requestParam.append("&method=" + "getOrVerifyRandCode");
//        requestParam.append("&format=" + "json");
//        requestParam.append("&RANDOMCODE=" + "168624");
//        requestParam.append("&TELNUM=" + "18763948253");
//        requestParam.append("&version=" + "1.0.0");
////        requestParam.append("&SMSCONTENT=" + smsContent);//短信内容
//        String message = HttpUtil.httpPostWithJsonByGet(requestParam.toString())smsContent);//短信内容
        String message = HttpUtil.httpPostWithJsonByGet(requestParam.toString());
        System.out.println(message);
//        StringBuffer url = new StringBuffer();
//



//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("grant_type","client_credentials");
//        jsonObject.put("client_id",appid);
//        jsonObject.put("client_secret",secret);
//
//
////            jsonObject.put("card_num",sysStaff.getCardnum());
//
//        JSONObject jo =  JSONObject.parseObject(HttpUtil.httpPostWithJson(jsonObject,kaiguanurl));
//
//        System.out.println(jo);
    }



    public  String yanzhengma(String token){
        StringBuffer requestParam = new StringBuffer();

        String urlPath = "/openapi/httpService/IdentificationService?";
//        String method = "sendSmsInfo";
//        String methodName = urlPath + method;
        //能开接口地址
//        requestParam.append("http://10.19.240.99");
        requestParam.append("http://10.19.240.86");

        requestParam.append(urlPath);
        requestParam.append("access_token=" + token);
        requestParam.append("&method=" + "getOrVerifyRandCode");
        requestParam.append("&format=" + "json");
        requestParam.append("&TELNUM=" + "18765155509");
        requestParam.append("&version=" + "1.0.0");
//        requestParam.append("&SMSCONTENT=" + smsContent);//短信内容
        String message = HttpUtil.httpPostWithJsonByGet(requestParam.toString());

         JSONObject jsonObject =  JSONObject.parseObject(message);
        String   res_code =  jsonObject.get("res_code")+"";
        return res_code;
    }
    public  void token(HttpServletRequest request){
       String urlPath = "/openapi/restOauth2Server/access_token";
        StringBuffer url = new StringBuffer();
        //能力开放平台地址
        url.append("http://10.19.240.99");
        url.append(urlPath);
        List<NameValuePair> formparams = new ArrayList<NameValuePair>();
        formparams.add(new BasicNameValuePair("grant_type", "client_credentials"));
        //能力开放平台下线配置提供
        formparams.add(new BasicNameValuePair("client_id", "20190823027676804"));
        formparams.add(new BasicNameValuePair("client_secret", "34f85ca80ec353d3052b8a2d3973a0c5"));
        String message = cn.ctrl.platform.utils.duanxin.HttpUtil.httpPost(url.toString(), formparams, "", urlPath, "");
        Token token = (Token) JSONObject.parseObject(message, Token.class);
        System.out.println(token.getAccess_token());
        System.out.println("token==="+token.getAccess_token());
        HttpSession session = request.getSession();
        session.setAttribute("token",token.getAccess_token());
//        return token.getAccess_token();
    }



}
