package cn.ctrl.platform.component.qiniu;

import java.io.IOException;
import java.io.InputStream;

public interface RemoteFileService {
	/**
	 * 上传文件，返回上传后的文件路径，filepath与源文件所在路径相同，但是文件名是格式化后的文件名称
	 * @param inputStream
	 * @param type
	 * @param fileName
	 * @param isLocal 是否本地保存
	 */
	public String upload(InputStream inputStream, String fileName, String type, boolean isLocal)throws Exception;
	/**
	 * 下载文件，返回文件下载url，有效时间半小时
	 * @param filepath
	 * @return
	 */
	public String downloadURL(String filepath)throws IOException;
	/**
	 * 删除文件
	 * @param filepath
	 * @return
	 */
	public boolean delete(String filepath) ;
	/**
	 * 获取远程文件的地址
	 * @param filepath
	 * @return
	 */
	public String getRemoteFileUrl(String filepath) ;
    /** 
     * 判断文件是否存在 
     * @param filepath 
     * @return
     */  
    public boolean isExist(String filepath) ;
}
