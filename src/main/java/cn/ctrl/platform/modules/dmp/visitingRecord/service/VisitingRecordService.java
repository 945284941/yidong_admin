package cn.ctrl.platform.modules.dmp.visitingRecord.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.ctrl.framework.common.utils.UUIDGenerator;
import cn.ctrl.platform.component.basic.BaseService;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.VisitingRecord;
import cn.ctrl.platform.orm.mapper.SysResourcesMapper;
import cn.ctrl.platform.orm.mapper.VisitingRecordMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by HuifengWang on 2017/1/12.
 */
@Service
public class VisitingRecordService extends BaseService {
	
	@Autowired
	VisitingRecordMapper visitingRecordMapper;
	@Autowired
	SysResourcesMapper resourcesMapper;


    /**
     * 查询列表
     * @return
     */
    public PageInfo gainList(Integer pageNo, Integer pageSize,Map map){

		if (pageNo == null || pageNo <= 0) pageNo = 1;
		if (pageSize == null || pageSize <= 0 || pageSize >= 500) pageSize = 20;
		PageHelper.startPage(pageNo,pageSize);
		List<VisitingRecord> list = visitingRecordMapper.gainVisitingRecordId(map);


		return new PageInfo(list);
    }

    public  int addRecord(String url,String userId){
		int i = 0;
		VisitingRecord record = new VisitingRecord();
		SysResources res = resourcesMapper.selectByUrl(url);
		if(res != null){
			record.setId(UUIDGenerator.getUUID());
			record.setCreateTime(new Date());
			record.setActionName(res.getName());
			record.setCreateBy(userId);
			i = visitingRecordMapper.insert(record);
		}
		return i;
	}





}
