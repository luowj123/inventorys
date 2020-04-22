package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:DatabaseInfo
 * Function: 数据库信息
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class DatabaseInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5476458579362779263L;
	/**
	 * PK
	 */
	private Integer databaseId;
	/**
	 * 数据库类型分为：ORACLE、MYSQL、DB2、SQLSERVER、HIVE、HBASE、GP、PG、其他
	 */
	private String databaseType;
	/**
	 * 分布式填客户端IP
	 */
	private String databaseIp;
	/**
	 * 数据库的实例名称
	 */
	private String databaseName;
	/**
	 * 数据库版本号
	 */
	private String databaseVersion;
	/**
	 * 数据库对外服务端口
	 */
	private String datebasePort;
	/**
	 * 存储的容量（单位G）
	 */
	private String databaseCapacity;
	/**
	 * 数据库数据目录
	 */
	private String storageAddress;
	/**
	 * 是否是集群
	 */
	private String clusterMode;
	/**
	 * 所属的子系统唯一标识
	 */
	private Integer systemId;
	   
}
