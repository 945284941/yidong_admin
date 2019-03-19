package cn.ctrl.platform.orm.entity;

public class YdQuestionnaireMessageProprietor {
    private String id;

    private String communityId;

    private String proprietorId;

    private String questionnaireId;

    private String questionnaireMessageId;

    private String a;

    private String b;

    private String c;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCommunityId() {
        return communityId;
    }

    public void setCommunityId(String communityId) {
        this.communityId = communityId == null ? null : communityId.trim();
    }

    public String getProprietorId() {
        return proprietorId;
    }

    public void setProprietorId(String proprietorId) {
        this.proprietorId = proprietorId == null ? null : proprietorId.trim();
    }

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId == null ? null : questionnaireId.trim();
    }

    public String getQuestionnaireMessageId() {
        return questionnaireMessageId;
    }

    public void setQuestionnaireMessageId(String questionnaireMessageId) {
        this.questionnaireMessageId = questionnaireMessageId == null ? null : questionnaireMessageId.trim();
    }

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a == null ? null : a.trim();
    }

    public String getB() {
        return b;
    }

    public void setB(String b) {
        this.b = b == null ? null : b.trim();
    }

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c == null ? null : c.trim();
    }
}