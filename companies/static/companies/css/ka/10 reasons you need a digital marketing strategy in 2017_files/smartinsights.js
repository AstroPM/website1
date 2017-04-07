(function(jQuery) {

  jQuery(function() {

    FastClick.attach(document.body);

    // Mobile nav toggle
    jQuery('#nav-trigger').on('click', function(e) {
      var mobileNav = jQuery('#mobile-nav-hook');
      e.preventDefault();

      //mobileNav.slideToggle('fast');
      jQuery('#header').toggleClass('mobile-nav-open');

    });

    // Acount Navigation / Login
    jQuery('#user-trigger').on('click', function(e) {
      var accountNav = jQuery('#account-nav');
      e.preventDefault();
      jQuery('#header').toggleClass('account-nav-open');
/*
      setTimeout( function() {
        jQuery('#header').toggleClass('account-nav-open');
      }, 10000);
*/
    });

    jQuery('.account-nav-open').on('click', function (e) {
        if (jQuery(e.target).closest("#account-nav").length === 0) {
            jQuery("#account-nav").hide();
            //console.log('clicked something');
        }
    });

    // Simple Scroll to function
    jQuery('.scrollIt').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = jQuery(this.hash);
        target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          jQuery('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

   // Improve Expert membership page, October 2014

   //roleFormChange(); // run on page load

   // run when form is changed
   jQuery("#role-form-submit").click(function(){
       roleFormChange();
   });

  function roleFormChange(){
      //console.log('Role form change');
      var role = jQuery("#role-choice").val();
      var cur_member_level=jQuery("#member_level").val();
      //alert(role);
      jQuery.ajax({
          url: ajax_object.ajaxurl,
          dataType: 'json',
          data: {
              'action':'role_guides_ajax_request',
              'role' : role,
	      'member_level':cur_member_level
          },
          success:function(data) {
              jQuery(".help-you-text").hide();
              if(role == 'Digital marketing manager'){
                  jQuery("#marketing-manager-text").show();
              }else if(role == 'Agency marketer or owner'){
                  jQuery("#agency-marketer-text").show();
              }else if(role == 'B2B marketer'){
                  jQuery("#B2B-marketer-text").show();
              }else if(role == 'Company owner or director'){
                  jQuery("#company-owner-text").show();
              }else if(role == 'Consultant'){
                  jQuery("#consultant-text").show();
              }else if(role == 'Digital marketing specialist'){
                  jQuery("#digital-marketing-text").show();
              }else if(role == 'Ecommerce marketer'){
                  jQuery("#ecommerce-marketer-text").show();
              }else if(role == 'Marketing manager'){
                  jQuery("#marketing-text").show();
              }else if(role == 'Small business/startup marketer'){
                  jQuery("#small-business-text").show();
              }else if(role == 'Student'){
                  jQuery("#student-text").show();
              }else{
                  jQuery(".help-you-text").hide();
              }
              jQuery('.article_section').html(data.data);
              if(jQuery( window ).width() > 768){
                  var articleBox = jQuery('#grid .article-box');
                  articleBox.each(function(){
                      var articleBoxHeight = jQuery(this).height();
                      if(articleBoxHeight > jQuery("#box_height").val()){
                          jQuery("#box_height").val(articleBoxHeight);
                      }
                  });
                  if(jQuery("#box_height").val() > 0 ){
                      jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
                  }
              }
          }
      });
  }

    // Dropdown tweaks for touch devices
    jQuery('#menu-main li.menu-item-has-children').doubleTapToGo();


    jQuery("#menu-main > ul").each(function() {
      var jQuerythis = jQuery(this),
          jQuerywin = jQuery(window);

      if (jQuerythis.offset().left + 100 > jQuerywin.width() + jQuerywin.scrollLeft() - jQuerythis.width()) {
          jQuerythis.addClass("nav-shift");
      }
    });

    // Blog posts widget reveal for touch
    jQuery('#blog-panel .box').doubleTapToGo();

    // Make whole elements clickable
    jQuery(".clickable").click(function(){
        if(jQuery(this).find("a").length){
            window.location.href = jQuery(this).find("a:first").attr("href");
        }
    });

    /* Search functions for tablets */
/*
    jQuery('#expand-search').on('click', function() {
      console.log('tapped search icon');
      jQuery(this).parent().parent().addClass('expanded');
      jQuery(this).remove();
    });
*/
   //For membership section style
  var col = jQuery('.col-md-3');
    var divHeight = jQuery('.first-col').height();
    if(jQuery( window ).width() > 768){
        var articleBox = jQuery('#grid .article-box');
        jQuery("#box_height").val('');
        articleBox.each(function(){
            var articleBoxHeight = jQuery(this).height();
            if(articleBoxHeight > jQuery("#box_height").val()){
            jQuery("#box_height").val(articleBoxHeight);
            }
        });
        if(jQuery("#box_height").val() > 0 ){
            jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
        }
        col.each(function(){
            var headingHeight = jQuery(this).children('.heading').height();
            var freeORpayHeight = jQuery(this).children('.freeORpay').height();
            var joinUsHeight = jQuery(this).children('.join-us').height();
            var totalHeight  = headingHeight + freeORpayHeight + joinUsHeight;
            if(divHeight > totalHeight){
               var balanceHeight = divHeight-totalHeight;
              var newHeight = joinUsHeight + balanceHeight;
              jQuery(this).children('.join-us').css('height', newHeight);
            }

        });
    }
    var firstDivHeight = jQuery('.first-col').height();
    jQuery(window).resize(function(){
        if(jQuery(this).width() > 768){

        col.each(function(){
            var headingHeight = jQuery(this).children('.heading').height();
            var freeORpayHeight = jQuery(this).children('.freeORpay').height();
            var joinUsHeight = jQuery(this).children('.join-us').height();
            var totalHeight  = headingHeight + freeORpayHeight + joinUsHeight;
            if(firstDivHeight > totalHeight){
               var balanceHeight = firstDivHeight-totalHeight;
              var newHeight = joinUsHeight + balanceHeight;
              jQuery(this).children('.join-us').css('height', newHeight);
            }

        });
    }else{
        col.each(function(){
         //var joinUsHeight = jQuery(this).children('.join-us').height();
         jQuery(this).children('.join-us').css('height', 'auto');
        });
    }
    });

    /* Guide list page*/

    //testimonial slider
    jQuery('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
   jQuery('.owl-carousel1').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:10000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    jQuery( "#search_text").bind( "keydown", function( event ) {
        searchPostsByText();
    });
    jQuery( "#search_text").bind( "click", function( event ) {
        searchPostsByText();
    });
    jQuery('.guide_quotes').bind( 'mouseenter', function(){
       jQuery('.owl-nav').show();
    });
    jQuery('.guide_quotes').bind( 'mouseleave', function(){
        jQuery('.owl-nav').hide();
    });
    
   jQuery( "#search_company").bind( "keydown", function( event ) {
        searchPostsByCompany();
    });
    jQuery( "#search_company").bind( "click", function( event ) {
        searchPostsByCompany();
    });

    // Aug 11 2014 - product listing page
    /*
     * Switching-between-tabs menu on several pages
     */
    jQuery('#product-filter-navigation select').change(function() {
       jQuery('#product-filter-navigation').submit();
    })
     jQuery('.sbHolder ul li').click(function() {
        //jQuery('#product-filter-navigation').submit();
        getPostsByAjax();
    })

     jQuery("#search-library-sectn").click(function() {
          jQuery(".search-results").html('');
          jQuery(".search-results").hide();
     });
     jQuery("#product-listing").click(function() {
          jQuery(".search-results").html('');
          jQuery(".search-results").hide();
     });
     jQuery("#product-listing-top").click(function() {
          jQuery(".search-results").html('');
          jQuery(".search-results").hide();
     });
     jQuery("#header").click(function() {
          jQuery(".search-results").html('');
          jQuery(".search-results").hide();
     });
     jQuery(".member_level").click(function(){
         var memberlevel = jQuery(this).attr('title');
         jQuery("#member_level").val(memberlevel);
         jQuery(".member_level").removeClass('current');
         jQuery(this).addClass('current');
         getPostsByAjax();
     });
     jQuery(".grid").click(function(){
         jQuery(".content_section").attr("id","");
         jQuery(".content_section").attr("id","grid");
         jQuery(".detail").find('a').removeClass('active');
         jQuery(this).find('a').addClass('active');
        var articleBox = jQuery('#grid .article-box');
        articleBox.each(function(){
        var articleBoxHeight = jQuery(this).height();
        if(articleBoxHeight > jQuery("#box_height").val()){
        jQuery("#box_height").val(articleBoxHeight);
        }
        });
        if(jQuery("#box_height").val() > 0 ){
            jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
        }
     });
     jQuery(".detail").click(function(){
         jQuery(".content_section").attr("id","");
         jQuery(".content_section").attr("id","detail");
         jQuery(".grid").find('a').removeClass('active');
         jQuery(this).find('a').addClass('active');
         jQuery('#detail .article-box').css('height', 'auto');
     });
     jQuery(window).resize(function(){
        if(jQuery(this).width() < 768){
         jQuery(".content_section").attr("id","");
         jQuery(".content_section").attr("id","detail");
         jQuery('#detail .article-box').css('height', 'auto');
        }else{
          if(jQuery(".grid a").hasClass('active')){
                jQuery(".content_section").attr("id","");
                jQuery(".content_section").attr("id","grid");
          }else {
              jQuery(".content_section").attr("id","");
              jQuery(".content_section").attr("id","detail");
              jQuery(".detail a").addClass('active');
              jQuery(".grid a").removeClass('active');
          }
        }
         articleBox.each(function(){
            var articleBoxHeight = jQuery(this).height();
            if(articleBoxHeight > jQuery("#box_height").val()){
            jQuery("#box_height").val(articleBoxHeight);
            }
            });
            if(jQuery("#box_height").val() > 0 ){
                jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
            }
    });
    if(jQuery(this).width() < 768){
         jQuery(".content_section").attr("id","");
         jQuery(".content_section").attr("id","detail");
        }else{
          jQuery(".content_section").attr("id","");
          jQuery(".content_section").attr("id","grid");
    }

  });

  jQuery(window).load(function() {

    // Home page challenge choice form submit handler
    jQuery( "#challenge-form-submit" ).click(function( event ) {
        challenge_chosen = jQuery("#challenge-choice option:selected").text();
        _kmq.push(['record', 'Interaction: Home Page', {'Challenge:': challenge_chosen }]);
        location.href = jQuery("#challenge-choice").val();
        event.preventDefault();
    });

    // Solution page email template submit handler
    jQuery( "#basic-signup-form-submit" ).click(function( event ) {
      event.preventDefault();
      _kmq.push(['record', 'Interaction: Solution page', {'Solution':'Basic signup email form submission'}]);
      document.forms['basicsignup-form'].submit();
    });

    // Blog post resources main panel
    jQuery( "#resources-main li" ).click(function( event ) {
        //event.preventDefault();
        resource = jQuery(this).text();
        _kmq.push(['record', 'Interaction: Blog', {'Blog element':'Footer toolkit individual resources','Resource':resource}]);
    });

      // Blog post resources sidebar panel
      jQuery( "#resources-sidebar li" ).click(function( event ) {
          //event.preventDefault();
          resource = jQuery(this).text();
          _kmq.push(['record', 'Interaction: Blog', {'Blog element':'Sidebar - toolkit individual resources','Resource':resource}]);
      });

      jQuery( "#guide-click" ).click(function( event ) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: jQuery('.lock-section').offset().top }, 'slow');
      });



  });


})(jQuery);


/*
  double-tap top nav dropdown for touch devices
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;(function( jQuery, window, document, undefined )
{
	jQuery.fn.doubleTapToGo = function( params )
	{
		if( !( 'ontouchstart' in window ) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

		this.each( function()
		{
			var curItem = false;

			jQuery( this ).on( 'click', function( e )
			{
				var item = jQuery( this );
				if( item[ 0 ] != curItem[ 0 ] )
				{
					e.preventDefault();
					curItem = item;
				}
			});

			jQuery( document ).on( 'click touchstart MSPointerDown', function( e )
			{
				var resetItem = true,
					parents	  = jQuery( e.target ).parents();

				for( var i = 0; i < parents.length; i++ )
					if( parents[ i ] == curItem[ 0 ] )
						resetItem = false;

				if( resetItem )
					curItem = false;
			});
		});
		return this;
	};
})( jQuery, window, document );


function showFilter(){
        if(jQuery("#show_filter").hasClass('.show')){
           jQuery("#show_filter").removeClass('.show');
           jQuery("#filter_section").slideUp();
           jQuery("#show_filter").html('Show <span>+</span>');
        }else{
           jQuery("#filter_section").slideDown();
           jQuery("#show_filter").addClass('.show');
           jQuery("#show_filter").html('Hide <span>-</span>');
        }
}
function getPostsByAjax(){
    jQuery.ajax({
            url: ajax_object.ajaxurl,
            dataType: 'json',
            data: {
                'action':'get_guides_ajax_request',
                'order' : jQuery("#order").val(),
                'resource' : jQuery("#resource").val(),
                'role' : jQuery("#role").val(),
                'topic' : jQuery("#topic").val(),
                'search_text' : '',
                'member_level' : jQuery("#member_level").val()
            },
            success:function(data) {
                // This outputs the result of the ajax request
                jQuery(".article-box").remove();
                jQuery(".load-more").removeClass('done');
                jQuery('.article_section').html(data.data);
                var resource_text = '';
                if(data.count > 1){
                    resource_text = '('+data.count +' Resources)';
                }else if(data.count == 1){
                    resource_text =  '('+data.count+' Resource)';
                }
                jQuery('.count_text').html(resource_text);
                if(data.count > 8){
                jQuery("#load-button").show();
                jQuery('#ajax-load-more').hide();
                jQuery('.alm-listing').attr('data-taxonomy-terms',data.taxonomy_terms);
                jQuery('.alm-listing').attr('data-taxonomy',data.taxonomy);
                jQuery('.alm-listing').attr('data-cat',data.taxonomy_terms);
                jQuery('.alm-listing').attr('data-role',data.role);
                jQuery('.alm-listing').attr('data-member_level',data.member_level);
                jQuery('.alm-listing').attr('data-meta_key',data.meta_key);
                jQuery('.alm-listing').attr('data-order',data.order);
                jQuery('.alm-listing').attr('data-orderby',data.orderby);
                jQuery('.alm-listing').attr('data-search_prod_title',data.search_prod_title);
                }else{
                    jQuery('#ajax-load-more').hide();
                    jQuery("#load-button").hide();
                }
                jQuery('.ajax_resource').html('');
                if(jQuery( window ).width() > 768){
                    var articleBox = jQuery('#grid .article-box');
                    articleBox.each(function(){
                        var articleBoxHeight = jQuery(this).height();
                        if(articleBoxHeight > jQuery("#box_height").val()){
                        jQuery("#box_height").val(articleBoxHeight);
                        }
                    });
                    if(jQuery("#box_height").val() > 0 ){
                        jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
                    }
                }
            },
            error: function(errorThrown){
               // alert(errorThrown);
            }
        });
}
function loadButtonClick(){
            jQuery.ajax({
            url: ajax_object.ajaxurl,
            dataType: 'json',
            data: {
                'action':'get_guides_ajax_request',
                'order' : jQuery("#order").val(),
                'resource' : jQuery("#resource").val(),
                'role' : jQuery("#role").val(),
                'topic' : jQuery("#topic").val(),
                'search_text' : '',
                'member_level' : jQuery("#member_level").val(),
                'offset'       : jQuery("#offset").val()
            },
            beforeSend: function(){
                                    jQuery("#load-button").addClass('loading');
            },
            complete: function(){
                                    jQuery("#load-button").removeClass('loading');
            },
            success:function(data) {
                // This outputs the result of the ajax request
                jQuery(".load-more").removeClass('done');
                jQuery('.resource-matching').remove();
                jQuery('.article_section').append(data.data);
                jQuery('.count_text').html('('+data.count+ ')Resources');
                if(data.count > 8){
                        var offset_value = jQuery("#offset").val();
                        var offset_constant = '8';
                        offset_value =  parseInt(offset_value, 10) + parseInt(offset_constant, 10);;
                        jQuery("#offset").val(offset_value);
                        if(offset_value >= data.count){
                            jQuery("#load-button").hide();
                            jQuery("#offset").val(8);
                        }
                }else{
                    jQuery("#load_button").hide();
                }
                jQuery('.ajax_resource').html('');
                if(jQuery( window ).width() > 768){
                    var articleBox = jQuery('#grid .article-box');
                    articleBox.each(function(){
                        var articleBoxHeight = jQuery(this).height();
                        if(articleBoxHeight > jQuery("#box_height").val()){
                        jQuery("#box_height").val(articleBoxHeight);
                        }
                    });
                    if(jQuery("#box_height").val() > 0 ){
                        jQuery('#grid .article-box').css('height', jQuery("#box_height").val());
                    }
                }
            },
            error: function(errorThrown){
               // alert(errorThrown);
            }
        });

}
function searchPostsByText(){
        if ( jQuery.trim(jQuery("#search_text" ).val()) != '' && jQuery.trim(jQuery("#search_text").val()).length > 1){
        jQuery.ajax({
            url: ajax_object.ajaxurl,
            dataType: 'json',
            data: {
                'action':'search_ajax_request',
                'resource' : '',
                'role' : '',
                'topic' : '',
                'search_text' : jQuery("#search_text").val(),
                'member_level' : ''
            },
            success:function(data) {
                jQuery(".search-results").html(data.data);
                jQuery(".search-results").show();

                if(data.count > 5){
                    jQuery(".search-results").addClass('scroll-div');
                }else{
                    jQuery(".search-results").removeClass('scroll-div');
                }
            }
        });
    }
}

function searchPostsByCompany(){
        if ( jQuery.trim(jQuery("#search_company" ).val()) != '' && jQuery.trim(jQuery("#search_company").val()).length > 1){
    
        jQuery.ajax({
            url: ajax_object.ajaxurl,
            dataType: 'json',
            data: {
                'action':'search_company_ajax_request',
                'search_company' : jQuery("#search_company").val(),
            },
            success:function(data) {
                jQuery(".search-results").html(data.data);
                jQuery(".search-results").show();
                if(data.count > 5){
                    jQuery(".search-results").addClass('scroll-div');
                }else{
                    jQuery(".search-results").removeClass('scroll-div');
                }
            }
        });
    }
}
function show_google_analytics_reach_result(){
        jQuery.ajax({
            url: ajax_object.ajax_url,

            data: {
                 'action':'get_google_analytics_profile',
            },
            beforeSend: function(){
                                   jQuery(".load-image").removeClass('loading-image');
            },
            complete: function(){
                                  jQuery(".load-image").addClass('loading-image');
            },
            success:function(data) {
                jQuery("#google-dashboard_new").append(data.slice(0,-1));
            },
        });

}
function show_google_analytics_by_period(){
        var currentPeriod = jQuery("#currentPeriod").val();
        var comparisonPeriod = jQuery("#comparisonPeriod").val();
        var profileId = jQuery("#profileId").val();
        jQuery.ajax({
            url: ajax_object.ajax_url,
            data: {
                 'action':'get_google_analytics_profile',
                 'currentPeriod':currentPeriod,
                 'comparisonPeriod':comparisonPeriod,
                 'profileId' :profileId,
                 'display-submit':'display'

            },
            beforeSend: function(){
                                   jQuery(".load-image").removeClass('loading-image');
            },
            complete: function(){
                                  jQuery(".load-image").addClass('loading-image');
            },
            success:function(data) {
                jQuery(".header-filter" ).remove();
                jQuery(".google_content" ).remove();
                jQuery("#google-dashboard_new").append(data.slice(0,-1));
            },
        });

}(jQuery);
