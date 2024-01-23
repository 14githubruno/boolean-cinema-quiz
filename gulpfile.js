import gulp from "gulp";
const { src, dest, series, watch } = gulp;
// scss into css
import * as sass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(sass);
// gulp autoprefix/minify css
import autoprefixer from "autoprefixer";
import postCss from "gulp-postcss";
import cssNano from "cssnano";
// gulp minify/concat js
import concat from "gulp-concat";
import terser from "gulp-terser";
// renaming gulp
import rename from "gulp-rename";

// min.css
const makeMinCss = () => {
  return src("./src/styles/sass/style.scss", { sourcemaps: true })
    .pipe(scss())
    .pipe(postCss([autoprefixer(), cssNano()]))
    .pipe(rename("style.min.css"))
    .pipe(dest("./dist/css/", { sourcemaps: "." }));
};

// min.js
const makeMinJs = () => {
  return src("./src/scripts/**/*.js", { sourcemaps: true })
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(dest("./dist/js/", { sourcemaps: "." }));
};

// watch
const watchTask = () => {
  watch(
    ["./src/styles/sass/style.scss", "./src/scripts/**/*.js"],
    series(makeMinCss, makeMinJs)
  );
};

export default series(makeMinCss, makeMinJs, watchTask);
