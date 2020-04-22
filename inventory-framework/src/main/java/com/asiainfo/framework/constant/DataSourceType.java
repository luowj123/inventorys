package com.asiainfo.framework.constant;

/**
 * @EnumName DataSourceType
 * @Description 数据源常量定义
 * @Author zhaolijun
 * @Date 2019/10/9 11:28
 * @Version 1.0
 **/
public enum DataSourceType {

	/**
	 * 主数据库
	 */
	MASTER("postgresql"),

	/**
	 * ITSM数据库
	 */
	ITSM("oracle"),

	/**
	 * 资产管理平台 调度任务库
	 */
	FACTORY("postgresql"),

	/**
	 * 资产管理平台 调度任务库
	 */
	REGISTER("postgresql"),

	/**
	 * 资产管理平台 系统管理库
	 */
	PORTAL("postgresql"),

	/**
	 * 资产管理平台 DBlink库
	 */
	POSTGRES("postgresql"),

	/**
	 * hive集群元数据库
	 */
	HIVE_META("mysql"),

	/**
	 * 接口组维护数据库
	 */
	AI_INTERFACE("oracle"),

	/**
	 * 发送短信库
	 */
	SEND_MESSAGE("mysql");
	// 数据库断言类型
	private final String dialect;

	DataSourceType(String dialect) {
		this.dialect = dialect;
	}

	public String getDialect() {
		return this.dialect;
	}
}
