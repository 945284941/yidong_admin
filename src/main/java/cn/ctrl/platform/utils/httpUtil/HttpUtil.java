package cn.ctrl.platform.utils.httpUtil;


import cn.ctrl.platform.utils.LogUtil;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreConnectionPNames;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

public class HttpUtil {
    public static String httpPostWithJson(JSONObject jsonObject,String url){
        boolean isSuccess = false;

        HttpPost post = null;
        String content = "";
        try {
            HttpClient httpClient = new DefaultHttpClient();


            // 设置超时时间
            httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 10000);
            httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 10000);

            post = new HttpPost(url);
            // 构造消息头
            post.setHeader("Content-type", "application/json; charset=utf-8");
            post.setHeader("Connection", "Close");



            // 构建消息实体
            StringEntity entity = new StringEntity(jsonObject.toString(), Charset.forName("UTF-8"));
            entity.setContentEncoding("UTF-8");
            // 发送Json格式的数据请求
            entity.setContentType("application/json");
            entity.setContentEncoding("UTF-8");
            // 发送Json格式的数据请求

            post.setEntity(entity);

            HttpResponse response = httpClient.execute(post);



            // 检验返回码
            int statusCode = response.getStatusLine().getStatusCode();
            if(statusCode != HttpStatus.SC_OK){
                LogUtil.info("请求出错: "+statusCode);
                isSuccess = false;
            }else{
                BufferedReader in ;
                in = new BufferedReader(new InputStreamReader(response.getEntity()
                        .getContent()));
                StringBuffer sb = new StringBuffer("");
                String line = "";
                String NL = System.getProperty("line.separator");
                while ((line = in.readLine()) != null) {
                    sb.append(line + NL);
                }
                in.close();
                 content = sb.toString();
                // 返回码中包含retCode及会话Id
                for(Header header : response.getAllHeaders()){

                }


            }
        } catch (Exception e) {
            e.printStackTrace();
            isSuccess = false;
        }finally{
            if(post != null){
                try {
                    post.releaseConnection();
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        return content;
    }

    public static String httpPostWithJsonByGet(String url){
        boolean isSuccess = false;

        HttpGet post = null;
        String content = "";
        try {
            HttpClient httpClient = new DefaultHttpClient();

            // 设置超时时间
            httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 2000);
            httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 2000);

            post = new HttpGet(url);
            // 构造消息头
            post.setHeader("Content-type", "application/json; charset=utf-8");
            post.setHeader("Connection", "Close");



            // 构建消息实体
//            StringEntity entity = new StringEntity();
//            entity.setContentEncoding("UTF-8");
//            // 发送Json格式的数据请求
//            entity.setContentType("application/json");
//            entity.setContentEncoding("UTF-8");
            // 发送Json格式的数据请求



            HttpResponse response = httpClient.execute(post);

            // 检验返回码
            int statusCode = response.getStatusLine().getStatusCode();
            if(statusCode != HttpStatus.SC_OK){
                LogUtil.info("请求出错: "+statusCode);
                isSuccess = false;
            }else{
                BufferedReader in ;
                in = new BufferedReader(new InputStreamReader(response.getEntity()
                        .getContent()));
                StringBuffer sb = new StringBuffer("");
                String line = "";
                String NL = System.getProperty("line.separator");
                while ((line = in.readLine()) != null) {
                    sb.append(line + NL);
                }
                in.close();
                content = sb.toString();
                // 返回码中包含retCode及会话Id
                for(Header header : response.getAllHeaders()){

                }


            }
        } catch (Exception e) {
            e.printStackTrace();
            isSuccess = false;
        }finally{
            if(post != null){
                try {
                    post.releaseConnection();
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        return content;
    }

    public static  void  main(String[] baby) {
        int[] array = new int[]{1,2,3,4};
        int searchKey = 2;
        int low = 0;
        int high = array.length - 1;
        while (low <= high) {
            int middle = (low + high) / 2;
            if (searchKey == array[middle]) {

                System.out.println(middle);
            } else if (searchKey < array[middle]) {
                high = middle - 1;
            } else {
                low = middle + 1;
            }
        }

    }
}
