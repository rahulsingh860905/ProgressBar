;( function( window ) {

    'use strict';
    
    /**
    * Progress Bar Demo.
    * Dependencies Ractive.js,ProgressBar.js
    */
    var template =  '<div class="pbd-compContainer">'+
                    '{{#each bars:i}}'+ 
                    '<progressBarComp max={{max}} bar="{{bars[i]}}"/>'+
                    '<br>'+
                    '{{/each}}'+
                    '<div class="controls">'+
                    '<select class="selct" value="{{selectedIndex}}">'+
                    '{{#each bars:i}}'+
                    '<option value="{{i}}">Progress Bar {{i+1}}</option>'+
                    '{{/each}}'+
                    '</select>'+
                    '<button class="btn" type="button" on-click="callDecrease:25">-25</button>'+
                    '<button class="btn" type="button" on-click="callDecrease:10">-10</button>'+ 
                    '<button class="btn" type="button" on-click="callIncrease:10">+10</button>'+ 
                    '<button class="btn" type="button" on-click="callIncrease:25">+25</button>'+
                    '</div>'+
                    '</div>';
    
    var ProgressBarDemo = Ractive.extend({
        
        template: template,
        
        components:
        {   
            progressBarComp: ProgressBar
        },
        
                
        /**
		 * called upon initialisation.
         * set initial values to component properties
		 */
        oninit: function (){
            
            this.selectedProgressBar = this.findAllComponents()[0];
            this.addEventListeners();
        },
        
        /**
		 * Add Event Listeners
		 */
        addEventListeners:function(){
            
            this.on({
                
                callIncrease: function (event, value) { 
                    this.selectedProgressBar.increase(value);
                },
                
                callDecrease: function (event, value) {
                    this.selectedProgressBar.decrease(value);
                }
            });
            
            this.observe( 'selectedIndex', function ( index ) {
                this.selectedProgressBar = this.findAllComponents()[index];
            });
        }
    });
    
    
    /**
    * ProgressBarDemo Value Object.
    * Used for constructing data to ProgressBarDemo
    */
    var ProgressBarDemoVO = function(max,bars) {
        return { max : max,
                 bars : bars
               };
    };
    
    Ractive.components.ProgressBarDemo = ProgressBarDemo;
    
    window.ProgressBarDemo = ProgressBarDemo;
    window.ProgressBarDemoVO = ProgressBarDemoVO;
        
})( window );