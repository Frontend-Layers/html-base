import gulp from 'gulp';
const { src, dest } = gulp;


/**
 * System
 */
import path from 'path';
import connect from 'gulp-connect';


/**
 * Notification
 */
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
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
import json from "@rollup/plugin-json";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

import standard from 'gulp-standard';

/**
 * Settings
 * ================================================================================
 */

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
 * JavaScript
 * ================================================================================
 */


/**
 * Rollup.js
 */
const roll = () =>
  rollup({
    input: cfg.roll.input,
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
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
        exclude: [],
        sourceMap: true
      }),
    ],
  })
    .then((bundle) => {
      return bundle.write({
        file: cfg.roll.output,
        format: cfg.roll.format,
        name: 'library',
        sourcemap: false,
      });
    });

// Reload Browser after JS Changes
const scriptsReload = () => src(cfg.src.js)
  .pipe(connect.reload());


// JS Minify
const compressJS = () =>
  src('./dist/javascript/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .on('error', notify.onError())
    .pipe(size())
    .pipe(dest('./build/javascript/'));


const standardJS = () =>
  src(['./dist/javascript/app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }));


export { roll, scriptsReload, compressJS, standardJS };
