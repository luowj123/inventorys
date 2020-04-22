/**
 * Created by zhaolijun on 2017/8/16.
 */
package com.asiainfo.common.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 〈一句话功能简述〉
 * 〈功能详细描述〉
 *
 * @version [版本号, 2017-08-16 11:37]
 * @see [相关类/方法]
 * @since [产品/模块版本]
 **/
public class ExportUtil {

    private static final Logger logger= LoggerFactory.getLogger(ExportUtil.class);

    public static void exportData(List<Map<String, Object>> dataList, String excelName, String[] fields, String
            modelName, HttpServletRequest request, HttpServletResponse response) {
        FileInputStream in = null;
        ServletOutputStream out = null;
        //获取模板
        String fileName = null;
        try {
            fileName = URLEncoder.encode(excelName, "utf-8").replace("%28", "(").replace("%29", ")");
        } catch (UnsupportedEncodingException e) {
            logger.error("error>>unsupport encoding");
        }
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ";charset=utf-8");
        String path = ExportUtil.class.getClassLoader().getResource("exportFileTemplate").getPath();
//        path = path.substring(1, path.length());
        try {
            out = response.getOutputStream();
//            in = new FileInputStream("D:\\interface_view.xls");
            in = new FileInputStream("/data01/dev/etl/service_local/exportFileTemplate" + modelName);
            if (modelName.endsWith(".xlsx")) {
            	 XSSFWorkbook workbook = new XSSFWorkbook(in);
                //添加数据
                //if (!dataList.isEmpty()) {
                    XSSFSheet fromSheet = workbook.getSheetAt(0);
                    //添加数据
                    ExportUtil.addData(fromSheet, dataList, fields);
                    workbook.write(out);
               // }
            }else {
            	HSSFWorkbook wb = new HSSFWorkbook(in);
            	HSSFRow row = null;
            	
            	int index = 0;//记录额外创建的sheet数量
            	HSSFSheet sheet = null;
       		 	for ( int j = 0; j < dataList.size(); j++ ) {
       		 		if ((j + 1) % 65535 == 0 ) {
       		 			sheet = wb.createSheet("result_" + index);
       		 		} else {
       		 			sheet = wb.getSheetAt(0);
       		 		}
       		 		int rowIndex = sheet.getLastRowNum();
       		 		row = sheet.createRow(rowIndex + 1);
       		 		// 填充表数据
       		 		Map<String, Object> maps = dataList.get(j);
       		 		// 遍历所选字段，按顺序一一填充到单元格
       		 		for ( int k = 0; k < fields.length; k++ ) {
       		 			row.createCell(k).setCellValue(maps.get(fields[k])==null?"":maps.get(fields[k]).toString());
       		 		} 
       		 		sheet.setDefaultRowHeight((short) (16.5 * 20));
    		 }
       		 	
       		 response.setContentType("application/octet-stream");
    		 OutputStream os = response.getOutputStream();
    		 response.setHeader("Content-disposition", "attachment;filename=interface_view.xls");//默认Excel名称
    		 response.flushBuffer();
    		 wb.write(os);
    		 os.flush();
    		 os.close();
            	
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            logger.error("error>>export model file not found");
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("error>>read model file error");
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
                if (out != null) {
                    out.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    public static void addData(XSSFSheet sheet, List<Map<String, Object>> dataList, String[] feilds) {
        //获取开始行
        for (Map<String, Object> map : dataList) {
            int rowIndex = sheet.getLastRowNum();
            XSSFRow row = sheet.createRow(rowIndex + 1);
            for (int i = 0; i < feilds.length; i++) {
                XSSFCell cell = row.createCell(i);
               if(map.get(feilds[i])==null){
                   cell.setCellValue("-");
               }else if("0E-10".equals(map.get(feilds[i]))){
                   cell.setCellValue("0");
               }else{
                   cell.setCellValue(String.valueOf(map.get(feilds[i])));
               }

            }
        }
    }

}