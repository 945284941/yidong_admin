package cn.ctrl.platform.utils.duanxin;


public class IdentificationService {
	
	private String format = "json";

	/**
	 * 短信随机码下发
	 * 
	 * @param telnum
	 * @param access_token
	 * @param smsContent
	 */
	public String sendSms(String telnum, String access_token, String smsContent) {
		StringBuffer requestParam = new StringBuffer();
		String urlPath = "/openapi/httpService/IdentificationService?";
		String method = "sendSmsInfo";
		String methodName = urlPath + method;
		//能开接口地址
		requestParam.append("https://10.x.x.x");
		requestParam.append(urlPath);
		requestParam.append("access_token=" + access_token);
		requestParam.append("&method=" + method);
		requestParam.append("&format=" + format);
		requestParam.append("&TELNUM=" + telnum);
		requestParam.append("&SMSCONTENT=" + smsContent);//短信内容
		String message = HttpUtil.httpGet(requestParam.toString(), telnum, methodName, access_token);
		return message;
	}

        
}
