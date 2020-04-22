package com.asiainfo.busi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ModelAttr {
	private Integer attrId;
	private Integer modelId;
	private String modelName;
	private String attrName;
	private String attrType;
	private Integer enableNull;
	private String enableFind;
	private String attrCname;
	private String lableType;
	private Short enableDisable;

}