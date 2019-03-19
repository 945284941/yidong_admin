package cn.ctrl.platform.orm.mapper;


import cn.ctrl.platform.component.basic.MyMapper;
import cn.ctrl.platform.orm.entity.VisitingRecord;

import java.util.List;
import java.util.Map;


public interface VisitingRecordMapper extends MyMapper<VisitingRecord> {
    boolean isExist(VisitingRecord visitingRecord);
    List<VisitingRecord> gainVisitingRecordId(Map map);
}