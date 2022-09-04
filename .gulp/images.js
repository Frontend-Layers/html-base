import gulp from 'gulp';
const { src, dest } = gulp

import cache from 'gulp-cache'

/**
 * Images
 */
import imagemin from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant'
import imageminZopfli from 'imagemin-zopfli'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminJpegRecompress from 'imagemin-jpeg-recompress'
import imageminGiflossy from 'imagemin-giflossy'
import webp from 'gulp-webp'

/**
 * SVG
 */
import sprite from 'gulp-svg-sprite'


/**
 * Settings
 * ================================================================================
 */

/**
 * Config
 */
const cfg = {
  src: {
    img: './src/images/**/*',
    webp: './dist/images/**/*.{png,jpg,jpeg}',
  },
  dest: {
    img: './dist/images/',
    webp: './dist/images/**/*.{png,jpg,jpeg}',
  },
  build: {
    img: './build/images/',
  }
}

/**
 * Images
 * ================================================================================
 */

// Images Minify
const imagesCompress = () =>
  src(cfg.src.img)
    .pipe(
      cache(
        imagemin([
          imageminPngquant({
            speed: 1,
            quality: [0.95, 1],
          }),
          imageminZopfli({
            more: true,
          }),
          imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3, //keep-empty: Preserve empty transparent frames
            lossy: 2,
          }),
          imagemin.svgo({
            plugins: [
              { optimizationLevel: 3 },
              { progressive: true },
              { interlaced: true },
              { removeViewBox: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false },
            ],
          }),
          imagemin.mozjpeg({
            progressive: true,
          }),
          imageminJpegRecompress({
            loops: 6,
            min: 40,
            max: 85,
            quality: 'low',
          }),
          imageminMozjpeg({
            quality: 90,
          }),
        ])
      )
    )
    .pipe(dest(cfg.dest.img))

/**
 * Webp
 * @src: https://www.smashingmagazine.com/2018/07/converting-images-to-webp/
 */
const webpCompress = () =>
  src(cfg.src.webp)
    .pipe(
      cache(
        webp({
          quality: 75,
        })
      )
    )
    .pipe(dest(cfg.dest.img))

/**
 * SVG Sprite
 */

const genSvgSprite = () =>
  src('./src/images/sprite/*.svg')
    .pipe(
      sprite({
        transform: ['svgo'],
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            render: {
              scss: {
                dest: '../../scss/_sprite.scss',
              },
            },
          },
        },
      })
    )
    .pipe(dest('./src/images/'))

const imgCopy = () => src('./src/images/**/*').pipe(dest('./dist/images/')).pipe(dest('./build/images/'))

export { imagesCompress, webpCompress, genSvgSprite, imgCopy }
