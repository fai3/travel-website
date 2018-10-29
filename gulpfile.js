var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  nested = require("postcss-nested"),
  cssimport = require("postcss-import"),
  hexToRgba = require("postcss-hexrgba"),
  mixins = require("postcss-mixins"),
  browserSync = require("browser-sync").create(),
  webpack = require("webpack");
gulp.task("default", function() {
  console.log("default task dzdz");
});

gulp.task("style", function() {
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(
      postcss([cssimport, cssvars, mixins, hexToRgba, nested, autoprefixer])
    )
    .on("error", function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
});
gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  watch("./app/index.html", function() {
    browserSync.reload();
  });
  watch("./app/assets/styles/**/*.css", function() {
    gulp.start("cssInject");
  });
  watch("./app/assets/scripts/**/*.js", function() {
    gulp.start("scriptsRefresh");
  });
});

gulp.task("cssInject", ["style"], function() {
  return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream());
});
gulp.task("scripts", function(callback) {
  webpack(require("./webpack.config.js"), function(err, stats) {
     if(err){
       console.log(err.toString());
     } 
    console.log(stats.toString());
    callback();
  });
});
gulp.task("scriptsRefresh", ["scripts"], function() {
  browserSync.reload();
});
