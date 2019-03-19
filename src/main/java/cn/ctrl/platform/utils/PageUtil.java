package cn.ctrl.platform.utils;

/**
 * Created by zhangqi on 2017/3/17.
 */
public class PageUtil {

    public static Integer getNum(Integer i,Integer pageNo){
        return i+1+10*(pageNo-1);
    }
}
