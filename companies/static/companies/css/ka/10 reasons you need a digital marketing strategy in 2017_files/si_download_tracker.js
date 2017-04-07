/**
 * Created by stuartmiller on 28/11/2013.
 */
function si_download_tracker(productid, userid, producttype, the_toolkit){

    //console.log('Tracking code fired');

    jQuery.ajax({

        type:       'POST',
        url:        si_download_tracking_ajax_script.ajaxurl,
        data:       { action: 'si_download_tracker_hook', userid: userid, productid: productid, producttype: producttype ,toolkit:the_toolkit}

    }).done( function( si_download_tracker_response ) {
    //     console.log('Tracking code response');
   
    });

}
