# Changelog


## [1.0.9]

- gulp: fixed purifyCSS and postCSS tasks
- vsc: added custom comments color (aqua)
- gulp: enable / disable CSS purify ```const enablePurify = true```
- doc: added doc link with tools  [frontend-toolchain](https://github.com/andreymatin/frontend-toolchain)
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





