package com.asiainfo.busi.entity;

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
public class Menu {
	
    private Integer menuId;

    private String menuName;

    private Integer menuParentId;

    private String menuUrl;

}