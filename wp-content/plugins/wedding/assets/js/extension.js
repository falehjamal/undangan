(function ($) {"use strict"; var editMode = false;
// Sticky script starts
var lwSticky = function ($scope, $) {
    var lwStickySection = $scope.find('.lw-sticky-section-yes').eq(0);

    lwStickySection.each(function(i) {
        var dataSettings = $(this).data('settings');
        $.each( dataSettings, function(index, value) { 
            if( index === 'lw_sticky_top_spacing' ){
                $scope.find('.lw-sticky-section-yes').css( "top", value + "px" );
            }
        }); 
    });
    $scope.each(function(i) {
        var sectionSettings = $scope.data("settings");
        $.each( sectionSettings, function(index, value) { 
            if( index === 'lw_sticky_top_spacing' ){
                $scope.css( "top", value + "px" );
            }
        }); 
    });
    
    if ( lwStickySection.length > 0 ) {
        var parent = document.querySelector('.lw-sticky-section-yes').parentElement;
        while (parent) {
            var hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible') {
                parent.style.overflow = "visible"
            }
            parent = parent.parentElement;
        }
    }

    var columnClass = $scope.find( '.lw-column-sticky' );
    var dataId = columnClass.data('id');
    var dataType = columnClass.data('type');
    var topSpacing = columnClass.data('top_spacing');

    if( dataType === 'column' ){
        var $target  = $scope;
        var wrapClass = columnClass.find( '.elementor-widget-wrap' );
    
        wrapClass.stickySidebar({
            topSpacing: topSpacing,
            bottomSpacing: 60,
            containerSelector: '.elementor-row',
            innerWrapperSelector: '.elementor-column-wrap',
        });
    }

}
// Sticky script ends
$(window).on('elementor/frontend/init', function () {
    if( elementorFrontend.isEditMode() ) {
        editMode = true;
    }
    
    elementorFrontend.hooks.addAction( 'frontend/element_ready/section', lwSticky);
}); 

}(jQuery));

jQuery("document").ready(function(n){var e=window.settingAutoplay;e?(n("#mute-sound").show(),document.getElementById("song").play()):n("#unmute-sound").show(),n("#audio-container").click(function(u){e?(n("#mute-sound").hide(),n("#unmute-sound").show(),document.getElementById("song").pause(),e=!1):(n("#unmute-sound").hide(),n("#mute-sound").show(),document.getElementById("song").play(),e=!0)})});