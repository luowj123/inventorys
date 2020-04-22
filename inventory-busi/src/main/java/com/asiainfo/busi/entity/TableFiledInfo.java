package com.asiainfo.busi.entity;

import com.asiainfo.common.entity.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:TableFiledInfo
 * Function: 表字段
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TableFiledInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7355308249180368531L;
	/**
	 *  PK
	 */
	private Integer fieldId;
	/**
	 * 表唯一标识符
	 */
	private Integer tableId;
	/**
	 * 所属的子系统唯一标识
	 */
	private Integer systemId;
	/**
	 * 数据库IP地址，须与数据库填写的一致，用于关联
	 */
	private String databaseIp;
	/**
	 * 数据库IP名称，须与数据库填写的一致，用于关联
	 */
	private String databaseName;
	/**
	 * 数据库用户名，用于1个数据库实例下有多个用户，各用户分别拥有自身的数据库对象时作区别
	 */
	private String databaseUser;
	/**
	 * 字段英文名
	 */
	private String fieldName;
	/**
	 * 字段所属含义
	 */
	private String fieldCname;
	/**
	 * 字段数据的类型，比如时间、字符串、数值等
	 */
	private String fieldType;
	/**
	 * 字段所属数据类型：1、实例 2、属性 3、标识 4、指标 5、维度
	 */
	private String fieldCate;
	/**
	 * 是否为主键
	 */
	private String fieldPrimary;
	/**
	 * 字段的业务描述
	 */
	private String businessDesc;
	/**
	 * 是否可为空
	 */
	private String fieldNull;
	/**
	 * 主数据编码及主数据名称；非主数据的字段，则填为“无”
	 */
	private String referData;
	/**
	 * 1/2/3级
	 */
	private String securityLevel;
	/**
	 * 字段备注
	 */
	private String fieldContext;
	/**
	 * 是否为外键
	 */
	private String fieldForeign;
	/**
	 * 外键所属表英文名
	 */
	private String foreineTableName;
	/**
	 * 字段所属表英文名
	 */
	private String tableName; 
}
