var gulp = require('gulp');
var clean = require('gulp-clean');
var g_less = require('gulp-less');
var g_cssmin = require('gulp-cssmin');
var g_uglify = require('gulp-uglify');
var g_concat = require('gulp-concat');
var runSequence = require('run-sequence');
var concat_util = require('gulp-concat-util');
var del = require('del');
var Q = require('q');
var bowerFiles = require('main-bower-files');
var plugins = require('gulp-load-plugins')();
var rename = require('gulp-rename');

// use shell for asdoc creation using gulp
var shell = require('gulp-shell');

var bases = {
 source: 'app',
 dist:'dist',
 css:'css',
 js:'js',
 distLibName:'components.js',
 distMinLibName:'components.min.js',
 docsOut:'docs',
 docSource:'app/**/*'
};

var paths = {
    source: ['**/*'],
    scripts_source:['components/**/*.js'],
    css_source:['./dist/css/*.css'],
    css_dest:['./dist/css'],
    mincss_source:['**/*.min.css'],
    less_source:['./app/styles/styles.less'],
    validateAppScripts: ['app/components/**/*.js'],
    index: './app/index.prod.html',
    compSrc: './app/components/**/*.html',
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
   var cssPath = bases.dist+'/css';
   gulp.src(paths.less_source)
    .pipe(g_less())
    .pipe(gulp.dest(cssPath));
});

gulp.task('minifyCSS', function() {
  return gulp.src(paths.css_source)
    .pipe(g_cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
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
        //.pipe(g_uglify())
        .pipe(gulp.dest(paths.distProd + '/bower_components'));
});

gulp.task('comp-prod', function() {
    return gulp.src(paths.compSrc)
        .pipe(gulp.dest(paths.distProd + '/components'));
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
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.distProd));
});

gulp.task('default',['build-dist']);

gulp.task('build-dist', function() {
  runSequence(
    'clean',
    'concatJS',
    'minifyJS',
    'less',
    'minifyCSS',
    'bower-prod',
    'comp-prod',
    'validate-app-scripts-prod',
    'validate-index-prod'
  );
});
