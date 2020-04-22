package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:SystemInfo
 * Function: 系统信息
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class SystemInfo extends BaseEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6300377704029348186L;
	/**
	 * 系统编号（PK）
	 */
	private Integer systemId;
	/**
	 * 省份（集团部门、专业公司）
	 */
	private String provinceName;
	/**
	 * 系统盘点责任部门组织层次
	 */
	private String deptPiLev;
	/**
	 * 系统名称
	 */
	private String praSystemName;
	/**
	 * 子系统名称
	 */
	private String systemName;
	/**
	 * 系统唯一标识
	 */
	private String systemPk;
	/**
	 * 系统简称
	 */
	private String systemAbbreviation;
	/**
	 * 系统简介
	 */
	private String systemContext;
	/**
	 * 系统分类
	 */
	private String systemType;
	/**
	 * 系统承建部门
	 */
	private String systemDeptBuild;
	/**
	 * 系统管理部门
	 */
	private String systemDeptManag;
	/**
	 * 系统管理负责人
	 */
	private String systemManager;
	/**
	 * 系统管理负责人联系电话
	 */
	private String systemManagerPhone;
	/**
	 * 系统运营部门
	 */
	private String systemDeptOper;
	/**
	 * 系统运营负责人
	 */
	private String systemOperator;
	/**
	 * 系统运营负责人联系电话
	 */
	private String systemOperatorPhone;
	/**
	 * 承建厂商
	 */
	private String systemFirmBuild;
	/**
	 * 系统使用部门
	 */
	private String systemDeptUse;
	/**
	 * 系统盘点责任部门
	 */
	private String systemDeptStock;
	/**
	 * 系统盘点负责人
	 */
	private String systemStockist;
	/**
	 * 系统盘点负责人联系电话
	 */
	private String systemStockistPhone;
	/**
	 * 系统IP地址
	 */
	private String systemIpAddress;
	/**
	 * 系统功能类型
	 */
	private String systemFuncType;
	/**
	 * 存储方式
	 */
	private String systemStorage;
	/**
	 * 系统数据应用情况
	 */
	private String dataApplication;
	/**
	 * 系统上线时间
	 */
    private String systemUptime;
	/**
	 * 系统工程批复信息
	 */
	private String reply;
	/**
	 * 系统预计下线时间
	 */
    private String systemReDwTime;
	/**
	 * 本系统生成的数据
	 */
	private String systemData;
	/**
	 * 从其他系统采集的数据
	 */
	private String collectionData;
	/**
	 * 向其他系统提供的数据
	 */
	private String dataToOtherSys;
	/**
	 * 系统重要数据资产
	 */
	private String importData;
	/**
	 * 入省大数据平台的数据
	 */
	private String inProvinceData;
	/**
	 * 入集团大数据平台的数据
	 */
	private String inBlocData;
	/**
	 * 是否含敏感字段
	 */
	private String includeSensitiveField;
	/**
	 * 主要敏感字段
	 */
	private String sensitiveField;
	/**
	 * 是否购置外部数据
	 */
	private String externalData;
	/**
	 * 外部数据种类
	 */
	private String externalDataType;
}
