# Changelog

## [1.4.0]

- added dotenv config
- removed avif config (webp is enought)
- related updates

## [1.3.9]

- minor updates

## [1.3.0]

- added JS apps profile

## [1.2.0]

- increased quality for Webp compression to 100
- added AVIF images conversion
- updated relates

## [1.1.0]

- added UI Exporer

## [1.0.20]
- fixed 'import' any resources loader
- disabled .eslintrc "no-template-curly-in-string" to avoid warnings for html template markers
- page preview generator maintance

## [1.0.19]
- updated html pages preview

## [1.0.18]
- updated html-test. added ignored HTML folders for web components
- rollup: added JavaScript resources loader (HTML, images)
- images: remove compression for wimages
- images: fixed WEBP
- system: disable localtunnel by defaul
- system: corrected folders cleaning

## [1.0.17]

- decreased noice from eslint
- corrected package.json
- updated documentation

## [1.0.16]

- fixed styles reload
- corrected namespace

## [1.0.15]

- updated VSC search filter parameters


## [1.0.14]

- decreased noice from eslint

## [1.0.13]

- added Mobile Friendly test
- added Performance test by PageSpeed Insight
- added CSS test
- added html-pages-preview
- updated ESLint and VSCode configs


## [1.0.12]

- gulp: added w3c test validation
- gulp: added localtunnel

## [1.0.11]

- gulp: updated to ES6 modules
- gulp: added gulp-size module
- gulp: recovered w3c validator

## [1.0.10]

- minor fixes

## [1.0.9]

- gulp: fixed purifyCSS and postCSS tasks
- vsc: added custom comments color (aqua)
- gulp: enable / disable CSS purify ```const enablePurify = true```
- doc: added doc link with tools  [frontend-toolchain](https://github.com/frontend-layers/frontend-toolchain)
- sys: fixed build folder recreation after remove command at the start
- gulp: added cache for css, js, html

## [1.0.8] - 2021-03-08

- added search.exclude with excluded folders for VSC better search
- added $system-fonts (https://devhints.io/css-system-font-stack)
- added vendors JS bundler (gulpfile.js: jsVendorList)
- fixed browser autorefresh after HTML changes

## [1.0.7] - 2020-12-17

- fixed sprite generator compression
- added clear cache
- included default scss folders and updated main.scss
- updated netlify _headers
- updated html refresh for inner pages

## [1.0.6] - 2020-12-17

- added test-sprite.html
- updated documentation

### gulpfile.js

- #13 added SVG Sprite Generator (gulp-svg-sprite)
- #10 added Nunjucks Template Engine (gulp-nunjucks-render)

### ./src/layouts/header.html

- added Preload Google Fonts Snippet





