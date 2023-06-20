import gulp from 'gulp';
const { src, dest } = gulp;

import cache from 'gulp-cache';

/**
 * Images
 */
import webp from 'gulp-webp';

/**
 * SVG
 */
import sprite from 'gulp-svg-sprite';


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
    webp: './src/images/**/*.{png,jpg,jpeg}'
  },
  dest: {
    img: './dist/images/',
    webp: './dist/images/',
  },
  build: {
    img: './build/images/',
  }
};

/**
 * Images
 * ================================================================================
 */


/**
 * Webp
 * @src: https://www.smashingmagazine.com/2018/07/converting-images-to-webp/
 */
const webpCompress = () =>
  src(cfg.src.webp)
    .pipe(
      cache(
        webp({ quality: 100 })
      )
    )
    .pipe(dest(cfg.dest.img))
    .pipe(dest(cfg.build.img));


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
    .pipe(dest('./src/images/'));

const imgCopy = () => src('./src/images/**/*').pipe(dest('./dist/images/')).pipe(dest('./build/images/'));

export { webpCompress, genSvgSprite, imgCopy };
