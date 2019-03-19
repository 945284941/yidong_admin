package cn.ctrl.platform.utils;

import cn.ctrl.framework.common.utils.UtilsReflections;
import com.google.common.collect.Lists;

import java.util.List;

/**
 * Created by dhc on 2017/1/22.
 * ztree的对象
 */

public class ZtreeNodeCorp {
    private String id;
    private String pid;
    private String name;
    private Boolean checked;
    private Boolean open;
    private Boolean chkDisabled;

    public Boolean getChkDisabled(){
        return chkDisabled;
    }
    public ZtreeNodeCorp setChkDisabled(Boolean chkDisabled){
        this.chkDisabled=chkDisabled;
        return this;
    }

    public Boolean getChecked() {
        return checked;
    }

    public ZtreeNodeCorp setChecked(Boolean checked) {
        this.checked = checked;
        return this;
    }

    public String getId() {
        return id;
    }

    public ZtreeNodeCorp setId(String id) {
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

    public ZtreeNodeCorp setOpen(Boolean open) {
        this.open = open;
        return this;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public static List<ZtreeNodeCorp> changeZtreeNode(List all, List selected){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNodeCorp node = new ZtreeNodeCorp();
            node.setId((String) UtilsReflections.getFieldValue(obj,"id"));
            node.setPid((String) UtilsReflections.getFieldValue(obj,"fathercorp"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"unitname"));
            node.setOpen(true);
            if(selected!=null &&selected.contains(obj)){
                node.setChecked(true);
            }
            ZtreeNodes.add(node);
        }
        return ZtreeNodes;
    }
    public static List<ZtreeNodeCorp> changeZtreeNode(List all, List selected, List chkDisableds){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNodeCorp node = new ZtreeNodeCorp();
            String id = UtilsReflections.getFieldValue(obj,"id");
            node.setId(id);
            node.setPid((String) UtilsReflections.getFieldValue(obj,"fathercorp"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"unitname"));
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
