/**
 * This file contains all the JS for this plugin
 */
jQuery(document).ready(function() {
	/**
		* Mark post as read
		*/
	jQuery('.mark-read-via-jquery').click(function() {


		var postId = jQuery(this).attr('data-post-id');
		var link = jQuery(this);
		var loader = link.parent().find('img.loader');
		var icon = link.parent().find('a.more');
		loader.show();

		jQuery.ajax({
			type				: 'POST',
			url					: pri_front_ajax.ajax_url,
			data				: 'action=pri_mark_post_as_read&post_id=' + postId + '&ajax_nonce=' + pri_front_ajax.ajax_nonce,
			success	: function( answer ) {

				loader.hide();
				
				if( answer == 'deleted' ) {
					link.find('span').html('Mark as read');
					icon.removeClass('visited');
				}
				
				if( answer == 'saved' ) {
					link.find('span').html('Mark as not read');
					icon.addClass('visited');
				}
				
			}
		});
	});
});

function show_ajax_feedback() {
	jQuery('#no-records-phrase button').val('Save');
	jQuery('#no-records-phrase button').attr("disabled", false);
}

function revoke_ajax_feedback() {
	jQuery('#no-records-phrase button').val('Saved');
	jQuery('#no-records-phrase button').attr("disabled", true);
}
