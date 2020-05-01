# html-initial-bundle

[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/andreymatin/html-initial-bundle/blob/master/LICENSE)

Layer 2. HTML layer with JS bundler for professional templates development

- Layer 1: Styles Reset
- Layer 2: Development phase (modeling, improving)
- Layer 3: Staging phase (review, testing, integration)

## Why

- JavaScript Applications Modeling
- Height quality HTML templates
- Routine tasks automation
- Easy integration into any theme/template systems

## Features

- Advanced CSS Reset [scss-reset](https://github.com/andreymatin/scss-reset)
- Predefined workflow automation tasks
- Old browsers support
- Visual Studio Code Tweaks
- SCSS Mixins

(\*) Styles Reset implemented as NPM package ())

### JavaScript

- Babel
- Rollup
- ES6+, IE11 support

### Tests

- Automated HTML5 W3C Validation

### Images Compression

- WEBP
- SVG (SVGOmg compression)
- Best practices for PNG/JPG



## Automation

Development config for fast and robust templates development. Compression for Images only.
Compression for JS, CSS and Compression/Beautifier for HTML will be for Layer 3 (Stage phase).

### Files

- ./gulpfile.js
- ./babel.config.js
- ./package.json

### Styles Automation

- gulp-sass
- gulp-postcss
- autoprefixer

### Server Automation

- gulp-connect
- gulp-open

### Notification

- gulp-plumber
- gulp-notify

### Source Maps

- gulp-sourcemaps

### JavaScript development

- rollup
- rollup-plugin-babel

### Images

- gulp-imagemin
- imagemin-pngquant
- imagemin-zopfli
- imagemin-mozjpeg
- imagemin-jpeg-recompress
- imagemin-giflossy
- gulp-webp

### Tests

- gulp-w3c-html-validator


## Editor

- ./.vscode/settings.json
- ./.editorconfig

### VSC Tweaks

- liveSassCompile
- Emmet "commentAfter"
- Panel at the "right" (Terminal, hints etc.)

## Inspiration

- Google Web Fundamentals (https://developers.google.com/web/fundamentals/performance/why-performance-matters)

## Resources

- https://html5boilerplate.com/
- https://gulpjs.com/
- https://rollupjs.org/guide/en/
- https://unsplash.com/
