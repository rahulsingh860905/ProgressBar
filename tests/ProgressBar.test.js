'use strict';


    var div1 = document.createElement("div");
    div1.setAttribute("id", "container1");
    document.body.appendChild(div1);

    var width = "500";
    var height = 40;
    var max = 100;
    var progress = 0;
    
    var pb1 = new ProgressBar({
        el: "#container1",
        data:function(){return new ProgressBarVO(width,height,max,progress);}
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
                it("Converts percentage value to pixel value", function () {
                    expect(scale(max)).toEqual(parseInt(width));
                });
            }),

            describe( "Incrementer test :", function () {
                var incValue = 40;
                var finalValue = 0;
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
                it("display the progress in percentage", function () {
                    pb1.reset();
                    increment(40);
                    expect(getUsagePercentage()).toEqual(40);
                });
            })
        
        });
    }

    runTests();

    function resizeTest(){
        window.resizeTo(300, 600);
        describe('Progress Bar tests after resizing window =>', function(){
            runTests();
        });
    };
    
    resizeTest();
    