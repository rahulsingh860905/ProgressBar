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
    var ProgressBarVO = function(max,progress) {
        return { max : max,
                 bar : new BarVO(progress)
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
    var ProgressBarDemoVO = function(max,bars) {
        return { max : max,
                 bars : bars
               };
    };
    
    window.ProgressBarDemoVO = ProgressBarDemoVO;
        
})( window );