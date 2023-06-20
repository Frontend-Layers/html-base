import gulp from 'gulp';
const { src, dest } = gulp;

/**
 * System
 */
import { deleteAsync } from 'del';
import localtunnel from 'localtunnel';

/**
 * Notification
 */
import plumber from 'gulp-plumber';

/**
 * Versioning
 */
import bump from 'gulp-bump';

/**
 * Server
 */
import connect from 'gulp-connect';
import open from 'gulp-open';

import dotenv from 'dotenv';
dotenv.config();

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


/**
 * Create Local Web Server
 */
const openServer = () => {
  connect.server({
    host: cfg.server.host,
    root: cfg.server.root,
    port: cfg.server.port,
    livereload: true
  });
};

/**
 * Open Default Browser
 */
const openBrowser = () =>
  src(cfg.server.src)
    .pipe(plumber())
    .pipe(
      open({
        uri: cfg.server.uri,
      })
    );

/**
 * Patching
 */
const bumper = () => src('./package.json').pipe(bump()).pipe(dest('./'));

/**
 * Clean
 */
const cleanBuild = () => {
  return deleteAsync(['./build']);
};

const cleanDist = () => {
  return deleteAsync(['./dist']);
};

const cleanHTML = () => {
  return deleteAsync(['./dist/layouts', './build/layouts']);
};

/**
 * Proxy Tunneling (localtunnel)
 */
const openProxyTunnel = async () => {
  if (cfg.lt) {

    const tunnel = await localtunnel({
      port: cfg.server.port,
      subdomain
    });

    console.log('Tunnel: ' + tunnel.url);


    tunnel.on('close', () => {
      // tunnels are closed
    });
  }
};



export { openServer, openBrowser, bumper, cleanBuild, cleanDist, cleanHTML, openProxyTunnel };
