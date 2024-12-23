# HTML Base

[![License:MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://github.com/frontend-layers/html-base/LICENSE)
[![npm](https://img.shields.io/npm/v/html-base.svg)](https://www.npmjs.com/package/html-base)

_HTML initial bundle for professional frontend development_

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

### Structure

```
html-base/
├── .gulp/              # Gulp tasks
├── .vscode             # VSC custom settings
├── src/                # Source files
│   ├── favicons/       # Icons
│   ├── fonts/          # Custom Fonts
│   ├── javascript/     # Scripts and JS Resources
│   ├── images/         # Images
│   ├── images/sprite/  # SVG sprite
│   ├── layouts         # HTML parts
│   ├── scss/           # SCSS files
│   └── video/          # For video files
├── dest/               # Beautified Development build output
├── build/              # Compressed Production build output
├── test/               # Test scripts
└── json/               # JSON files
```

## Output

- Clean, tested, beautified, optimized and/or compressed HTML/CSS/JS

## Usage

### By Git Command

Clone the repository and install dependencies manually:

```shell
git clone https://github.com/frontend-layers/html-base.git project-name
cd project-name
npm install
```

### By Shell Command

```shell
npx get-html-base project-name
cd project-name
npm i
```

### Or [Download html-base](https://github.com/frontend-layers/html-base/archive/refs/heads/master.zip) Zip Package for Manual Installation

* https://github.com/frontend-layers/html-base/archive/refs/heads/master.zip


### JS Apps Mode Install

Please add ``` -js ``` key

```shell
npx get-html-base project-name -js
cd project-name
npm i
```

## Install via Package Managers

### Using npm

```shell
npm i html-base
```
### Using Yarn

```shell
yarn add html-base
```
### Using pnpm

```shell
pnpm i html-base
```

After installation, copy the ```html-base``` folder from ```node_modules``` and rename it according to your project name.

Then, update the ```package.json``` and related files based on your new project title, description, owner, etc.

Finally, install all dependencies with:

### Using npm

```shell
npm i
```
### Using Yarn

```shell
yarn add
```

### Using pnpm

```shell
pnpm i
```

## Usage

After installation, launch the project using one of the following commands:

```shell
gulp
```

or

```shell
npm start
```

To update packages, use the following commands:

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
- NoJs

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
- fancy-log

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

## SVG Sprite generation

- copy svg files for sprite into ```'./images/sprite/'``` folder
- launch in the terminal ```gulp sprite```
- generated svg sprite is there - ```./images/sprite.svg```

## Docker integration

Steps to Set Up Docker Container and Run them locally

### Log in to Docker Hub

```shell
docker login
```

### Pull the Docker Image

Download the latest version of the ```html-base``` Docker image from Docker Hub.

```shell
docker pull andreymatin/html-base:latest
```

### Copy Files from the Docker Container

Extract the application files from the Docker container to your local machine. Replace html-base with the name of the running container if it's not html-base.

```shell
docker cp html-base:/app ./
```

### Start the Application

Use the make command to start the application with the up target defined in the Makefile. Ensure that the Makefile is in the same directory.

```shell
make up
```

## Docker-Related Files

* Makefile
* Dockerfile
* docker-compose.yml

### Makefile

The Makefile provides an easy way to manage and automate Docker commands. It includes tasks such as:

* Starting and stopping the Docker containers.
* Automatically opening the application in a browser.
* Following container logs.

#### Key targets include:

* ```up```: Builds and starts the application containers.
* ```down```: Stops and removes the containers.
* ```log```: Displays the application logs in real time.

#### Makefile Windows Installation

If you have Chocolatey installed on your Windows system,
you can install make directly by running the following command in an elevated PowerShell (Administrator) terminal:

```shell
choco install make
```


### Dockerfile

The ```Dockerfile``` is used to define the application’s image. It specifies:

* Base image: The Node.js version (e.g., node:22).
* Working directory: Where the application is stored in the container (e.g., /app).
* Exposed ports: The ports used by the application, such as 4000.
* Dependencies: Installs gulp globally and other npm dependencies.
* Application entry point: Defines the command to start the
* application (npm start).


### docker-compose.yml

The docker-compose.yml file orchestrates multiple services and simplifies container management. It defines:

* Services: Specifies the application (app) and its dependencies.
* Image: Uses a predefined image or builds it locally (andreymatin/html-base:latest).
* Container name: Assigns a recognizable name to the container (html-base).
* Ports: Maps container ports to the host machine (e.g., 4000:4000).
* Environment variables: Configures settings like NODE_ENV and PORT.
* Volumes: Synchronizes files between the host and container for development.

## Contributing

For issues, bugs or improvements please open an [issue](https://github.com/frontend-layers/html-base/issues/new)

## Preferred Code concepts

- HTML - https://google.github.io/styleguide/htmlcssguide.html
- CSS - BEM - https://github.com/airbnb/css
- SCSS - https://sass-guidelin.es/
- JavaScript - https://standardjs.com/

## Logscreen

<img src=https://raw.githubusercontent.com/frontend-layers/html-base/master/screenshot.png alt=screenshot width=640>

## Inspiration

- Google Web Fundamentals (https://developers.google.com/web/fundamentals/performance/why-performance-matters)





