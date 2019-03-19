package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "sys_user")
public class SysUser extends BaseEntity {
    @Id
    private String id;

    private String username;

    private String truename;

    private String password;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "create_time")
    private Date createTime;

    private String status;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "update_time")
    private Date updateTime;

    @Transient
    private List<String> resources;

    @Transient
    private List<String> roles;

    @Transient
    private String newPassword;


    public SysUser(){
        super();
    }

    public SysUser(SysUser user) {
        this.id = user.getId();
        this.username=user.getUsername();
        this.truename=user.getTruename();
        this.password = user.getPassword();
        this.createBy = user.getCreateBy();
        this.createTime = user.getCreateTime();
        this.updateBy = user.getUpdateBy();
        this.updateTime = user.getUpdateTime();
        this.status = user.getStatus();
    }

    @Transient
    private List<SysRole> roleList;
}