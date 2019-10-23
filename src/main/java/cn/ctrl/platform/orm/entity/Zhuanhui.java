package cn.ctrl.platform.orm.entity;

import java.util.Date;

public class Zhuanhui {
    private String id;

    private String look;

    private String yuangongName;

    public String getYuangongName() {
        return yuangongName;
    }

    public void setYuangongName(String yuangongName) {
        this.yuangongName = yuangongName;
    }

    public String getLook() {
        return look;
    }

    public void setLook(String look) {
        this.look = look;
    }

    private String yuangongId;

    private String diquId;

    private String state;

    private String xiangonghui;

    private String shengonghui;

    public String getXiangonghui() {
        return xiangonghui;
    }

    public void setXiangonghui(String xiangonghui) {
        this.xiangonghui = xiangonghui;
    }

    public String getShengonghui() {
        return shengonghui;
    }

    public void setShengonghui(String shengonghui) {
        this.shengonghui = shengonghui;
    }

    private Date createTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getYuangongId() {
        return yuangongId;
    }

    public void setYuangongId(String yuangongId) {
        this.yuangongId = yuangongId == null ? null : yuangongId.trim();
    }

    public String getDiquId() {
        return diquId;
    }

    public void setDiquId(String diquId) {
        this.diquId = diquId == null ? null : diquId.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}