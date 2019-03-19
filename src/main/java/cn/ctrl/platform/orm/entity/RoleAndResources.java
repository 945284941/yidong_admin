package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Table(name = "role_and_resources")
public class RoleAndResources extends BaseEntity {
    @Id
    private String id;

    @Column(name = "role_id")
    private String roleId;

    @Column(name = "resources_id")
    private String resourcesId;

    /**
     * 状态码
     */
    private String status;

    @Column(name = "del_flag")
    private Integer delFlag;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "update_by")
    private String updateBy;

    private String remark;

    @Transient
    private String roleName;

}