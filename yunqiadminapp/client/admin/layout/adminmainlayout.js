Template.adminmainlayout.onRendered(function () {
	var jcd_viewHeight = document.documentElement.clientHeight;//获取屏幕宽度
	var jcd_viewWidth = document.documentElement.clientWidth;//获取屏幕高度
	var jcd_adminHeadHeight = $('.jcd_admin_logo_con').height();
	var jcd_admin_sidebar = $('.jcd_admin_sidebar');
	var jcd_admin_content = $('.jcd_admin_content');
	jcd_admin_sidebar.css({
		'height' : (jcd_viewHeight-jcd_adminHeadHeight)+'px'
	})
	jcd_admin_content.css({
		'padding-left' : jcd_admin_sidebar.width()+'px'
	})

});

