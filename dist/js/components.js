;(function(window){

    'use strict';
    
    /**
    * Bar Value Object.
    * Used by ProgressBar Value Object
    */
    var BarVO = function(progress) {
        return { progress : progress
               };
    };
    
    /**
    * ProgressBar Value Object.
    * Used for constructing data to ProgressBar component
    */
    var ProgressBarVO = function(progress,animateSpeed,max) {
        return { max : max || 100,
                 bar : new BarVO(progress),
                 animateSpeed : animateSpeed || 200
               };
    };
    
    window.BarVO = BarVO;
    window.ProgressBarVO = ProgressBarVO;
    
})( window );
;( function( window ) {

    'use strict';
    
    /**
    * ProgressBarDemo Value Object.
    * Used for constructing data to ProgressBarDemo
    */
    var ProgressBarDemoVO = function(bars,buttons,animateSpeed,max) {
        return { max : max || 100,
                 bars : bars,
                 buttons : buttons,
                 animateSpeed : animateSpeed || 200
               };
    };
    
    window.ProgressBarDemoVO = ProgressBarDemoVO;
        
})( window );