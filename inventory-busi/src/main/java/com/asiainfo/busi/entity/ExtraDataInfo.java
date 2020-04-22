package com.asiainfo.busi.entity;

import java.util.Date;

import com.asiainfo.common.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * ClassName:ExtraDataInfo
 * Function: 外部数据信息
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月15日 下午21:00:00
 *
 */
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ExtraDataInfo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122816193503605350L;
	/**
	 * PK
	 */
	private Integer extraId;
	/**
	 * 系统唯一标识（同系统信息表中系统唯一标识）
	 */
	private Integer systemId;
	/**
	 * 外部数据种类（如果系统合法购置外部数据，则须填写外部数据名称）
	 */
	private String extraType;
	/**
	 * 外部数据提供机构（以合法采购方式获取该数据提供方的外部数据）
	 */
	private String extraProvide;
	/**
	 * 采购周期（单位：天）
	 */
	private String extraCollect;
	/**
	 * 外部数据更新频率（单位：天）（合同承诺中数据提供机构定期更新数据的频率）
	 */
	private String extraUpdata;
	/**
	 * 最新一期采购合同的到期时间，格式为XXXX年XX月XX日
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	private Date expirTime;
	
}
