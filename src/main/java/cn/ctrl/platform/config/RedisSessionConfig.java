package cn.ctrl.platform.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
//redisSession 管理session,默认失效时间30分钟
@EnableRedisHttpSession
public class RedisSessionConfig {
}