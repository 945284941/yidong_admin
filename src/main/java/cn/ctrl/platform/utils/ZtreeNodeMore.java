package cn.ctrl.platform.utils;

import cn.ctrl.framework.common.utils.UtilsReflections;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.SysRole;
import com.google.common.collect.Lists;

import java.util.List;

import static com.caucho.hessian.io.HessianInputFactory.log;

/**
 * Created by dhc on 2017/1/22.
 * ztree的对象
 */

public class ZtreeNodeMore {
    private String id;
    private String pId;
    private String name;
    private Boolean checked;
    private Boolean open;
    private Boolean chkDisabled;

    public Boolean getChkDisabled(){
        return chkDisabled;
    }
    public ZtreeNodeMore setChkDisabled(Boolean chkDisabled){
        this.chkDisabled=chkDisabled;
        return this;
    }

    public Boolean getChecked() {
        return checked;
    }

    public ZtreeNodeMore setChecked(Boolean checked) {
        this.checked = checked;
        return this;
    }

    public String getId() {
        return id;
    }

    public ZtreeNodeMore setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getOpen() {
        return open;
    }

    public ZtreeNodeMore setOpen(Boolean open) {
        this.open = open;
        return this;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public static List<ZtreeNodeMore> changeZtreeNode(List all, List selected){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNodeMore node = new ZtreeNodeMore();
            node.setId((String) UtilsReflections.getFieldValue(obj,"id"));
            node.setpId((String) UtilsReflections.getFieldValue(obj,"pkFathedept"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"deptname"));
            node.setOpen(true);
            if(selected!=null &&selected.contains(obj)){
                node.setChecked(true);
            }
            ZtreeNodes.add(node);
        }
        return ZtreeNodes;
    }
    public static List<ZtreeNodeMore> changeZtreeNode(List all, List selected, List chkDisableds){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNodeMore node = new ZtreeNodeMore();
            String id = UtilsReflections.getFieldValue(obj,"id");
            node.setId(id);
            node.setpId((String) UtilsReflections.getFieldValue(obj,"pkFathedept"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"deptname"));
            node.setOpen(true);
            if(selected!=null &&selected.contains(obj)){
                node.setChecked(true);
            }
            if(chkDisableds!=null &&chkDisableds.contains(obj)){
                node.setChkDisabled(true);
                node.setChecked(false);
            }
            ZtreeNodes.add(node);
        }
        return ZtreeNodes;
    }
}
