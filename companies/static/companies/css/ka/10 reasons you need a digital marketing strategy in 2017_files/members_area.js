jQuery(document).ready(function($) {



	MemberDashboard = function(){
		var self = this;
		var doc = jQuery(document);
		var showToolkit = jQuery('span.bottom:not(.mini)');
		var account_menu = jQuery('.account_menu');
		var account_menu_menu = jQuery('#account_menu');
		var help_scout = jQuery('.help_scout');
		var si_bg = jQuery('#si_bg');
		var si_popup = jQuery('#si_popup');
		var buy_toolkit = jQuery('.buy_toolkit');
		var reveal_info = jQuery('.reveal_info');
		var lesson_group = jQuery('.lesson_group');
		var resource_info = jQuery('.resource_info');
		var resources_li = jQuery('.resources li');
		var member_mob_menu = jQuery('#member_mob_menu select');

		this.init = function(){

			self.events();
		};

		this.showToolkit = function(el){


			el.parent().toggleClass('show');

		};

		this.showMenu = function(el){
			el.toggleClass('account_active');
			account_menu_menu.toggle();

		};

		this.showResourceInfo = function(el){

			//resource_info.hide();
			//resources_li.removeClass('show');
			reveal_info.not(el).next().slideUp();
			el.next().slideToggle();
			

			
				reveal_info.not(el).parent().removeClass('show');
				el.parent().toggleClass('show');
			
		
			
			

		};

		this.showLessonTopics = function(el){

			lesson_group.removeClass('active').find('ul').hide();
			el.toggleClass('active').find('ul').toggle();

		};

		this.changeURL = function(el){

			thisval = el.val();

			location.href = thisval;

		};

		this.events = function(){

			showToolkit.on('click', function(event) {
				event.preventDefault();
				self.showToolkit(jQuery(this));
				/* Act on the event */
			});

			account_menu.on('click', function(event) {
				event.preventDefault();
				self.showMenu(jQuery(this));
			});


			doc.on('mouseup', function(e) {
				 if (!account_menu_menu.is(e.target) // if the target of the click isn't the container...
				        && account_menu_menu.has(e.target).length === 0) // ... nor a descendant of the container
				    {
				        account_menu_menu.hide();
				        account_menu.removeClass('account_active');
				    }
				/* Act on the event */
			});

			help_scout.on('click', function(e) {
				e.preventDefault();
				HS.beacon.open();
			});

			si_bg.on('click', function(event) {
				event.preventDefault();
				jQuery(this).toggle();
				si_popup.toggle();
			});

			buy_toolkit.on('click',  function(event) {
				event.preventDefault();
				si_popup.toggle();
				si_bg.toggle();
			});

			reveal_info.on('click', function(event) {
				event.preventDefault();
				self.showResourceInfo(jQuery(this));
			});

			lesson_group.on('click', function(e) {
				e.preventDefault();
				self.showLessonTopics(jQuery(this));
			});

			member_mob_menu.on('change', function(e) {
				e.preventDefault();
				self.changeURL(jQuery(this));
			});

		}

		self.init();
	}

	MemberDashboard();

	
});