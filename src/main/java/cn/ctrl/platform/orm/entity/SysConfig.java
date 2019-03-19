package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import javax.persistence.*;

@Table(name = "sys_config")
public class SysConfig extends BaseEntity {
    @Id
    @Column(name = "key_")
    private String key;

    @Column(name = "value_")
    private String value;

    /**
     * 字段说明
     */
    private String remark;

    /**
     * @return key_
     */
    public String getKey() {
        return key;
    }

    /**
     * @param key
     */
    public void setKey(String key) {
        this.key = key == null ? null : key.trim();
    }

    /**
     * @return value_
     */
    public String getValue() {
        return value;
    }

    /**
     * @param value
     */
    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

    /**
     * 获取字段说明
     *
     * @return remark - 字段说明
     */
    public String getRemark() {
        return remark;
    }

    /**
     * 设置字段说明
     *
     * @param remark 字段说明
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}