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