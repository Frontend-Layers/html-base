import gulp from 'gulp';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import svgSprite from 'gulp-svg-sprite';
import file from 'gulp-file';
import path from 'path';
import fs from 'fs/promises';

const { src, dest } = gulp;

const errorHandler = (err) => {
  console.error('Error:', err.toString());
};

/**
 * HTML Template
 */
const generateHtml = (icons) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>SVG Sprite Preview</title>
      <meta name="robots" content="noindex, nofollow">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        .icon-list {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          padding: 0;
          list-style: none;
        }
        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .icon-item svg {
          width: 48px;
          height: 48px;
          margin-bottom: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container pt-5">
        <header class="pb-3">
          <h1>SVG Sprite Preview</h1>
        </header>
        <div class="pb-0 pt-0">
          <p><a href="/index.html">Back to Index</a></p>
        </div>
        <div class="pt-4 pb-2">
          <h2>Icons</h2>
        </div>
        <ul class="icon-list">
          ${icons.map(icon => `
            <li class="icon-item">
              <svg class="svg-sprite-icon__${icon}">
                <use xlink:href="../images/sprite.svg#${icon}"></use>
              </svg>
              <span>${icon}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </body>
    </html>
  `;
};

/**
 * SVG Sprite Generator
 *
 */
const getSprite = async () => {
  return src('./src/images/sprite/*.svg')
    .pipe(plumber({ errorHandler }))
    .pipe(newer('./src/images'))
    .pipe(
      svgSprite({
        shape: {
          transform: [{
            svgo: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'cleanupIDs', active: false },
                { name: 'removeUselessStrokeAndFill', active: false }
              ]
            }
          }]
        },
        mode: {
          symbol: {
            dest: './',
            sprite: './sprite.svg',
            render: {
              scss: {
                dest: path.join('..', '..', 'scss', '_sprite.scss')
              }
            }
          }
        }
      })
    )
    .pipe(dest('./src/images'))
    .on('end', async () => {
      console.log('SVG sprite generated successfully!');

      try {
        const spritePath = path.join(process.cwd(), './src/images/sprite.svg');
        const data = await fs.readFile(spritePath, 'utf8');

        const iconIds = [];
        const regex = /<symbol[^>]*id="([^"]+)"/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          iconIds.push(match[1]);
        }
        console.log('iconIds', iconIds)

        const htmlContent = generateHtml(iconIds);
        file('sprite-preview.html', htmlContent, { src: true })
          .pipe(dest('./src/report'))
          .on('end', () => console.log('SVG sprite and HTML preview generated successfully!'));
      } catch (err) {
        console.error('Error reading sprite file:', err);
      }
    });
};

export default getSprite;
