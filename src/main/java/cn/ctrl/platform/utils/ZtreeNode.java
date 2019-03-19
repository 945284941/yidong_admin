package cn.ctrl.platform.utils;

import cn.ctrl.framework.common.utils.UtilsReflections;
import cn.ctrl.platform.orm.entity.SysResources;
import cn.ctrl.platform.orm.entity.SysRole;
import com.google.common.collect.Lists;

import javax.persistence.Transient;
import java.util.List;

/**
 * Created by HuifengWang on 16/7/19.
 * ztree的对象
 */
public class ZtreeNode {
    private String id;
    private String pId;
    private String name;
    private Boolean checked;
    private Boolean open;
    private Boolean chkDisabled;

    @Transient
    private  List<ZtreeNode> children;

    public List<ZtreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<ZtreeNode> children) {
        this.children = children;
    }

    public Boolean getChkDisabled(){
        return chkDisabled;
    }
    public ZtreeNode setChkDisabled(Boolean chkDisabled){
        this.chkDisabled=chkDisabled;
        return this;
    }

    public Boolean getChecked() {
        return checked;
    }

    public ZtreeNode setChecked(Boolean checked) {
        this.checked = checked;
        return this;
    }

    public String getId() {
        return id;
    }

    public ZtreeNode setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ZtreeNode setName(String name) {
        this.name = name;
        return this;
    }

    public Boolean getOpen() {
        return open;
    }

    public ZtreeNode setOpen(Boolean open) {
        this.open = open;
        return this;
    }

    public String getpId() {
        return pId;
    }

    public ZtreeNode setpId(String pId) {
        this.pId = pId;
        return this;
    }

    public static List<ZtreeNode> changeZtreeNode(List all, List selected){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNode node = new ZtreeNode();
            node.setId((String) UtilsReflections.getFieldValue(obj,"id"));
            node.setpId((String) UtilsReflections.getFieldValue(obj,"pid"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"name"));
            node.setOpen(true);
            if(selected!=null &&selected.contains(obj)){
                node.setChecked(true);
            }

            if(obj instanceof SysResources){
                //所有用户没有选择资源管理的权限,只有超级管理员才可以修改资源
                if("2".equals(node.getId())){
                    node.setChkDisabled(true);
                    node.setChecked(false);
                }
            }
            if(obj instanceof SysRole){
                //所有用户超级管理的权限
                if("1".equals(node.getId())){
                    node.setChkDisabled(true);
                    node.setChecked(false);
                }
            }
            ZtreeNodes.add(node);
        }
        return ZtreeNodes;
    }
    public static List<ZtreeNode> changeZtreeNode(List all, List selected,List chkDisableds){
        List ZtreeNodes = Lists.newArrayList();

        for (int i = 0; i < all.size(); i++) {
            Object obj = all.get(i);
            ZtreeNode node = new ZtreeNode();
            String id = UtilsReflections.getFieldValue(obj,"id");
            node.setId(id);
            node.setpId((String) UtilsReflections.getFieldValue(obj,"pid"));
            node.setName((String) UtilsReflections.getFieldValue(obj,"name"));
            node.setOpen(true);
            if(selected!=null &&selected.contains(obj)){
                node.setChecked(true);
            }
            if(chkDisableds!=null &&chkDisableds.contains(obj)){
                node.setChkDisabled(true);
                node.setChecked(false);
            }

            if(obj instanceof SysResources){
                //所有用户没有选择资源管理的权限,只有超级管理员才可以修改资源
                if("2".equals(node.getId())){
                    node.setChkDisabled(true);
                    node.setChecked(false);
                }
            }
            if(obj instanceof SysRole){
                //所有用户超级管理的权限
                if("1".equals(node.getId())){
                    node.setChkDisabled(true);
                    node.setChecked(false);
                }
            }

            ZtreeNodes.add(node);
        }
        return ZtreeNodes;
    }
}
