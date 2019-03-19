package cn.ctrl.platform.config;

import cn.ctrl.framework.redis.manager.AbstractRedisCacheConfig;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class RedisConfig extends AbstractRedisCacheConfig{
}
