/**
 * User.java
 * com.baseutil.model
 * 2019年10月29日 LWJ
 *
 * Copyright (c) 2019, TNT All Rights Reserved.
*/

package com.baseutil.model;

import java.io.Serializable;

/**
 * ClassName:User
 * Function: TODO 请简要描述该类的功能及作用
 *
 * @author   lwj
 * @since    JDK1.8
 * @Date     2019 2019年10月29日 上午11:22:35
 */
public class User implements Serializable{
	
	/**
	 * serialVersionUID:
	 *
	 * @since JDK1.7
	 */
	
	private static final long serialVersionUID = 4995394458638569840L;

	private String userAccount;
	
	private String userName;

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}

