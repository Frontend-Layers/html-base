# HTML Base

[![License:MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://github.com/andreymatin/html-base/LICENSE)
[![npm](https://img.shields.io/npm/v/html-base.svg)](https://www.npmjs.com/package/html-base)

_HTML initial bundle for professional templates development_

## Shell

<img src=https://raw.githubusercontent.com/andreymatin/html-initial-bundle/master/screenshot.png alt=screenshot width=640>

## Why

- Templates, themes prototyping
- Integration with any CMS
- Modeling JavaScript applications
- Routine web development tasks automation

## Features

- Advanced CSS Reset [scss-reset](https://github.com/andreymatin/scss-reset)
- Basic SCSS Mixins Collection [scss-mixins](https://github.com/andreymatin/scss-mixins)
- (Not so) Old browsers support
- Predefined VSC workspace
- Initial JavaScript modules and SCSS files
- Automated test tasks (HTML Validation, Mobile friendly, Performance etc.)

## Related Tools

- Links with related tools [frontend-toolchain](https://github.com/andreymatin/frontend-toolchain)

## Code concepts

- HTML - https://google.github.io/styleguide/htmlcssguide.html
- CSS - BEM - https://github.com/airbnb/css
- SCSS - https://sass-guidelin.es/
- JavaScript - https://standardjs.com/

### JavaScript plugins

- Babel
- Rollup

#### JavaScript utils

- DomReady
- Parallax
- NoJs

### Tests

- Detailed (but slow) HTML5 W3C Validation
- Fast in-development HTML5 Validation
- CSS3 Validation
- Google Mobile-friendly test
- Google PageInsight Performance test

### Images Compression

- WEBP Convertor
- SVG (SVGOmg compression)
- Best practices for PNG/JPG

## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/andreymatin/html-base/issues/new)


## Installation

Please download zip file from [html-initial-bundle](https://github.com/andreymatin/html-base) repository.

or by Git:

```
git clone https://github.com/andreymatin/html-base
```

or by [CLI](https://github.com/andreymatin/html-npm-cli):

```
npm i -g html-npm-cli;
gethtml init
```

## Automation

Development bundle for fast and robust web development

### Files

- .gulp/*
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
- localtunnel

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
- gulp-svg-sprite

### Tests

- gulp-w3c-html-validator
- [html-test](https://www.npmjs.com/package/html-test)
- [mobile-friendly-test-npm](https://www.npmjs.com/package/mobile-friendly-test-npm)

## Editor

- ./.vscode/settings.json
- ./.editorconfig
- ./.eslintrc.json

### VSC Tweaks

- liveSassCompile
- Emmet "commentAfter"
- Panel at the "right" (Terminal, hints etc.)
- ESLint JS tweaks
- Search exclusions

## Tunneling

.gulp/server.js

```javascript
const subdomain = ''
```

## HTML Files

- index.html - templates list
- home.html - main landing page
- product.html - product page
- article.html - article page
- test-design.html - design system
- test-sprite.html - svg sprite test

## Folders

- .gulp - gulp tasks
- src - initial files
- dest - beautified files, initial processing
- build - compressed files

## SVG Sprite generation

- copy svg files for sprite into ```'./images/sprite/'``` folder
- launch in the terminal ```gulp sprite```
- generated svg sprite is there - ```./images/sprite.svg```

## Inspiration

- Google Web Fundamentals (https://developers.google.com/web/fundamentals/performance/why-performance-matters)





