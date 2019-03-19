package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Table(name = "visiting_record")
public class VisitingRecord extends BaseEntity {
    @Id
    private String id;

    /**
     * 行为名称
     */
    @Column(name = "action_name")
    private String actionName;

    /**
     * 操作时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 操作人
     */
    @Column(name = "create_by")
    private String createBy;

    @Transient
    private String username;

    @Transient
    private String truename;

    public String getId() {
        return id;
    }

    public String getActionName() {
        return actionName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTruename() {
        return truename;
    }

    public void setTruename(String truename) {
        this.truename = truename;
    }
}