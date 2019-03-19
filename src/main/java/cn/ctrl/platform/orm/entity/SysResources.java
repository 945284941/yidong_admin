package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
@Data
@Table(name = "sys_resources")
public class SysResources extends BaseEntity {
    @Id
    private String id;

    private String pid;

    private String name;

    private String code;

    private String url;

    /**
     * 层级关系
     */
    private String ptree;

    private String icon;

    /**
     * 排序字段
     */
    private String sort;

    /**
     * 资源类型1:菜单2:按钮
     */
    @Column(name = "type_")
    private String type;

    /**
     * 资源的深度
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
    private List<SysResources> sub;

    @Transient
    private SysResources parentResources;

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof  SysResources){
            SysResources that = (SysResources)obj;
            return this.getId().equals(that.getId());
        }
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return this.getId().hashCode();
    }

}