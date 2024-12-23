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
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

import standard from 'gulp-standard';

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

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


const __dirname = path.resolve(path.dirname(''));


/**
 * Rollup.js Configuration
 *
 */
const rollupCfg = () => ({
  input: cfg.roll.input,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled',
    }),
    url({
      include: ['**/*.css', '**/*.html', '**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp']
    }),
    json(),
    alias({
      entries: [
        { find: 'src', replacement: `${__dirname}/src/javascript/` },
        { find: 'root', replacement: `${__dirname}/` }
      ],
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: ['node_modules/**'],
      sourceMap: true
    }),
  ],
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
    errorHandler.call(this, error);
    done(error);
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
const compressJS = (done) =>
  src('./dist/javascript/**/*.js')
    .pipe(plumber({ errorHandler }))
    .pipe(uglify())
    .pipe(size())
    .pipe(dest('./build/javascript/'))
    .on('end', done);


/**
 * Lints JavaScript files to ensure they follow coding standards.
 */
const standardJS = (done) =>
  src(['./dist/javascript/app.js'])
    .pipe(plumber({ errorHandler }))
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
    .on('end', done);

/**
 * Concat JS Libraries List
 */
const jsConcatVendorLibs = (jsVendorList, done) =>
  src(jsVendorList.src)
    .pipe(plumber({ errorHandler }))
    .pipe(concat('app.js'))
    .pipe(dest('./dist/javascript/'))
    .on('end', done);

export { roll, scriptsReload, compressJS, standardJS, jsConcatVendorLibs };
