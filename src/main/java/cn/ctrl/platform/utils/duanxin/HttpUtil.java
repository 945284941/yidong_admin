package cn.ctrl.platform.utils.duanxin;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

/**
 * Http请求公共类 此类里有记录日志的方法 修改人： dingliang 修改日期：2016-7-5
 * 备注：com.xwtech.xwecp.sdInterface.util.HttpUtil.java
 */
@SuppressWarnings("deprecation")
public class HttpUtil {
	
	/**
	 * 请求方式
	 * 
	 * @param url
	 *            - 请求地址
	 * @param userMobile
	 *            - 手机号码
	 * @param methodName
	 *            - 调用方法
	 * @param accessToken
	 *            - 令牌
	 * @return
	 */
	public static String httpGet(String url, String userMobile, String methodName, String accessToken) {
		String result = "";
		CloseableHttpClient httpclient = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet(url);
		HttpEntity entity = null;


		try {
			CloseableHttpResponse response;
			response = httpclient.execute(httpGet);
			entity = response.getEntity();
			result = EntityUtils.toString(entity, "gbk");

		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			httpGet.releaseConnection();
		}

		return result;
	}

	/**
	 * 请求方式
	 * 
	 * @param url
	 *            - 请求地址
	 * @param params
	 *            - 请求参数
	 * @param userMobile
	 *            - 手机号码
	 * @param methodName
	 *            - 调用方法
	 * @param accessToken
	 *            - 令牌
	 * @return
	 */
	public static String httpPost(String url, List<NameValuePair> params, String userMobile, String methodName,
			String accessToken) {
		String result = "";
		CloseableHttpClient httpclient = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(url);


		try {
			HttpEntity entity = new UrlEncodedFormEntity(params, HTTP.UTF_8);
			CloseableHttpResponse response;
			httpPost.setEntity(entity);

			response = httpclient.execute(httpPost);

			entity = response.getEntity();
			result = EntityUtils.toString(entity, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			httpPost.releaseConnection();
		}

		return result;
	}



}
