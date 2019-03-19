package cn.ctrl.platform.utils;

import java.util.UUID;

/**
 * Created by zhangqi on 2017/3/15.
 */
public class UUIDUtils {

    public static String getUUID(){

        return UUID.randomUUID().toString().replace("-","");
    }
}
