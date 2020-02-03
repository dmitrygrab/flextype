const gulp = require('gulp');
const tailwindConfig = "tailwind.config.js";

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  }
}

/**
 * Task: gulp css-vendor
 */
 gulp.task("css-vendor", function() {
   const concat = require('gulp-concat');
   const csso = require('gulp-csso');
   const autoprefixer = require('gulp-autoprefixer');

   return gulp
     .src([
           // Select2
          'node_modules/select2/dist/css/select2.min.css',

          // Swal2
          'node_modules/sweetalert2/dist/sweetalert2.min.css',

          // AnimateCSS
          'node_modules/animate.css/animate.min.css',

           // CodeMirror
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/theme/elegant.css'])
     .pipe(autoprefixer({
         overrideBrowserslist: [
             "last 1 version"
         ],
         cascade: false
     }))
     .pipe(csso())
     .pipe(concat('vendor-build.min.css'))
     .pipe(gulp.dest("assets/dist/css/"));
 });


/**
 * Task: gulp css
 */
gulp.task("css", function() {
  const atimport = require("postcss-import");
  const postcss = require("gulp-postcss");
  const tailwindcss = require("tailwindcss");
  const purgecss = require("gulp-purgecss");
  const concat = require('gulp-concat');
  const csso = require('gulp-csso');
  const sourcemaps = require('gulp-sourcemaps');
  const autoprefixer = require('gulp-autoprefixer');

  return gulp
    .src([
           // Admin Panel CSS
          'assets/src/admin-panel.css'])
    .pipe(postcss([atimport(), tailwindcss(tailwindConfig)]))
    .pipe(
      purgecss({
        content: ["**/*.html"],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ["html"]
          }
        ]
      })
    )
    .pipe(autoprefixer({
        overrideBrowserslist: [
            "last 1 version"
        ],
        cascade: false
    }))
    .pipe(csso())
    .pipe(concat('admin-panel-build.min.css'))
    .pipe(gulp.dest("assets/dist/css/"));
});

/**
 * Task: gulp js
 */
 gulp.task('js', function(){
   const sourcemaps = require('gulp-sourcemaps');
   const concat = require('gulp-concat');

   return gulp.src([ // jQuery
                    'node_modules/jquery/dist/jquery.min.js',

                    // Select2
                    'node_modules/select2/dist/js/select2.min.js',

                    // Swal2
                    'node_modules/sweetalert2/dist/sweetalert2.min.js',

                    // ParsleyJS Form Validatator
                    'node_modules/parsleyjs/dist/parsley.min.js',

                    // SpeakingURL
                    'node_modules/speakingurl/speakingurl.min.js',

                    // Popper
                    'node_modules/tippy.js/node_modules/popper.js/dist/umd/popper.min.js',

                    // Tippy
                    'node_modules/tippy.js/dist/tippy-bundle.iife.min.js',

                    // CodeMirror
                    'node_modules/codemirror/lib/codemirror.js',
                    'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
                    'node_modules/codemirror/mode/xml/xml.js',
                    'node_modules/codemirror/mode/javascript/javascript.js',
                    'node_modules/codemirror/mode/php/php.js',
                    'node_modules/codemirror/mode/clike/clike.js',
                    'node_modules/codemirror/mode/yaml/yaml.js'
                 ])
     .pipe(sourcemaps.init())
     .pipe(concat('admin-panel-build.min.js'))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('assets/dist/js/'));
 });

/**
 * Task: gulp watch
 */
gulp.task('watch', function () {
    gulp.watch(["**/*.html", "assets/src/"], gulp.series('css-vendor', 'css', 'js'));
});
