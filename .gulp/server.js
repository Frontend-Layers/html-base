import gulp from 'gulp';
const { src, dest, parallel } = gulp;

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

/**
 * Environment
 */
import dotenv from 'dotenv';
dotenv.config();

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

/**
 * Config
 */
const cfg = {
  server: {
    host: '0.0.0.0',
    root: './dist/',
    port: process.env.PORT || 4000,
    src: './dist/index.html',
    uri: `http://localhost:${process.env.PORT || 4000}/`,
  },
  lt: process.env.LT || false,
  subdomain: process.env.SUBDOMAIN || '',
};

const bs = browserSync.create();

/**
 * Logging
 */
const log = (message, color = '\x1b[32m') => {
  const reset = '\x1b[0m';
  const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
  console.log(`[${color}${timestamp}${reset}] ${message}`);
};

/**
 * Create Local Web Server
 */
const openServer = (done) => {
  const middleware = (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
      log(`[Server] Method: ${req.method}, URL: ${req.url}`);
      if (req.method === 'POST' || req.method === 'PUT') {
        log(`[Server] Body: ${JSON.stringify(req.body)}`);
      }
    }
    next();
  };

  connect.server({
    host: cfg.server.host,
    root: cfg.server.root,
    port: cfg.server.port,
    livereload: true,
    middleware: () => [middleware],
  });

  done();
};

/**
 * Open Default Browser
 */
const openBrowser = async (done) => {
  log(`[System] Opening browser at: ${cfg.server.uri}`, '\x1b[35m');
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
const cleanBuild = async (done) => {
  await deleteAsync(['./build/**/*']);
  done();
};

/**
 * Clean
 * Delete the dist directory
 */
const cleanDist = async (done) => {
  await deleteAsync(['./dist/**/*']);
  done();
};

/**
 * Clean
 * Delete the layouts directories in dist and build
 */
const cleanHTML = async (done) => {
  await deleteAsync(['./dist/layouts', './build/layouts']);
  done();
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
        subdomain: cfg.subdomain,
      });

      log(`Tunnel: ${tunnel.url}`);

      tunnel.on('close', () => {
        log('Tunnel closed');
      });

      done();
    } catch (error) {
      errorHandler('Error in openProxyTunnel task', error);
      done(error);
    }
  } else {
    done();
  }
};

export { openServer, openBrowser, bumper, cleanBuild, cleanDist, cleanHTML, openProxyTunnel, bs };
