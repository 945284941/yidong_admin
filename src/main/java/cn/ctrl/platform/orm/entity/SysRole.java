package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.persistence.*;

@Data
@Table(name = "sys_role")
public class SysRole extends BaseEntity {
    @Id
    private String id;

    private String pid;

    private String name;

   @Column(name="department_id")
    private String departmentId;
    /**
     * 层级码
     */
    private String ptree;

    /**
     * 深度
     */
    private Integer deep;

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
    private List<SysRole> sub;

    @Transient
    private SysRole parentRole;

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof  SysRole){
            SysRole that = (SysRole)obj;
            return this.getId().equals(that.getId());
        }
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return this.getId().hashCode();
    }
}