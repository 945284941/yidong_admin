package cn.ctrl.platform.utils;


import cn.ctrl.platform.component.qiniu.RemoteFileService;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by HuifengWang on 16/5/4.
 */
public class UtilsUpload {
    /**
     * 通过远程请求的64Byte加密的字符串获取文件
     * @param data
     * @return
     */
    public static String uploadImgByStringData(String data){
        ByteArrayInputStream is = null;
        try {
            is = new ByteArrayInputStream(data.getBytes("ISO-8859-1"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return  uploadImg(is,"remote/pic.jpg",true);
    }


    /**
     * 上传一个MultipartFile
     * @param file
     * @return
     */
    public static String uploadImgByMultipartFile(MultipartFile file, boolean isRemote){
        try {
            return uploadImg(file.getInputStream(),file.getOriginalFilename(),isRemote);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }


    public static String upload(MultipartFile file , String name) throws IOException {
        String newUrl = "";
        String url = "G:\\work\\baby";
         String oldName = file.getOriginalFilename();
                String prefix=oldName.substring(oldName.lastIndexOf(".")+1);
           SimpleDateFormat s = new SimpleDateFormat("yyyyMMddHHmmss");
           String a=  s.format(new Date());
           String newName = a+"."+prefix;
         File f = new File(url);
           if(!f.exists()){
               f.mkdirs();
           }
        byte[] buffer =  file.getBytes();
        BufferedOutputStream buffStream =
                new BufferedOutputStream(new FileOutputStream(
                        new File(url+File.separator+newName)));
        buffStream.write(buffer);
        buffStream.close();
        return url+File.separator+newName;
    }

    /**
     * 默认上传到image文件夹下面
     * @param inputStream 要上传的文件流
     * @param remotePath 要上传到七牛的路径以及文件名  example: product/img.jpg
     * @param isRemote 是否远程云端存储
     * @return
     */
    public static String uploadImg(InputStream inputStream, String remotePath, boolean isRemote){
        RemoteFileService remoteFileService = UtilsSpringContext.getBean(RemoteFileService.class);
        String path ="";
        try {
            path = remoteFileService.upload(inputStream,remotePath,"image",isRemote);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

    /**
     * 默认上传到file文件夹下面
     * @param inputStream 要上传的文件流
     * @param remotePath 要上传到七牛的路径以及文件名  example: product/img.jpg
     * @param isRemote 是否远程云端存储
     * @return
     */
    public static String uploadFile(InputStream inputStream, String remotePath, boolean isRemote){
        RemoteFileService remoteFileService = UtilsSpringContext.getBean(RemoteFileService.class);
        String path ="";
        try {
            path = remoteFileService.upload(inputStream,remotePath,"file",isRemote);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

    public static void main(String[] baby){
        String i = "微信图片_20180706140321.jpg";
        String prefix=i.substring(i.lastIndexOf(".")+1);

            System.out.println(prefix);


    }
}
