package cn.ctrl.platform.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

@SuppressWarnings("all")
public class UtilsJson {


	/**
	 * 把Java 对象序列化成Json字符串
	 * 
	 * @param javaObj
	 * @return
	 */
	public static String toJson(Object javaObj) {
		String json = JSONObject.toJSONString(javaObj);
		return json;
	}

	/**
	 * 把Json字符串转换成Map对象
	 * 
	 * @param json
	 * @return
	 */
	public static Map<String, Object> toMap(String json) {
		JSONObject jsonObject = JSONObject.parseObject(json);
		Set<String> keys = jsonObject.keySet();
		String key;
		Object value;
		Map<String, Object> valueMap = new HashMap<String, Object>();
		for (String e : keys) {
			key = e;
			value = jsonObject.get(e);
			valueMap.put(key, value);
		}
		return valueMap;
	}

	/**
	 * 把List对象中的某两个字段弄成Json字符串
	 * 
	 * @param data
	 * @param pojoCalss
	 * @param idField
	 * @param nameField
	 * @return
	 */
	public static String toJson(List<?> data, Class<?> pojoCalss,
			String idField, String nameField) {
		StringBuffer result = new StringBuffer();
		result.append("[");
		if (data != null && data.size() > 0) {
			for (int i = 0; i < data.size(); i++) {
				try {
					result.append("[");

					Class<?> c = Class.forName(pojoCalss.getName());
					Object o = c.newInstance();
					o = data.get(i);
					Method[] methods = c.getDeclaredMethods();

					String idMethod = "get"
							+ idField.toUpperCase().substring(0, 1)
							+ idField.substring(1);

					String nameMethod = "get"
							+ nameField.toUpperCase().substring(0, 1)
							+ nameField.substring(1);

					String idValue = "";
					String nameValue = "";

					for (int t = 0; t < methods.length; t++) {
						if (methods[t].getName().equals(idMethod)) {
							Object invResult = methods[t].invoke(o, null);
							if (null != invResult) {
								idValue = invResult.toString();
							}
						}
						if (methods[t].getName().equals(nameMethod)) {
							Object invResult = methods[t].invoke(o, null);
							if (null != invResult) {
								nameValue = "\"" + invResult.toString() + "\"";
							}
						}
					}

					result.append(idValue);
					result.append(",");
					result.append(nameValue);
					result.append("]");

					if (i < data.size() - 1)
						result.append(",");

				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}

			}
		}
		result.append("] ");
		return result.toString();
	}

	public static String toJson(List data, Class pojoCalss) {
		StringBuffer result = new StringBuffer();
		result.append("[");
		if (data != null && data.size() > 0) {
			for (int i = 0; i < data.size(); i++) {
				try {
					result.append("{");

					Class c = Class.forName(pojoCalss.getName());
					Object o = c.newInstance();
					o = data.get(i);
					Field[] fields = c.getDeclaredFields();

					Method[] methods = c.getDeclaredMethods();
					if (fields != null && fields.length > 0) {

						for (int j = 0; j < fields.length; j++) {
							result.append(fields[j].getName() + ":");
							for (int t = 0; t < methods.length; t++) {
								String temp = "get"
										+ fields[j].getName().toUpperCase()
												.substring(0, 1)
										+ fields[j].getName().substring(1);
								if (methods[t].getName().equals(temp)) {
									result.append("\"");
									Object invResult = methods[t].invoke(o,
											null);
									if (null != invResult) {
										result.append(invResult.toString());
									}
									result.append("\"");
									if (j < fields.length - 1)
										result.append(",");
								}
							}
						}

					}
					result.append("} ");
					if (i < data.size() - 1)
						result.append(",");
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}

			}
		}
		result.append("] ");
		return result.toString();
	}

	/**
	 * 
	 * <p>
	 * Title:
	 * </p>
	 * <p>
	 * Description: 从json数组中得到相应java数组
	 * </p>
	 * 
	 * @param jsonString
	 * @return
	 */
	public static Object[] toObjectArray(String jsonString) {
		JSONArray jsonArray = JSONArray.parseArray(jsonString);
		return jsonArray.toArray();
	}


	
	public static void main(String[] args) {
		List<String> list = new ArrayList<String>();
		list.add("{\"33333\":\"66556\",\"123\":\"111\",\"0012\":\"00123\",\"PriceSon\":\"1\",\"CountSon\":\"2\",\"NumberSon\":\"3\",\"SnSon\":\"4\"}");
		list.add("{\"33333\":\"66556\",\"123\":\"111\",\"0012\":\"00123\",\"PriceSon\":\"1\",\"CountSon\":\"2\",\"NumberSon\":\"3\",\"SnSon\":\"4\"}");
		System.out.println(toJson(list));
	}
}
