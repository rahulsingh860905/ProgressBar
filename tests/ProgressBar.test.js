'use strict';

    Ractive.DEBUG = false;

    var div1 = document.createElement("div");
    div1.setAttribute("id", "container1");
    document.body.appendChild(div1);

    var max = 100;
    var progress = 0;
    
    var pb1;

    Ractive.load({
        ProgressBar: 'base/app/components/progressBar/ProgressBar.html',
    }).then(function(components){

        pb1 = new components.ProgressBar({
            el: '#container1',
            data:function(){return new ProgressBarVO(max,progress);}
        });
        
        runTests();
        
        resizeTest();
        
    });
    
    function increment(value){
        pb1.increase(value);
        return pb1.usage;
    }

    function decrement(value){
        pb1.decrease(value);
        return pb1.usage;
    }

    function scale(value){
        return pb1.scale(value);
    }

    function getUsagePercentage(){
        return pb1.getUsagePercentage(pb1.usage);
    }

    function runTests(){
        describe('Progress Bar tests =>', function(){
    
            describe( "Scale test :", function () {
                beforeEach(function(done) {
                 done();
                });
                it("Converts percentage value to pixel value", function (done) {
                    expect(scale(max)).toEqual(parseInt(width));
                });
            }),

            describe( "Incrementer test :", function () {
                var incValue = 40;
                var finalValue = 0;
                beforeEach(function(done) {
                 done();
                });
                it("increments progress bar to specified percentage", function () {
                    pb1.reset();

                    finalValue += incValue;
                    expect(increment(incValue)).toEqual(scale(finalValue));
                    finalValue += incValue;
                    expect(increment(incValue)).toEqual(scale(finalValue));
                });
            }),

            describe( "Decrementer test :", function () {
                var decValue = 40;
                var finalValue = 80;
                beforeEach(function(done) {
                 done();
                });
                it("decrements progress bar to specified percentage", function () {
                    pb1.reset();

                    increment(finalValue);
                    finalValue -= decValue;
                    expect(decrement(decValue)).toEqual(scale(finalValue));
                    finalValue -= decValue;
                    expect(decrement(decValue)).toEqual(scale(finalValue));
                });
                it("progress bar percentage should not be less than zero", function () {
                    expect(decrement(decValue)).toEqual(scale(0));
                });
            }),

            describe( "Progress Percentage Test :", function () {
                beforeEach(function(done) {
                 done();
                });
                it("display the progress in percentage", function () {
                    pb1.reset();
                    increment(40);
                    expect(getUsagePercentage()).toEqual(40);
                });
            })
        
        });
    }

    function resizeTest(){
        window.resizeTo(300, 600);
        describe('Progress Bar tests after resizing window =>', function(){
            runTests();
        });
    };
