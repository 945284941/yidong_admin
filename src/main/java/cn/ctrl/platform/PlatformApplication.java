package cn.ctrl.platform;

import cn.ctrl.framework.common.exception.ServiceResponseHandler;
import cn.ctrl.platform.component.basic.Constants;
import cn.ctrl.platform.component.basic.MyMapper;
import com.google.code.kaptcha.servlet.KaptchaServlet;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletException;

@SpringBootApplication
@MapperScan(basePackages = "cn.ctrl.platform.orm.mapper", markerInterface = MyMapper.class)
@EnableCaching
@EnableTransactionManagement
public class PlatformApplication {

    @Autowired
    Environment environment;

    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class, args);
    }

    @Bean
    public ServletRegistrationBean servletRegistrationBean() throws ServletException {
        ServletRegistrationBean servlet = new ServletRegistrationBean(new KaptchaServlet(),"/images/kaptcha.jpg");
        servlet.addInitParameter("kaptcha.border", "no"/*kborder*/);//无边框
        servlet.addInitParameter("kaptcha.session.key", Constants.KAPTCHA_SESSION_KEY);//session key
        return servlet;
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new ServiceResponseHandler());
        return restTemplate;
    }
}
