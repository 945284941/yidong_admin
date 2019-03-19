package cn.ctrl.platform.orm.entity;

import cn.ctrl.platform.component.basic.BaseEntity;
import java.util.Date;
import javax.persistence.*;

@Table(name = "sys_log")
public class SysLog extends BaseEntity {
    @Id
    private String id;

    /**
     * 该条日志的创建人
     */
    @Column(name = "create_by")
    private String createBy;

    /**
     * 该条日志的创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 操作类型:查看,删除,修改,新增
     */
    @Column(name = "handle_type")
    private String handleType;

    /**
     * 操作的对象:对象的名称
     */
    @Column(name = "handle_target")
    private String handleTarget;

    /**
     * 操作对象的ID,如果是商品或者是其他对象,储存ID字段
     */
    @Column(name = "handle_target_id")
    private String handleTargetId;

    /**
     * 执行的方法名称:类名_类方法
     */
    @Column(name = "handle_method")
    private String handleMethod;

    /**
     * 备注
     */
    private String remark;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * 获取该条日志的创建人
     *
     * @return create_by - 该条日志的创建人
     */
    public String getCreateBy() {
        return createBy;
    }

    /**
     * 设置该条日志的创建人
     *
     * @param createBy 该条日志的创建人
     */
    public void setCreateBy(String createBy) {
        this.createBy = createBy == null ? null : createBy.trim();
    }

    /**
     * 获取该条日志的创建时间
     *
     * @return create_time - 该条日志的创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置该条日志的创建时间
     *
     * @param createTime 该条日志的创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取操作类型:查看,删除,修改,新增
     *
     * @return handle_type - 操作类型:查看,删除,修改,新增
     */
    public String getHandleType() {
        return handleType;
    }

    /**
     * 设置操作类型:查看,删除,修改,新增
     *
     * @param handleType 操作类型:查看,删除,修改,新增
     */
    public void setHandleType(String handleType) {
        this.handleType = handleType == null ? null : handleType.trim();
    }

    /**
     * 获取操作的对象:对象的名称
     *
     * @return handle_target - 操作的对象:对象的名称
     */
    public String getHandleTarget() {
        return handleTarget;
    }

    /**
     * 设置操作的对象:对象的名称
     *
     * @param handleTarget 操作的对象:对象的名称
     */
    public void setHandleTarget(String handleTarget) {
        this.handleTarget = handleTarget == null ? null : handleTarget.trim();
    }

    /**
     * 获取操作对象的ID,如果是商品或者是其他对象,储存ID字段
     *
     * @return handle_target_id - 操作对象的ID,如果是商品或者是其他对象,储存ID字段
     */
    public String getHandleTargetId() {
        return handleTargetId;
    }

    /**
     * 设置操作对象的ID,如果是商品或者是其他对象,储存ID字段
     *
     * @param handleTargetId 操作对象的ID,如果是商品或者是其他对象,储存ID字段
     */
    public void setHandleTargetId(String handleTargetId) {
        this.handleTargetId = handleTargetId == null ? null : handleTargetId.trim();
    }

    /**
     * 获取执行的方法名称:类名_类方法
     *
     * @return handle_method - 执行的方法名称:类名_类方法
     */
    public String getHandleMethod() {
        return handleMethod;
    }

    /**
     * 设置执行的方法名称:类名_类方法
     *
     * @param handleMethod 执行的方法名称:类名_类方法
     */
    public void setHandleMethod(String handleMethod) {
        this.handleMethod = handleMethod == null ? null : handleMethod.trim();
    }

    /**
     * 获取备注
     *
     * @return remark - 备注
     */
    public String getRemark() {
        return remark;
    }

    /**
     * 设置备注
     *
     * @param remark 备注
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}