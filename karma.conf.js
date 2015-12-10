module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/ractive/ractive.min.js',
      'app/components/**/*.js',
      'tests/*.js'
    ],

    frameworks: ['jasmine'],
      
    autoWatch : true,
    
    colors: true,
      
    logLevel: config.LOG_INFO,

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],
      
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};