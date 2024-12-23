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
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import standard from 'gulp-standard';
import json from '@rollup/plugin-json';

import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const __dirname = path.resolve(path.dirname(''));

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
  rollES: {
    input: './src/javascript/ui-explorer/index.js',
    output: './dist/javascript/ui-explorer.es.js',
    format: 'es',
  },
  rollUMD: {
    input: './src/javascript/ui-explorer/index.js',
    output: './dist/javascript/ui-explorer.umd.js',
    format: 'umd',
  }
};


const rollCfg = {
  input: cfg.roll.input,
  plugins: [
    postcss({
      modules: false,
      extract: false,
      namedExports: false,
      inject: false,
      plugins: [
        autoprefixer(),
      ]
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      babelHelpers: 'bundled'
    }),
    alias({
      entries: [
        { find: 'src', replacement: `${__dirname}/src/javascript/` },
        { find: 'root', replacement: `${__dirname}` }
      ],
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: ['node_modules/**'],
      exclude: [],
      sourceMap: false
    }),
    json(),
    url({
      include: ['**/*.html', '**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp']
    })
  ],
};


/**
 * JavaScript
 * ================================================================================
 */


/**
 * Rollup.js
 */
const roll = () =>
  rollup(rollCfg)
    .then((bundle) => {
      return bundle.write({
        file: cfg.roll.output,
        format: cfg.roll.format,
        name: 'library',
        sourcemap: true,
      });
    });


/**
 * Rollup.js for ES modules
 */
const rollES = () =>
  rollup(rollCfg)
    .then((bundle) => {
      return bundle.write(
        {
          file: cfg.rollES.output,
          format: cfg.rollES.format,
          name: 'Library',
          sourcemap: false,
          indent: '\t'
        }
      );
    });

/**
 * Rollup.js for ES modules
 */
const rollUMD = () =>
  rollup(rollCfg)
    .then((bundle) => {
      return bundle.write(
        {
          file: cfg.rollUMD.output,
          format: cfg.rollUMD.format,
          name: 'Library',
          sourcemap: false,
          indent: '\t'
        }
      );
    });


// Reload Browser after JS Changes
const scriptsReload = () => src(cfg.src.js)
  .pipe(connect.reload());


// JS Minify
const compressJS = () =>
  src('./dist/javascript/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        const defColor = util.inspect.styles.date;
        util.inspect.styles.date = 'red';
        fancyLog(error.messageFormatted || error.message);
        util.inspect.styles.date = defColor;
        this.emit('end');
      }
    }))
    .pipe(uglify())
    .pipe(size())
    .pipe(dest('./build/javascript/'));

/**
 * StandardJS
 *
 * @description Lint JavaScript files
 */
const standardJS = () =>
  src(['./dist/javascript/app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }));

export { roll, rollES, rollUMD, scriptsReload, compressJS, standardJS };
