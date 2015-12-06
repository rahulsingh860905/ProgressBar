;( function( window ) {

    'use strict';
    
    		
/**
 * Progress Bar Component.
 * Dependencies Ractive.js,
 */
    var template =  '<div id="baseDiv" style="width:{{compWidth}};">'+
                    '<div id="bg" style="width:100%;height:{{height}}px">'+
                    '<div id="progressBar" style="width:{{bar.progress}}px;height:100%" class="{{progressBarStyle}}"/>'+
                    '<div id="progressBarText" style="width:100%;height:100%;line-height:{{height}}px;" class="ProgressBarTextDivStyle">{{label}}%</div>'+
                    '</div></div>';
    
    var ProgressBar = Ractive.extend({
        
        template: template,
        
        /**
		 * called upon initialisation.
         * set initial values to component properties
		 */
        oninit: function(){
            
            this.normalProgressBarStyle = "ProgressBarNormalStyle";
            this.overflowProgressBarStyle = "ProgressBarOverFlowStyle";
            
            this.max = this.get("max");
            this.min = 0;
            this.setWidth();
            
        },
        
        /**
		 * called upon completion.
         * set initial values to variables
		 */
        oncomplete: function(){
            
            this.comp = this.find("#baseDiv");
            this.progress = this.usage = this.scale(this.get("bar.progress"));
            
            this.set("progressBarStyle",this.normalProgressBarStyle);
            this.tween(this.progress);
            this.set("label",this.getUsagePercentage(this.progress));
            
        },
        
        /**
		 * Called while rendering.
         * Add required event listener for resizing and teardown events
		 */
        onrender: function () {
            
            var self = this, resizeHandler;
            
            window.addEventListener( 'resize', resizeHandler = function () {
                
                self.usage = self.scale(self.usagePercentage);
                
                if(self.usage<=self.scale(self.max)){
                    self.progress = self.usage;
                }else{
                    self.progress = self.scale(self.max);
                }
                
                self.set("bar.progress",self.progress);
                
            }, false );

            this.on( 'teardown', function () {
                window. removeEventListener( 'resize', resizeHandler );
            }, false );
        },
        
        /**
		 * set width of the component
         * Can be set in percentage or pixels
		 */
        setWidth: function(){
            
            var str = this.get("width").toString();
            var w;
            
            if("%" == str.substring(length-2,length-1)){
                w = str;
            }else{
                w = str + "px";
            }
            
            this.set("compWidth",w); 
        },
        
        /**
		 * increment progress to required percentage
         * @param {integer} value - percentage value to be increased
		 */
        increase:function(value){
            
            this.usage = this.usage + this.scale(value);
            
            if(this.usage<=this.scale(this.max)){
                this.progress = this.usage;
                this.tween(this.progress);
            }else{  
                this.progress = this.scale(this.max);
                this.set("progressBarStyle",this.overflowProgressBarStyle);
                this.tween(this.progress);
            }
            
            this.set("label",this.getUsagePercentage(this.usage));
        },
        
        /**
		 * decrement progress to required percentage
         * @param {integer} value - percentage value to be decreased
		 */
        decrease:function(value){
            
            this.usage = this.usage != 0 ? this.usage - this.scale(value) : this.min;
            
            if(this.usage < this.min && this.progress != this.min){
                this.progress = this.usage = this.min;
                this.tween(this.progress);
            }else if(this.usage >= this.min && this.usage <= this.scale(this.max)){
                this.progress = this.usage;
                this.set("progressBarStyle",this.normalProgressBarStyle);
                this.tween(this.progress);
            }
            
            this.set("label",this.getUsagePercentage(this.usage));
        },
        
        /**
		 * Scaling function 
         * @param {integer} value - percentage value to be scaled
		 * @return {integer} desired value in pixels
		 */
        scale:function(value){
            
            return this.comp.clientWidth/this.max*value;
        },
        
        /**
		 * Scaling function 
         * @param {integer} value - usage value
		 * @return {integer} corresponding percentage value
		 */
        getUsagePercentage:function(value){
            
            this.usagePercentage = Math.round(value/this.comp.clientWidth*this.max);
            
            return this.usagePercentage;
        },
        
        /**
		 * Animate the progress
		 * @return {integer} desired value in pixels
		 */
        tween:function(value){
            
            this.animate( "bar.progress", value,{ 
                duration: 50
            });
        },  
        
        /**
		 * Reset the component properties to initial values
		 */
        reset:function(){
        
            this.progress = this.usage = 0;
            
            this.set("progressBarStyle",this.normalProgressBarStyle);
            this.tween(this.progress);
            this.set("label",this.getUsagePercentage(this.progress));
        }
    });
    
    
    /**
    * Bar Value Object.
    * Used by ProgressBar Value Object
    */
    var BarVO = function(progress) {
        return { progress : progress
               };
    }
    
    /**
    * ProgressBar Value Object.
    * Used for constructing data to ProgressBar component
    */
    var ProgressBarVO = function(width,height,max,progress) {
        return { width : width,
                 height : height,
                 max : max,
                 bar : new BarVO(progress)
               };
    }
    
    Ractive.components.ProgressBar = ProgressBar;
    
    window.BarVO = BarVO;
    window.ProgressBarVO = ProgressBarVO;
    window.ProgressBar = ProgressBar;
    
})( window );
;( function( window ) {

    'use strict';
    
    /**
    * Progress Bar Demo.
    * Dependencies Ractive.js,ProgressBar.js
    */
    var template =  '<div id="compContainer">'+
                    '{{#each bars:i}}'+ 
                    '<progressBarComp width={{width}} height={{height}} max={{max}} bar="{{bars[i]}}"/>'+
                    '<br>'+
                    '{{/each}}'+
    
                    '<select value="{{selectedIndex}}">'+
                    '{{#each bars:i}}'+
                    '<option value="{{i}}">Progress Bar {{i+1}}</option>'+
                    '{{/each}}'+
                    '</select>'+
                    '<button class="btn" type="button" on-click="callDecrease:25">-25</button>'+
                    '<button class="btn" type="button" on-click="callDecrease:10">-10</button>'+ 
                    '<button class="btn" type="button" on-click="callIncrease:10">+10</button>'+ 
                    '<button class="btn" type="button" on-click="callIncrease:25">+25</button>'+
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
    var ProgressBarDemoVO = function(width,height,max,bars) {
        return { width : width,
                 height : height,
                 max : max,
                 bars : bars
               };
    }
    
    Ractive.components.ProgressBarDemo = ProgressBarDemo;
    
    window.ProgressBarDemo = ProgressBarDemo;
    window.ProgressBarDemoVO = ProgressBarDemoVO;
        
})( window );