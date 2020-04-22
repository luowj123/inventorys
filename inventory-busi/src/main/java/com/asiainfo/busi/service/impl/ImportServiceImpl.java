package com.asiainfo.busi.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.asiainfo.busi.service.IDatabaseInfoService;
import com.asiainfo.busi.service.IExtraDataInfoService;
import com.asiainfo.busi.service.IFileInfoService;
import com.asiainfo.busi.service.IIntroductionInfoService;
import com.asiainfo.busi.service.IModeService;
import com.asiainfo.busi.service.ISystemInfoService;
import com.asiainfo.busi.service.ITableFiledInfoService;
import com.asiainfo.busi.service.ITableInfoService;
import com.asiainfo.busi.service.ImportService;

@Service
public class ImportServiceImpl implements ImportService{
	
	@Autowired
	private IModeService modeService;
	
	@Autowired
	ISystemInfoService systemInfoService;
	
	@Autowired
	private  IDatabaseInfoService databaseInfoService;
	
	@Autowired
	private  ITableInfoService tableInfoService;
	
	@Autowired
	private  ITableFiledInfoService tableFiledInfoService;
	
	@Autowired
	private  IExtraDataInfoService extraDataInfoService;
	
	@Autowired
	private  IFileInfoService fileInfoService;
	
	@Autowired
	private  IIntroductionInfoService introductionInfoService;
	
	/**
	 * batchImport: Excel文件导入（号码）
	 *
	 * @return String
	 * @throws 
	 * @since  JDK1.7
	 */
	@Override
	public String batchImport(MultipartFile file, String model) throws Exception {
		
		// 定义返回值对象
		String msg = "";
		// 文件名
		String fileName = file.getOriginalFilename();
		
		// 验证文件格式，目前只支持excel
		if(checkFileAfter(fileName)) {
			msg = "文件格式不正确：" + fileName + ";仅支持excel";
			return msg;
		}
		
		// 获取工作簿(excel映射成一个虚拟对象)
		Workbook wb = getWorkbook(file, fileName);
		Map<String, Object> map = new HashMap<String, Object>();
		Sheet sheet = null;
		if(!model.equals("all")) {
			sheet = wb.getSheetAt(0);// 单个模块数据导入
		} else {
			// 多个模块数据导入
		}
		if (sheet != null) {
			// 构造导入数据
			map.put("createTime", new Date());
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> modes = modeService.selectByPrimaryKey(model);
			for (int r = 1; r <= sheet.getLastRowNum(); r++) {
				Row row = sheet.getRow(r);
				if (row == null) {
					continue;
				}
				
				map = getSystemInfo(row, modes);
				list.add(map);
			}
			
			// 按模块保存导入数据
			switch (model) {
			case "all":
	
				break;
			case "systemInfo":// 系统导入
				systemInfoService.insertList(list);
				break;
			case "databaseInfo":// 数据库导入
				databaseInfoService.insertList(list);
				break;
			case "tableInfo":// 表导入
				tableInfoService.insertList(list);
				break;
			case "tableFiledInfo":// 字段导入
				tableFiledInfoService.insertList(list);
				break;
			case "extraDataInfo":// 外部数据导入
				extraDataInfoService.insertList(list);
				break;
			case "fileInfo":// 文件导入
				fileInfoService.insertList(list);
				break;
			case "introductionInfo":// 接口导入
				introductionInfoService.insertList(list);
				break;
			default:
				break;
			}
		}
		
		return "";
	}
	
	/**
	 * 构造数据
	 */
	private Map<String, Object> getSystemInfo(Row row, List<Map<String, Object>> models) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<String, Object>();
		for (int i = 0; i < models.size(); i++ ) { // 跳过表头
			Object o = getCellValue(row.getCell(i));
			map.put((String) models.get(i).get("attr_name"), o);
		}
		
		return map;
	}
	
	/**
	 * 格式化excel单元格数据
	 * @param cell
	 * @return
	 */
	private static  Object getCellValue(Cell cell) {
        Object value = null;
 
        DecimalFormat df = new DecimalFormat("0");//格式化number String字符串
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//日期格式化
 
        switch (cell.getCellTypeEnum()) {
            case STRING:
                value = cell.getRichStringCellValue().getString();
                break;
            case NUMERIC:
                if("General".equals(cell.getCellStyle().getDataFormatString())){
                    value = df.format(cell.getNumericCellValue());
                }else if("m/d/yy".equals(cell.getCellStyle().getDataFormatString())){
                    value = sdf.format(cell.getDateCellValue());
                }else{
                    value = df.format(cell.getNumericCellValue());
                }
                break;
            case BOOLEAN:
                value = cell.getBooleanCellValue();
                break;
            case BLANK:
                value = "";
                break;
            default:
                value = cell.toString();
                break;
        }
        return value;
	}

	/**
	 * 验证文件格式，目前只支持excel
	 * @return
	 */
	public Boolean checkFileAfter(String fileName) {
		if (!fileName.matches("^.+\\.(?i)(xls)$") && !fileName.matches("^.+\\.(?i)(xlsx)$")) { 
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 获取工作簿
	 * @param file
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public Workbook getWorkbook(MultipartFile file, String fileName) throws IOException {
		// 验证excel版本
		boolean isExcel2003 = true;
		if ( fileName.matches("^.+\\.(?i)(xlsx)$") ) {
			isExcel2003 = false;
		}
		
		// 根据excel版本，生成工作簿
		InputStream is = file.getInputStream();
		Workbook wb = null;
		if ( isExcel2003 ) {
			wb = new HSSFWorkbook(is);
		} else {
			wb = new XSSFWorkbook(is);
		}
		
		return  wb;
	}

}
