var gulp = require('gulp');
var clean = require('gulp-clean');
var g_less = require('gulp-less');
var g_uglify = require('gulp-uglify');
var g_concat = require('gulp-concat');
var runSequence = require('run-sequence');
var concat_util = require('gulp-concat-util');
var del = require('del');
var Q = require('q');
var bowerFiles = require('main-bower-files');
var plugins = require('gulp-load-plugins')();

// use shell for asdoc creation using gulp
var shell = require('gulp-shell');

var bases = {
 source: 'app',
 dist:'dist',
 css:'css',
 js:'js',
 distLibName:'jscomponents.js',
 distMinLibName:'jscomponents.min.js',
 distCssName:'jscomponents.css',
 distMinCSSName:'jscomponents.min.css',
 docsOut:'docs',
 docSource:'app/**/*'
};

var paths = {
    source: ['**/*'],
    scripts_source:['components/**/*.js'],
    css_source:['**/*.css'],
    mincss_source:['**/*.min.css'],
    less_source:['**/*.less'],
    validateAppScripts: ['app/bower_components/**/*.js'],
    index: './app/index.html',
    distProd: './dist',
    distScriptsProd: './dist/scripts'
};

gulp.task('install', function() {

  gulp.src(paths.source,{cwd: bases.source})
  .pipe(gulp.dest(bases.dist));

});

gulp.task('clean', function() {

 return gulp.src(bases.dist)
 .pipe(clean());
});

gulp.task('concatJS', function() {
  return gulp.src(paths.scripts_source,{cwd: bases.source})
    .pipe(g_concat(bases.distLibName))
    .pipe(gulp.dest(bases.dist+'/'+bases.js));
});

gulp.task('minifyJS', function() {
  return gulp.src(paths.scripts_source,{cwd: bases.source})
    .pipe(g_uglify())
    .pipe(g_concat(bases.distMinLibName))
    .pipe(gulp.dest(bases.dist+'/'+bases.js));
});

gulp.task('less',function () {
   var cssPath = bases.source+'/';
   gulp.src(paths.less_source,{cwd: bases.source})
    .pipe(gulp.dest(function(file) {

      var relative = file.relative;
      var relpaths = relative.split('/');
      if(relpaths.length > 1)
      {
        for (var i = 0 ; i < relpaths.length-1 ; i++)
        {
          cssPath += relpaths[i]+'/';
        }
      }

      cssPath = bases.source+'/';
      return file.base;
    }))
    .pipe(g_less())

    .pipe(gulp.dest(cssPath));
});

gulp.task('concatCss', function() {
  return gulp.src(paths.css_source,{cwd: bases.source})
    .pipe(g_concat(bases.distCssName))
    .pipe(gulp.dest(bases.dist+'/css'));
});

gulp.task('minifyCSS', function() {
  return gulp.src(paths.css_source,{cwd: bases.source})
    .pipe(g_concat(bases.distMinCSSName))
    .pipe(gulp.dest(bases.dist+'/'+bases.css));
});

gulp.task('jsdoc', shell.task( [
  './node_modules/jsdoc/jsdoc.js -d '+bases.docsOut+' -r '+bases.docSource
] ) );

gulp.task('cleanDocs', function() {

 return gulp.src(bases.docsOut)
 .pipe(clean());
});

gulp.task('bower-prod', function() {
    return gulp.src(bowerFiles(), {base: 'app/bower_components'})
        .pipe(g_uglify())
        .pipe(gulp.dest(paths.distProd + '/bower_components'));
});
   
gulp.task('validate-app-scripts-prod', function(){
    return gulp.src(paths.validateAppScripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

gulp.task('validate-index-prod', function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
});

gulp.task('default',['build-dist']);

gulp.task('build-dist', function() {
  runSequence(
    'clean',
    'concatJS',
    'minifyJS',
    'less',
    'concatCss',
    'minifyCSS',
    //cleanDocs,
    //jsdoc
    'bower-prod',
    'validate-app-scripts-prod',
    'validate-index-prod'
  );
});



// run following commond as per require or run
// 0.gulp
// 1. gulp clean
// 2. gulp less
// 3. gulp concat
// 4. gulp minify