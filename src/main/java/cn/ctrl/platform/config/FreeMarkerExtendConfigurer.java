package cn.ctrl.platform.config;
import cn.ctrl.framework.shiro.tags.ShiroTags;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.servlet.MultipartConfigElement;

/**
 * Created by HuifengWang on 2017/1/12.
 */

//扩展freemarker支持shiro标签
@org.springframework.context.annotation.Configuration
public class FreeMarkerExtendConfigurer{
    @Autowired
    private FreeMarkerConfigurer freeMarkerConfigurer;
    @Bean
    public Configuration getFreemarkerConfiguration(){
        Configuration cft = freeMarkerConfigurer.getConfiguration();
        cft.setSharedVariable("shiro", new ShiroTags());
        cft.setNumberFormat("0.######");
        return cft;
    }

    /**
     * 文件上传配置
     * @return
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        //文件最大
        factory.setMaxFileSize("10240MB"); //KB,MB
        return factory.createMultipartConfig();
    }
}
