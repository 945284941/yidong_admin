package cn.ctrl.platform.orm.entity;

public class YdHuodongYuangong {
    private String id;

    private String huodongId;

    private String yuangongId;

    private String status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    private String dianhua;

    public String getDianhua() {
        return dianhua;
    }

    public void setDianhua(String dianhua) {
        this.dianhua = dianhua;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getHuodongId() {
        return huodongId;
    }

    public void setHuodongId(String huodongId) {
        this.huodongId = huodongId == null ? null : huodongId.trim();
    }

    public String getYuangongId() {
        return yuangongId;
    }

    public void setYuangongId(String yuangongId) {
        this.yuangongId = yuangongId == null ? null : yuangongId.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }
}