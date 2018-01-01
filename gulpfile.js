const gulp = require("gulp"),
      sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      hash = require("gulp-hash"),
      del = require("del")

// Compile SCSS to CSS
gulp.task("scss", function() {

  // Delete old css files
  del(["static/css/**/*"])

  // Compile hashed css files
  gulp.src("src/scss/**/*.scss")
  .pipe(sass({
    outputStyle : "compressed"
  }))
  .pipe(autoprefixer({
    browsers: ["last 20 versions"]
  }))
  .pipe(hash())
  .pipe(gulp.dest("static/css"))
  .pipe(hash.manifest("hash.json"))
  .pipe(gulp.dest("data/css"))
})

// Process images
gulp.task("img", function() {
  del(["static/img/**/*"])
  gulp.src("src/img/**/*")
  .pipe(gulp.dest("static/img"))
})

// Copy js dependencies from node_modules to static directory
gulp.task("copy-js", function() {
  return gulp.src(["node_modules/picturefill/dist/picturefill.min.js"])
  .pipe(gulp.dest("src/js"))
})

// Hash js
gulp.task("js", function() {
  del(["static/js"])
  gulp.src("src/js/**/*")
  .pipe(hash())
  .pipe(gulp.dest("static/js"))
  .pipe(hash.manifest("hash.json"))
  .pipe(gulp.dest("data/js"))
})

// Watch asset folder for changes
gulp.task("watch", ["scss", "img", "js"], function() {
  gulp.watch("src/scss/**/*", ["scss"])
  gulp.watch("src/img/**/*", ["img"])
  gulp.watch("src/js/**/*", ["js"])
})