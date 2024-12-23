import gulp from 'gulp';
const { src, dest } = gulp;

/**
 * System
 */
import { deleteAsync } from 'del';
import localtunnel from 'localtunnel';

/**
 * Versioning
 */
import bump from 'gulp-bump';

/**
 * Server
 */
import connect from 'gulp-connect';
import open from 'open';
import browserSync from 'browser-sync';


import dotenv from 'dotenv';
dotenv.config();

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

const port = process.env.PORT || 4000;
const subdomain = process.env.SUBDOMAIN || '';
const lt = process.env.LT || false;

/**
* Config
*/
const cfg = {
  server: {
    host: '0.0.0.0',
    root: './dist/',
    port,
    src: './dist/index.html',
    uri: `http://localhost:${port}/`,
  },
  lt
};

const bs = browserSync.create();

/**
 * Create Local Web Server
 */
const openServer = (done) => {

  const middleware = (req, res, next) => {
    const green = '\x1b[32m';
    const reset = '\x1b[0m';

    if (req.headers['content-type'] === 'application/json') {
      console.log(`${green}[Server]${reset} Method: ${req.method}, URL: ${req.url}`);
      if (req.method === 'POST' || req.method === 'PUT') {
        console.log(`${green}[Server]${reset} Body: ${JSON.stringify(req.body)}`);
      }
      console.log(`${green}[Server]${reset} JSON: ${JSON.stringify(req.body)}`);
    }

    next();
  };

  connect.server({
    host: cfg.server.host,
    root: cfg.server.root,
    port: cfg.server.port,
    livereload: true,
    middleware: () => [middleware]
  });

  // bs.init({
  //   proxy: cfg.server.uri,
  //   port: cfg.server.port + 1, // Используем порт + 1
  //   open: false,
  //   notify: false,
  //   ui: false,
  //   ghostMode: false,
  //   online: false,
  //   logLevel: 'silent',
  //   logPrefix: 'BrowserSync',
  //   logConnections: false,
  //   logFileChanges: false,
  //   logSnippet: false,
  //   reloadOnRestart: true,
  //   reloadDelay: 0,
  //   reloadDebounce: 500,
  //   injectChanges: true,
  //   codeSync: true,
  //   cors: true,
  //   scrollProportionally: false,
  //   scrollThrottle: 50,
  //   scrollRestoreTechnique: 'cookie',
  //   scrollElements: [],
  //   scrollElementMapping: [],
  //   minify: false,
  //   host: '0.0.0.0',
  //   serveStatic: ['./dist'],
  //   serveStaticOptions: {
  //     extensions: ['html']
  //   },
  //   watchOptions: {
  //     ignoreInitial: true,
  //     ignored: '*.txt'
  //   }
  // });

  done();
};

/**
 * Open Default Browser
 */
const openBrowser = async (done) => {
  const pink = '\x1b[35m';
  const reset = '\x1b[0m';
  const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });

  console.log(`[${pink}${timestamp}${reset}] Opening browser at: ${cfg.server.uri}`);
  try {
    await open(cfg.server.uri);
    done();
  } catch (err) {
    errorHandler('Error in openBrowser task', err);
    done(err);
  }
};

/**
 * Patching
 * Bump the version in package.json
 */
const bumper = (done) =>
  src('./package.json')
    .pipe(bump())
    .pipe(dest('./'))
    .on('end', done);

/**
 * Clean
 * Delete the build directory
 */
const cleanBuild = (done) => {
  return deleteAsync(['./build/**/*']).then(() => done());
};

/**
 * Clean
 * Delete the dist directory
 */
const cleanDist = (done) => {
  return deleteAsync(['./dist/**/*']).then(() => done());
};

/**
 * Clean
 * Delete the layouts directories in dist and build
 */
const cleanHTML = (done) => {
  deleteAsync(['./dist/layouts', './build/layouts']).then(() => done());
};

/**
 * Proxy Tunneling (localtunnel)
 * Create a localtunnel to expose the local server to the internet
 */
const openProxyTunnel = async (done) => {
  if (cfg.lt) {
    try {
      const tunnel = await localtunnel({
        port: cfg.server.port,
        subdomain
      });

      console.log('Tunnel: ' + tunnel.url);

      tunnel.on('close', () => {
        // tunnels are closed
      });

      done();
    } catch (error) {
      errorHandler.call(this, error);
      done(error);
    }
  } else {
    done();
  }
};



export { openServer, openBrowser, bumper, cleanBuild, cleanDist, cleanHTML, openProxyTunnel, bs };
