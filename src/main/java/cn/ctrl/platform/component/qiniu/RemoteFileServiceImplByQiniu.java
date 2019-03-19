package cn.ctrl.platform.component.qiniu;


import cn.ctrl.platform.utils.UUIDUtils;
import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.FileInfo;
import com.qiniu.util.Auth;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.util.Map;


@Component
public class RemoteFileServiceImplByQiniu implements RemoteFileService, InitializingBean {

    private static final Logger log = LoggerFactory.getLogger(RemoteFileServiceImplByQiniu.class);

    // 设置好账号的ACCESS_KEY和SECRET_KEY
    private String accesskey;

    private String secretkey;

    // 要上传的空间
    private String bucketname;

    private String serverurl;

    // 本地保存路径
    private String localurl;

    // 自定义的文件上传位置，存储文件类型和存储文件夹的映射
    private Map<String, String> directoryMap = Maps.newHashMap();

    // 密钥配置
    private Auth auth;

    // 创建上传对象
    private UploadManager uploadManager;

    // bucket管理
    private BucketManager bucketManager;

    @Autowired
    Environment environment;

    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("初始化七牛服务");

        this.accesskey = environment.getProperty("qiniu.accesskey");
        this.secretkey = environment.getProperty("qiniu.secretkey");
        this.bucketname = environment.getProperty("qiniu.bucketname");
        this.serverurl = environment.getProperty("qiniu.serverurl");
        this.localurl = environment.getProperty("qiniu.localurl");
        auth = Auth.create(this.accesskey, this.secretkey);
        //构造一个带指定Zone对象的配置类
        Configuration cfg = new Configuration(Zone.zone2());
        //...其他参数参考类注释
        this.uploadManager  = new UploadManager(cfg);

        this.bucketManager = new BucketManager(auth,cfg);

        log.info("七牛服务配置->" + JSON.toJSONString(this));

    }

    /**
     * 获取上传的token
     * @return
     */
    protected String getUpToken() {
        return auth.uploadToken(bucketname);
    }

    /**
     * 获取文件后缀
     * @param filePath
     * @return
     */
    public String getFilePostfix(String filePath) {
        if (filePath.lastIndexOf(".") > -1) {
            int fileSuffix = filePath.lastIndexOf(".");
            return filePath.substring(fileSuffix);
        }
        return "";
    }

    /**
     * 获取文件目录
     * @param type
     * @return
     */
    public String getFileDirectory(String type) {
        return StringUtils.isBlank(directoryMap.get(type)) ? "" : directoryMap.get(type);
    }

    /**
     * 格式化文件名称
     * @param filePath
     * @return
     */
    public String formatFileName(String filePath) {
        if (filePath.lastIndexOf(".") > -1) {
            int fileSuffix = filePath.lastIndexOf(".");
            int fileNamePrefix = filePath.lastIndexOf("/") == -1 ? (filePath.lastIndexOf("\\") == -1 ? 0 : filePath.lastIndexOf("\\")) : filePath.lastIndexOf("/");
            // 文件名称由uuid和当前时间组成
            filePath = filePath.substring(0, fileNamePrefix) + filePath.substring(fileNamePrefix, fileSuffix)
                    + UUIDUtils.getUUID()+ filePath.substring(fileSuffix);

            return filePath;
        }
        return filePath;
    }

    /**
     * 格式化远程文件
     * @param filePath
     * @return
     */
    public String formateRemoteFile(String filePath, String type) {
        // 构建文件上传路径
        String directory = "image";

        String remoteFilePath = null;
        if (StringUtils.isBlank(directory)) {
            remoteFilePath = "";
        } else {
            remoteFilePath = directory + "/";
        }
        // 构建完整路径
        remoteFilePath += formatFileName(filePath);

        remoteFilePath = remoteFilePath.replaceAll("/+", "/");

        log.info("上传文件路径->" + remoteFilePath);

        // 替换多余的文件分隔符
        return remoteFilePath;
    }

    public String upload(InputStream inputStream, String fileName, String type, boolean isLocal) throws Exception {
        byte[] bytes = FileCopyUtils.copyToByteArray(inputStream);
        String remoteFilePath = formateRemoteFile(fileName, type);
        BufferedOutputStream outputStream = null;
        if (isLocal) {
            String localPath = System.getProperty("catalina.home") + localurl;
            if (remoteFilePath.contains("/")) {
                localPath += remoteFilePath.substring(0, remoteFilePath.lastIndexOf("/"));
            }
            File file = new File(localPath);
            if (!file.exists() && !file.isDirectory()) {
                file.mkdirs();
            }

            file = new File(localPath + remoteFilePath.substring(remoteFilePath.lastIndexOf("/")==-1?0:remoteFilePath.lastIndexOf("/"),remoteFilePath.length()));
            outputStream = new BufferedOutputStream(new FileOutputStream(file));
            outputStream.write(bytes);
        }
        // 获取远程文件名称
        try {
            // 调用put方法上传
            Response response = uploadManager.put(bytes, remoteFilePath, getUpToken());
            // 上传成功返回文件路径
            if (response.isOK()) {
                return serverurl+"/"+remoteFilePath;
            } else {
                throw new QiniuException(response);
            }
        } catch (QiniuException e) {
            e.printStackTrace();
        } finally {
            if (null != outputStream) {
                outputStream.flush();
                outputStream.close();
            }
        }
        return null;
    }

    public String downloadURL(String filepath) throws IOException {
        boolean flag = isExist(filepath);
        String downloadRUL = null;
        if (flag) {
            downloadRUL = auth.privateDownloadUrl(getRemoteFileUrl(filepath), 1800);
            log.info(filepath + " 下载地址 " + downloadRUL);
        }

        return downloadRUL;
    }

    public boolean delete(String filepath) {
        boolean flag = false;
        try {
            bucketManager.delete(bucketname, filepath);
        } catch (Exception e) {
            flag = false;
        }
        return flag;
    }

    public String getRemoteFileUrl(String filepath) {
        return this.serverurl + "/" + filepath;
    }

    public boolean isExist(String filepath) {
        FileInfo fileInfo = null;

        try {
            fileInfo = bucketManager.stat(bucketname, filepath);
        } catch (Exception e) {
        }

        if (fileInfo != null) {
            log.info(filepath + "信息为：" + JSON.toJSONString(fileInfo));
        }

        return fileInfo != null;
    }
}
