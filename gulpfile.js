const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
    return src('src/scss/app.scss')
        .pipe(sass( { outputStyle: 'expanded'}))
        .pipe(postcss([ autoprefixer ]))
        .pipe(dest('build/css'))
}

function imgs() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function imgsWebp() {
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'));
}

function imgsAvif() {
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imgs);
}

exports.css = css;
exports.dev = dev;
exports.imgs = imgs;
exports.imgsWebp = imgsWebp;
exports.imgsAvif = imgsAvif;
exports.default= series(imgs, imgsWebp, imgsAvif, css, dev);
