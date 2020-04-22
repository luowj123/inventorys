package com.asiainfo.busi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.util.Date;

/**
 * ClassName:DimTable
 * Function: 维度管理
 *
 * @author   LWJ
 * @since    JDK1.8
 * @Date     2020年04月20日 下午22:00:00
 *
 */

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class DimTable {
	/**
	 * PK
	 */
    private Integer id;
    /**
     * '维度名
     */
	private String name;
	/**
	 * 维度值
	 */
	private String val;
	/**
	 * PID
	 */
	private Integer pid;
	/**
	 * 组
	 */
	private String nodes;
	/**
	 * 创建时间
	 */
	private Date createTime;
	/**
	 * 备注
	 */
	private String remark;

}