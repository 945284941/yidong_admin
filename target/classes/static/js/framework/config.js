project.config = (function() {
	var settings = {
			/*用户相关服务*/
		roleservice: "/js/modules/roleservice.js",
		userservice: "/js/modules/userservice.js",
		resourceservice: "/js/modules/resourceservice.js",
		visitingRecordservice:"/js/modules/visitingRecordservice.js",
		memberService:'/js/modules/memberService.js',
        passservice:"/js/modules/passservice.js",
        ydDiQuService:"/js/modules/ydDiQuService.js",
        ydBuMenService:"/js/modules/ydBuMenService.js",
        ydZhiWeiService:"/js/modules/ydZhiWeiService.js",
        ydYuanGongService:"/js/modules/ydYuanGongService.js",
        ydNewsService:"/js/modules/ydNewsService.js",
        ydHuoDongCatService:"/js/modules/ydHuoDongCatService.js",
        ydHuoDongService:"/js/modules/ydHuoDongService.js",
        ydQuestionnaireService:"/js/modules/ydQuestionnaireService.js",
        ydNewCatService:"/js/modules/ydNewCatService.js",
        lawyerService:"/js/modules/lawyerService.js",
        questionService:"/js/modules/questionService.js",
        bannerService:"/js/modules/bannerService.js",









	};
	return {
		getConfig : function(x) {
			var uri = settings[x] ;
			//如果为产品模式，则js由云存储下载
			if(project.profile && project.profile == 'product'){
				//uri = project.cdn + '/'+uri ;
			}
			return uri ;
		}
	}
})()
