# HTML Initial Bundle

[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/andreymatin/html-initial-bundle/blob/master/LICENSE)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/andreymatin/html-initial-bundle)

HTML layer with JS bundler for professional templates development

## Why

- Rapid middleware templates prototyping
- Modern JavaScript applications modeling
- Routine tasks automation
- Easy CMS integration as theme

## Features

- Advanced CSS Reset [scss-reset](https://github.com/andreymatin/scss-reset)
- Basic SCSS Mixins Collection [scss-mixins](https://github.com/andreymatin/scss-mixins)
- Old browsers support ( > 1% popularity )
- Kik-start workspace for concentrated development
- Predefined export/import JavaScript modules
- Semantic reference

## Code concepts

- HTML - https://google.github.io/styleguide/htmlcssguide.html
- CSS - BEM - https://github.com/airbnb/css
- SCSS - https://sass-guidelin.es/
- JavaScript - https://github.com/airbnb/javascript

#### JavaScript

- Babel
- Rollup

#### Tests

- Automated HTML5 W3C Validation

#### Images Compression

- WEBP Convertor
- SVG (SVGOmg compression)
- Best practices for PNG/JPG

## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/andreymatin/html-initial-bundle/issues/new)


## Installation

Please download zip file from [html-initial-bundle](https://github.com/andreymatin/html-initial-bundle) repository.

or by Git:

```
git clone https://github.com/andreymatin/html-initial-bundle
```

or by [CLI](https://github.com/andreymatin/html-npm-cli):

```
npm i -g html-npm-cli;
gethtml init
```

## Automation

Development config for fast and robust templates development.

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
- gulp-svg-sprite

### Tests

- gulp-w3c-html-validator

## Editor

- ./.vscode/settings.json
- ./.editorconfig
- ./.eslintrc.json

### VSC Tweaks

- liveSassCompile
- Emmet "commentAfter"
- Panel at the "right" (Terminal, hints etc.)

## HTML Files

- index.html - templates list
- home.html - main landing page
- product.html - product page
- article.html - article page
- test-design.html - design system
- test-sprite.html - svg sprite test

## Folders

- src - initial files
- dest - beautified files, initial processing
- build - compressed files


## SVG Sprite generation

- copy svg files for sprite into ```'./images/sprite/'``` folder
- launch in the terminal ```gulp sprite```
- generated svg sprite is there - ```./images/sprite.svg```


## Inspiration

- Google Web Fundamentals (https://developers.google.com/web/fundamentals/performance/why-performance-matters)





