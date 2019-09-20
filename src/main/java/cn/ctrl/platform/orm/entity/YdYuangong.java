package cn.ctrl.platform.orm.entity;

public class YdYuangong {
    private String id;

    private String name;

    private String dianhua;

    private String  shenqingTime;

    private String sex;

    private String minzu;

    private String study;

    private String mianmao;

    private String birthday;


    public String getShenqingTime() {
        return shenqingTime;
    }

    public void setShenqingTime(String shenqingTime) {
        this.shenqingTime = shenqingTime;
    }

    public String getSex() {
        return sex;
    }

    private String state;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getMinzu() {
        return minzu;
    }

    public void setMinzu(String minzu) {
        this.minzu = minzu;
    }

    public String getStudy() {
        return study;
    }

    public void setStudy(String study) {
        this.study = study;
    }

    public String getMianmao() {
        return mianmao;
    }

    public void setMianmao(String mianmao) {
        this.mianmao = mianmao;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getPersonCard() {
        return personCard;
    }

    public void setPersonCard(String personCard) {
        this.personCard = personCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAihao() {
        return aihao;
    }

    public void setAihao(String aihao) {
        this.aihao = aihao;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    private String personCard;

    private String address;

    private String aihao;

    private String createTime;

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