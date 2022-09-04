import gulp from 'gulp';
const { src, dest } = gulp

/**
 * System
 */
import { deleteAsync } from 'del'
import localtunnel from 'localtunnel'

/**
 * Notification
 */
import plumber from 'gulp-plumber'

/**
 * Versioning
 */
import bump from 'gulp-bump'

/**
 * Server
 */
import connect from 'gulp-connect'
import open from 'gulp-open'



/**
* Config
*/

/**
 *
 */
// const subdomain = 'html-initial-bundle'
const subdomain = ''

const cfg = {
  server: {
    host: '0.0.0.0',
    root: './dist/',
    port: 4000,
    src: './dist/index.html',
    uri: 'http://localhost:4000/',
  }
}


/**
 * Create Local Web Server
 */
const openServer = () => {
  connect.server({
    host: cfg.server.host,
    root: cfg.server.root,
    port: cfg.server.port,
    livereload: true
  })
}

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
    )

/**
 * Patching
 */
const bumper = () => src('./package.json').pipe(bump()).pipe(dest('./'))

/**
 * Clean
 */
const clean = () => {
  return deleteAsync(['./build'])
}

const cleanDist = () => {
  return deleteAsync(['./dist/layouts'])
}

/**
 * Proxy Tunneling (localtunnel)
 */
const lt = async () => {
  const tunnel = await localtunnel({
    port: cfg.server.port,
    subdomain
  });

  console.log('Tunnel: ' + tunnel.url)


  tunnel.on('close', () => {
    // tunnels are closed
  });
}



export { openServer, openBrowser, bumper, clean, cleanDist, lt }
