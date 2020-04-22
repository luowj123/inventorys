package com.asiainfo.busi.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImportService {

	/**
	 * batchImport: Excel文件导入（号码）
	 *
	 * @return String
	 * @throws 
	 * @since  JDK1.7
	 */
	public String batchImport(MultipartFile file, String model) throws Exception;
}
