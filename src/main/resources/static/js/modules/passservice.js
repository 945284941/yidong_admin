var passservice = new Class({
    Extends: project.Service,
    options: {
        serviceName: 'passservice',
        formId:'passwordForm'
    },
    init:function(){

    },
    save:function () {
           var $this = this;
           var param = $('#'+this.options.formId).formToJson();
           var newPassword = param.newPassword;
           var newPwdagin = param.newPwdagin;
           if(param.username == null || param.username == ""){
                Duang.error("提示","登录账号不能为空!");
           }else if(newPassword == null || newPassword == "" ){
                Duang.error("提示","新密码不能为空!");
           }else if(newPassword != newPwdagin){
                Duang.error("提示", "两次密码不一致！");
           }else{
                $.post(project.path + '/user/savePassword', param, function (data) {
                      if (data.success) {

                          Duang.success("提示", "保存成功");
                          Layout.loadAjaxContent(project.path+"index");
                      } else {
                          Duang.error("提示", data.message);
                      }
                 }, 'json')
           }

           },
        clean:function () {
             document.getElementById('passwordForm').reset();
             $('#username').val('');
             $('#oldPwd').val('');
             $('#newPwd').val('');
             $('#newPwdagin').val('');
        },
        show:function(){
            $('#eyePass i').click(function(){
                        var ele_pass_box = document.getElementById("eyePass");
                        var ele_pass = ele_pass_box.getElementsByTagName("input")[0];
                        var ele_eye = ele_pass_box.getElementsByTagName("i")[0];
                        var state = this.getAttribute("state");
                        if(state === "off") {
                             ele_pass.setAttribute("type", "text");
                             ele_eye.setAttribute("state", "on");
                             ele_eye.style.opacity = 0.4;
                        } else {
                              ele_pass.setAttribute("type", "password");
                              ele_eye.setAttribute("state", "off");
                              ele_eye.style.opacity = 1;
                        }
                    });
        },
        yuanshow:function(){
            $('#yuaneyePass i').click(function(){
                var ele_pass_box = document.getElementById("yuaneyePass");
                var ele_pass = ele_pass_box.getElementsByTagName("input")[0];
                var ele_eye = ele_pass_box.getElementsByTagName("i")[0];
                var state = this.getAttribute("state");
                if(state === "off") {
                    ele_pass.setAttribute("type", "text");
                    ele_eye.setAttribute("state", "on");
                    ele_eye.style.opacity = 0.4;
                } else {
                    ele_pass.setAttribute("type", "password");
                    ele_eye.setAttribute("state", "off");
                    ele_eye.style.opacity = 1;
                }
            });
        },
        chongshow:function(){
            $('#chongeyePass i').click(function(){
                var ele_pass_box = document.getElementById("chongeyePass");
                var ele_pass = ele_pass_box.getElementsByTagName("input")[0];
                var ele_eye = ele_pass_box.getElementsByTagName("i")[0];
                var state = this.getAttribute("state");
                if(state === "off") {
                    ele_pass.setAttribute("type", "text");
                    ele_eye.setAttribute("state", "on");
                    ele_eye.style.opacity = 0.4;
                } else {
                    ele_pass.setAttribute("type", "password");
                    ele_eye.setAttribute("state", "off");
                    ele_eye.style.opacity = 1;
                }
            });
        }
});