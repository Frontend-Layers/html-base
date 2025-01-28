/**
 * Images
 * ================================================================================
 */

import gulp from 'gulp';
const { src, dest } = gulp;

import newer from 'gulp-newer';

/**
 * Images
 */
import webp from 'gulp-webp';

/**
 * SVG
 */
import sprite from 'gulp-svg-sprite';

/**
 * Notification
 */
import plumber from 'gulp-plumber';

/**
 * System
 */
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';



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
 * WebP Convertor
 * @src: https://www.smashingmagazine.com/2018/07/converting-images-to-webp/
 */
const webpCompress = () =>
  src(cfg.src.webp)
    .pipe(plumber({ errorHandler }))
    .pipe(newer(cfg.dest.img))
    .pipe(
      webp({ quality: process.env.WEBP_QUALITY || 100 })
    )
    .pipe(dest(cfg.dest.img))
    .pipe(dest(cfg.build.img));

/**
 * Copy images
 */
const copyImages = () =>
  src('./src/images/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(newer(cfg.dest.img))
    .pipe(dest(cfg.dest.img))
    .pipe(dest(cfg.build.img));

export { webpCompress, copyImages };
