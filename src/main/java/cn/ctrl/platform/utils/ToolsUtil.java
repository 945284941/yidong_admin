package cn.ctrl.platform.utils;


import java.util.Random;
import java.util.logging.Logger;

/**
 * 功能描述：常用工具方法的集合 创建时间：Mar 9, 2009 11:46:22 AM
 * 
 * @version 1.0
 */

public class ToolsUtil {
	private static final String BHT_SYS_FILE_DIR = "yisou_file_dir";
	private static Logger log = Logger.getLogger("UtilTools");

	/**
	 * 获取 x位随机数
	 * @param x
	 * @return
	 */
	public static String getRandomInt(int x){
		Random random = new Random();
		String rx ="";
		for (int i = 0; i < x; i++) {
			rx = rx + random.nextInt(9)+"";
		}
		return rx;
	}
}
