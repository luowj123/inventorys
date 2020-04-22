package com.asiainfo.busi.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asiainfo.busi.dao.IIntroductionInfoDao;
import com.asiainfo.busi.entity.IntroductionInfo;
import com.asiainfo.busi.service.IIntroductionInfoService;

@Service
public class IntroductionInfoServiceImpl implements IIntroductionInfoService {
	
	@Autowired
	private IIntroductionInfoDao introductionInfoDao;

	@Override
	public List<Map<String, Object>> selectByPage(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return introductionInfoDao.selectByPage(param);
	}

	@Override
	public IntroductionInfo selectByPrimaryKey(Integer intId) {
		// TODO Auto-generated method stub
		return introductionInfoDao.selectByPrimaryKey(intId);
	}

	@Override
	public int insert(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return introductionInfoDao.insert(map);
	}
	
    /**
	 * insertList:批量新增
	 *
	 * @throws 
	 */
	public void insertList(List<Map<String, Object>> list) {
		if ( list != null && list.size() > 0 ) {
			int num = list.size();
			Integer num0 = num / 30;

			List<Map<String, Object>> list0 = null;
			for ( int k = 0 ; k < num0; k++){
				list0 = new ArrayList<Map<String, Object>>();
				int start = k * 30;
				int end = (k+1) * 30;
				list0 = list.subList(start, end);
				// 分批次导入，每次30条
				introductionInfoDao.insertList(list0);
			} 
			list0 = new ArrayList<Map<String, Object>>();
			list0 = list.subList(num0 * 30, list.size());
			// 剩余不足30，批量导入
			if( list0.size() > 0 ) {
				introductionInfoDao.insertList(list0);
			}
		}
	}

	@Override
	public int deleteByPrimaryKey(Integer intId) {
		// TODO Auto-generated method stub
		return introductionInfoDao.deleteByPrimaryKey(intId);
	}

}
