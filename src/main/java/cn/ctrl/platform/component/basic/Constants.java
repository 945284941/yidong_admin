package cn.ctrl.platform.component.basic;

/**
 * Application constants.
 */
public final class Constants {

    //开发环境
    public static final String SPRING_PROFILE_DEVELOPMENT = "dev";

    //验证码存放在session中的key
    public static final String KAPTCHA_SESSION_KEY = "kaptcha_session_key";

    public static final Object SESSION_ROLE_CODE = "platform_role_code";
    //存放在session中的用户
    public static final Object SESSION_INFO = "platform_session_info";

    //验证码参数
    public static String VALID_CODE_PARAM = "validMsg";

    //验证码是否显示
    public static String VALID_CODE_SHOW="validCodeShow";

    //登陆错误信息
    public static String LOGIN_ERROR_MSG = "loginErrorMessage";

    //登陆错误次数累加在session中的key值
    public static  String LOGIN_ERROR_TIMES="loginErrorTimes";

    public static String LOGIN_USERNAME="loginUsername_";

    private Constants() {
    }
}
