/**
 * Javascript Tasks
 * ================================================================================
 */


import gulp from 'gulp';
const { src, dest } = gulp;

/**
 * System
 */
import path from 'path';
import connect from 'gulp-connect';
import concat from 'gulp-concat';

/**
 * Notification
 */
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import fancyLog from 'fancy-log';

/**
 * Compressors
 */
import uglify from 'gulp-uglify';

/**
 * JavaScript
 */
import { rollup } from 'rollup';

import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { visualizer } from "rollup-plugin-visualizer";

import standard from 'gulp-standard';

/**
 * Performance
 */
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import remember from 'gulp-remember';


/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

const __dirname = path.resolve(path.dirname(''));

/**
 * Config
 */
const cfg = {
  src: {
    js: './src/javascript/**/*.js',
  },
  dest: {
    js: './src/javascript/**/*.js',
  },
  roll: {
    input: './src/javascript/app.js',
    output: './dist/javascript/app.js',
    format: 'iife',
  },
};


/**
 * Rollup.js Configuration
 */
const rollupCfg = () => ({
  input: cfg.roll.input,
  cache: true, // Enable Rollup cache
  treeshake: true, // Enable tree-shaking
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled'
    }),
    url({
      include: ['**/*.css', '**/*.html', '**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
      // limit: 10 * 1024 // Only inline files smaller than 10kb
    }),
    json(),
    alias({
      entries: [
        { find: 'src', replacement: `${__dirname}/src/javascript/` },
        { find: 'root', replacement: `${__dirname}/` }
      ],
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      mainFields: ['browser', 'module', 'main']
    }),
    commonjs({
      include: ['node_modules/**'],
      sourceMap: true
    }),
    visualizer({
      filename: `${__dirname}/src/report/js-bundle-report.html`,
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  onLog(level, log) {
    fancyLog('\x1b[33m[Rollup][Warning]\x1b[0m', '\x1b[0m' + log.message + '\x1b[0m');
  }
});


/**
 * Rollup.js tasks
 */
const roll = async function (done) {
  try {
    const bundle = await rollup(rollupCfg());

    await bundle.write({
      file: cfg.roll.output,
      format: cfg.roll.format,
      name: 'library',
      sourcemap: true,
    });

    done();
  } catch (error) {
    if (typeof errorHandler === 'function') {
      errorHandler.call(this, error);
    }
    done();
  }
};


/**
 * Reload Browser after JS Changes
 */
const scriptsReload = (done) =>
  src(cfg.src.js)
    .pipe(connect.reload())
    .on('end', done);


/**
 * Compress JavaScript
 */
const compressJS = () =>
  src('./dist/javascript/**/*.js')
    .pipe(plumber({ errorHandler }))
    .pipe(changed('./build/javascript/'))
    .pipe(uglify({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }))
    .pipe(size({ showFiles: true }))
    .pipe(dest('./build/javascript/'));

/**
 * Lints JavaScript files to ensure they follow coding standards.
 */
const standardJS = () =>
  src(['./dist/javascript/app.js'])
    .pipe(plumber({ errorHandler }))
    .pipe(cached('lint'))
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }));

/**
 * Concat JS Libraries List
 */
const jsConcatVendorLibs = (jsVendorList, done) =>
  src(jsVendorList.src, { allowEmpty: true })
    .pipe(plumber({ errorHandler }))
    .pipe(cached('concat'))
    .pipe(remember('concat'))
    .pipe(concat('app.js'))
    .pipe(dest('./dist/javascript/'));

export { roll, scriptsReload, compressJS, standardJS, jsConcatVendorLibs };
