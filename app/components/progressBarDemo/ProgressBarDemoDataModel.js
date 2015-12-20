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