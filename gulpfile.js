//define gulp plugins
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var mcss = require("gulp-mcss");
var mocha = require("gulp-mocha");
var util = require("gulp-util");

gulp.task("default", function(){
//This is where code for default task goes
});

//This is a sub task I teased out from the js tasks to create a JavaScript hint tool to help with coding.
gulp.task("hint", function(){
    gulp.src(["public/js/**/*.js", "!public/js/**/*.min.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
});

//minifies and concats for load speed.
gulp.task("js-to-build", function(){
    return gulp.src("public/js/**/*.min.js")
        .pipe(gulp.dest("build/js"))
});

gulp.task("js", ["hint", "js-to-build"], function(){
    return gulp.src(["public/js/**/*.js", "!public/js/**/*.min.js"])
        .pipe(uglify())
        .pipe(concat("app.js"))
        .pipe(gulp.dest("build/js"))
});

gulp.task("css-to-build", function(){
    return gulp.src("public/css/**/*.min.css")
        .pipe(gulp.dest("build/css"))
});

gulp.task("css", ["css-to-build"], function(){
    return gulp.src(["public/css/**/*.css", "!public/css/**/*.min.css"])
        .pipe(mcss())
        .pipe(concat("main.css"))
        .pipe(gulp.dest("build/css"))
});

gulp.task("build", ["js", "css"])

//loads tests from test folder and runs them.
gulp.task("test", function(){
    return gulp.src(["test/**/*.js"], {read:false})
                .pipe(mocha({reporter: "spec"}))
                .on("error", util.log);
});