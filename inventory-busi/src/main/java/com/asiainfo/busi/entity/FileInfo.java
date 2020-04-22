package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:FileInfo
 * Function: 文件信息
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class FileInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1364972298446500949L;
	/**
	 *  PK
	 */
	private Integer fileId;
	/**
	 * 所属的子系统唯一标识
	 */
	private Integer systemId;
	/**
	 * 所属的子系统名称
	 */
	private String systemName;
	/**
	 * IP地址
	 */
	private String fileIp;
	/**
	 * 文件目录
	 */
	private String fileAddress;
	/**
	 * 文件英文名
	 */
	private String fileName;
	/**
	 * 文件中文名
	 */
	private String fileCname;
	/**
	 * 文件简介
	 */
	private String fileContext;
	/**
	 * 目录中文件的类型，比如：图片文件、视频文件、音频文件、日志文件、配置文件等
	 */
	private String fileType;
	/**
	 * 参见数据分类表主题域分类，格式为大类>小类>细项;如没有对应的，则填为其他
	 */
	private String fileTheme;
	/**
	 * 0表示永久保存，具体数据就是保留天数
	 */
	private Integer storageTime;
	/**
	 * 目录大小(linux类似 du -sm)
	 */
	private Integer themeSize;
}
