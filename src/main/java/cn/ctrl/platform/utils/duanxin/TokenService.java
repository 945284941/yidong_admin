package cn.ctrl.platform.utils.duanxin;

import java.util.ArrayList;
import java.util.List;

import cn.ctrl.platform.utils.JsonUtil;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;



public class TokenService {
	
	/**
	 * 获取令牌
	 * 
	 * @param clientId
	 * @param clientSecret
	 */
	public static Token getToken(String clientId, String clientSecret) {
		StringBuffer url = new StringBuffer();
		
		String urlPath = "/openapi/restOauth2Server/access_token";
		//能力开放平台地址
		url.append("https://10.x.x.x");
		url.append(urlPath);
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("grant_type", "client_credentials"));
		//能力开放平台下线配置提供
		formparams.add(new BasicNameValuePair("client_id", clientId));
		formparams.add(new BasicNameValuePair("client_secret", clientSecret));
		String message = HttpUtil.httpPost(url.toString(), formparams, "", urlPath, "");
		Token token = (Token) JSONObject.parseObject(message, Token.class);
		return token;
	}


	public static  void main(String baby){

		StringBuffer url = new StringBuffer();

		String urlPath = "/openapi/restOauth2Server/access_token";
		//能力开放平台地址
		url.append("https://10.19.195.240.86");
		url.append(urlPath);
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("grant_type", "client_credentials"));
		//能力开放平台下线配置提供
		formparams.add(new BasicNameValuePair("client_id", "20190823027676804"));
		formparams.add(new BasicNameValuePair("client_secret", "34f85ca80ec353d3052b8a2d3973a0c5"));
		String message = HttpUtil.httpPost(url.toString(), formparams, "", urlPath, "");
		Token token = (Token) JSONObject.parseObject(message, Token.class);

	}

}
