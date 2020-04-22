package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:TableInfo
 * Function: 表
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TableInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3035992894208827578L;
	/**
	 *  PK
	 */
	private Integer tableId;
	/**
	 *  所属的子系统唯一标识
	 */
	private Integer systemId;
	/**
	 * 数据库IP地址，须与数据库信息填写一致，用于关联
	 */
	private String databaseIp;
	/**
	 * 数据库IP名称，须与数据库信息填写一致，用于关联
	 */
	private String databaseName;
	/**
	 * 数据库用户名，用于1个数据库实例下有多个用户，各用户分别拥有自身的数据库对象时作区别
	 */
	private String databaseUser;
	/**
	 * 表英文名
	 */
	private String tableName;
	/**
	 * 表中文名
	 */
	private String tableCname;
	/**
	 * 表简介、表的含义、作用及用途等业务描述
	 */
	private String tableInformation;
	/**
	 * 参见数据分类表主题域分类，格式为大类>小类>细项;如没有对应的，则填为其他
	 */
	private String tableTheme;
	/**
	 *  表所占存储（单位MB）；ORACLE、MYSQL、DB2、SQLSERVER、HIVE、HBASE、GP、PG均可查表容量大小。若不支持查询，则填为“未知
	 */
	private Integer tableSize;
	/**
	 *  表数据存储时长（单位：天）；永久存储，填为“永久"
	 */
	private Integer storageTime;
	   
}
