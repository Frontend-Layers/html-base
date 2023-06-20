# HTML Base

[![License:MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://github.com/frontend-layers/html-base/LICENSE)
[![npm](https://img.shields.io/npm/v/html-base.svg)](https://www.npmjs.com/package/html-base)

_HTML initial bundle for professional templates development_

## Why

- Templates, themes prototyping
- Integration with any CMS and frameworks
- Modeling JavaScript applications
- Routine web development tasks automation

## Features

- Advanced CSS Reset [scss-reset](https://github.com/frontend-layers/scss-reset)
- Basic SCSS Mixins Collection [scss-mixins](https://github.com/frontend-layers/scss-mixins)
- (Not so) Old browsers support
- Predefined VSC workspace
- Initial JavaScript modules and SCSS files
- Automated test tasks
- A lot of useful open source included

## Output

- Clean, tested, beautified, optimized and/or compressed HTML/CSS/JS

## Usage

by shell command

```shell
npx get-html-base project-name
cd project-name
npm i
```

or [download html-base](https://github.com/frontend-layers/html-base/archive/refs/heads/master.zip) zip package for manual installation


### JS mode install

Please add ``` -js ``` key

```shell
npx get-html-base project-name -js
cd project-name
npm i
```

## Install by PMs

```shell
npm i html-base
```
or
```shell
yarn add html-base
```
or
```shell
pnpm i html-base
```

Next need to copy html-base folder from node_modules and rename by project name.
Also need to update package.json and related files depends of new project title, description, owner, etc.
Next please install all dependencies by

```shell
npm i
```
or
```shell
yarn add
```
or
```shell
pnpm i
```

## Usage

After installation please launch by the command

```shell
gulp
```
or
```shell
npm start
```

To update packages please use these commands

```shell
npm updates
npm i
```

## Under the hood

<img alt="Gulp" src="https://img.shields.io/badge/-Gulp-CF4647?logo=gulp&logoColor=white&style=for-the-badge" /> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" /> <img alt="HTML5" src="https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img alt="CSS" src="https://img.shields.io/badge/CSS%20-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" /> <img alt="Sass" src="https://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" /> <img alt="rollup.js" src="https://img.shields.io/badge/-Rollup-EC4A3F?logo=rollup.js&logoColor=white&style=for-the-badge" /> <img alt="babel" src="https://img.shields.io/badge/-babel-F9DC3E?logo=babel&logoColor=white&style=for-the-badge" /> <img alt="PostCSS" src="https://img.shields.io/badge/-PostCSS-DD3A0A?logo=PostCSS&logoColor=white&style=for-the-badge" /> <img alt="Autoprefixer" src="https://img.shields.io/badge/-autoprefixer-DD3735?logo=autoprefixer&logoColor=white&style=for-the-badge" /> <img alt="eslint" src="https://img.shields.io/badge/-eslint-4B32C3?logo=eslint&logoColor=white&style=for-the-badge" /> <img alt="stylelint" src="https://img.shields.io/badge/-stylelint-263238?logo=stylelint&logoColor=white&style=for-the-badge" /> <img alt="nunjucks" src="https://img.shields.io/badge/-nunjucks-1C4913?logo=stylelint&logoColor=white&style=for-the-badge" /> <img alt="bootstrap" src="https://img.shields.io/badge/-bootstrap-7952B3?logo=bootstrap&logoColor=white&style=for-the-badge" /> <img alt="npm" src="https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white&style=for-the-badge" /> <img alt="nodedotjs" src="https://img.shields.io/badge/-nodejs-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" />

## Related Tools

- Links with related tools [frontend-toolchain](https://github.com/frontend-layers/frontend-toolchain)

## JavaScript plugins

- Babel
- Rollup

## JavaScript utils

- DomReady
- Parallax
- NoJs
- [UI Explorer](https://www.npmjs.com/package/ui-explorer)

## Tests

- Deep HTML5 Validation
- On fly HTML5 Validation
- CSS3 Validation
- Google Mobile-friendly test
- Google PageInsight Performance test

## Images

- WEBP Convertor
- SVG (SVGOmg compression)

## Automation

Development bundle for fast and robust web development based on Gulp and Rollup

### Files

- .gulp/*
- ./gulpfile.js
- ./babel.config.js
- ./package.json

### Styles

- autoprefixer
- gulp-postcss
- gulp-sass
- sass

### Server

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

### Tests

- gulp-w3c-html-validator
- [html-test](https://www.npmjs.com/package/html-test)
- [mobile-friendly-test-npm](https://www.npmjs.com/package/mobile-friendly-test-npm)

## Editor

- .vscode/settings.json
- .editorconfig
- .eslintrc.json
- .prettierrc
- .eslintrc.json

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

## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/frontend-layers/html-base/issues/new)

## Preferred Code concepts

- HTML - https://google.github.io/styleguide/htmlcssguide.html
- CSS - BEM - https://github.com/airbnb/css
- SCSS - https://sass-guidelin.es/
- JavaScript - https://standardjs.com/

## Logscreen

<img src=https://raw.githubusercontent.com/frontend-layers/html-base/master/screenshot.png alt=screenshot width=640>

## Inspiration

- Google Web Fundamentals (https://developers.google.com/web/fundamentals/performance/why-performance-matters)





