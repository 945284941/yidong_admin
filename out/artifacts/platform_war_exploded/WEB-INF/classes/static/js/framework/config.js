project.config = (function() {
	var settings = {
			/*用户相关服务*/
		roleservice: "/js/modules/roleservice.js",
		userservice: "/js/modules/userservice.js",
		resourceservice: "/js/modules/resourceservice.js",
		visitingRecordservice:"/js/modules/visitingRecordservice.js",
		passservice:"/js/modules/passservice.js",
		carPeccancyService:"/js/modules/carPeccancyService.js",
		bdCorpService:"js/modules/bdCorpService.js",
		bdPsndocService:"js/modules/bdPsndocService.js",
		movePowerService:"js/modules/movePowerService.js",
		clockService:"js/modules/clockService.js",
        memberService:"js/modules/memberService.js",
        sellerService:"js/modules/sellerService.js",
        configService:"js/modules/configService.js",
        productTypeService:"js/modules/productTypeService.js",
        menuService:"js/modules/menuService.js",
        pointsProductService:"js/modules/pointsProductService.js",
        productService:"js/modules/productService.js",
        carouselService:"js/modules/carouselService.js",
        rechargeService:"js/modules/rechargeService.js",
        voucherService:"js/modules/voucherService.js"
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
