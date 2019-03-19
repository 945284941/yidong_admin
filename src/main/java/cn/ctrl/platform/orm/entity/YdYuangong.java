package cn.ctrl.platform.orm.entity;

public class YdYuangong {
    private String id;

    private String name;

    private String dianhua;

    private String departmentId;

    private String gonghao;

    private String zhiweiId;

    private String zhiWeiName;

    private String departmentName;

    private String diquId;

    public String getDiquId() {
        return diquId;
    }

    public void setDiquId(String diquId) {
        this.diquId = diquId;
    }

    public String getZhiWeiName() {
        return zhiWeiName;
    }

    public void setZhiWeiName(String zhiWeiName) {
        this.zhiWeiName = zhiWeiName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDianhua() {
        return dianhua;
    }

    public void setDianhua(String dianhua) {
        this.dianhua = dianhua == null ? null : dianhua.trim();
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId == null ? null : departmentId.trim();
    }

    public String getGonghao() {
        return gonghao;
    }

    public void setGonghao(String gonghao) {
        this.gonghao = gonghao == null ? null : gonghao.trim();
    }

    public String getZhiweiId() {
        return zhiweiId;
    }

    public void setZhiweiId(String zhiweiId) {
        this.zhiweiId = zhiweiId == null ? null : zhiweiId.trim();
    }
}