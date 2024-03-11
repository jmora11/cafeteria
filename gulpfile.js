const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    src('src/scss/app.scss')
        .pipe(sass( { outputStyle: 'expanded'}))
        .pipe(postcss([ autoprefixer ]))
        .pipe(dest('build/css'))

    done();
}

function imgs() {
    return src('src/img/**/*')
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imgs);
}

exports.css = css;
exports.dev = dev;
exports.imgs = imgs;
exports.default= series(imgs, css, dev);