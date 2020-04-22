package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:IntroductionInfo
 * Function: 接口信息
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class IntroductionInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8866219254235718913L;
	/**
	 *  PK
	 */
	private Integer intId; 
	/**
	 *  0、数据型接口 1、功能型接口
	 */
	private String intType;
	/**
	 * 本端系统接口地址URI，填本端发布的网络类型地址
	 */
	private String localIntAddress;
	/**
	 * 系统唯一标识，为系统信息表中系统唯一标识
	 */
	private Integer systemId;
	/**
	 * 系统名称，为系统信息表中子系统名称
	 */
	private String systemName;
	/**
	 * 依赖该系统接口的系统的系统唯一标识
	 */
	private Integer dockSystemId;
	/**
	 * 依赖该系统接口的系统
	 */
	private String dockSystemName;
	/**
	 * 对端系统接口地址URI，填对端发布的网络类型地址
	 */
	private String romoteIntAddress;
	/**
	 * 接口承载的网络类型，如：CN2、DCN、等
	 */
	private String intTheme;
	/**
	 * 若为数据型接口，则填写数据流转方向；若为功能型接口，则填写为“不限定”
	 */
	private String transDirection;
	/**
	 * 对数据型接口，则给出接口传送的数据名称、日均交互量等简要描述；对功能型接口，则给出接口功能简要描述
	 */
	private String intInteractContext;
	/**
	 * 接口名称。如没有名称，可简要描述
	 */
	private String intName;
	/**
	 * FTP、DBLINK、API、OCI、实时消息
	 */
	private String intContractType;
	/**
	 * 约定的接口传送频率。包括：日、周、月、年、实时、XX分钟
	 */
	private String intTransFreq;
	/**
	 * 对数据型接口，填写所传送数据，在本端系统中对应的表或文件的英文名称。如含多个表或文件，则用“、”分隔；
	 */
	private String tableFile;

}
