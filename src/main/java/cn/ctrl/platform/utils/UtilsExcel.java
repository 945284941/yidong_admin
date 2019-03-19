package cn.ctrl.platform.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class UtilsExcel {
     
    /**
    * excel导出工具
    * @createTime: 2015-4-29 下午06:52:17
    * @param <E>
    * @param response
    * @param header
    * @param fileNames
    * @param list void
    */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public static <E> void exportExcel(HttpServletResponse response,String[] header,String[] fileNames,List<E> list,String wenjianming) {
        //创建工作簿
        HSSFWorkbook wb=new HSSFWorkbook();
        //创建一个sheet
        HSSFSheet sheet=wb.createSheet("数据");
         
        HSSFRow headerRow=sheet.createRow(0);
        HSSFRow contentRow=null;
         
        //设置标题
        for(int i=0;i<header.length;i++){
            headerRow.createCell(i).setCellValue(header[i]);
        }
        try {
            for(int i=0;i<list.size();i++){
                contentRow=sheet.createRow(i+1);
                //获取每一个对象
                E o=list.get(i);
                if(o instanceof Map){
                    for(int j=0;j<fileNames.length;j++){
                        String fieldName = fileNames[j];
                        Object value = ((Map) o).get(fieldName);
                        if(value!=null){
                            contentRow.createCell(j).setCellValue(value.toString());
                        }
                    }
                }else{
                    Class cls=o.getClass();
                    for(int j=0;j<fileNames.length;j++){
                        String fieldName = fileNames[j].substring(0, 1).toUpperCase()+ fileNames[j].substring(1);
                        Method getMethod = cls.getMethod("get" + fieldName);
                        Object value = getMethod.invoke(o);
                        if(value!=null){
                            contentRow.createCell(j).setCellValue(value.toString());
                        }
                    }
                }
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (SecurityException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
         
        OutputStream os=null;

        try {
            response.reset();
            response.addHeader("Content-Disposition","attachment;filename="+wenjianming+".xls");
            response.setContentType("application/vnd.ms-excel;charset=utf-8");
            os=response.getOutputStream();
            wb.write(os);
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            if(os!=null){
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}